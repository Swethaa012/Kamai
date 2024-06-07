import { Component } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Platform } from '@ionic/angular';
import { Location } from '@angular/common';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-education',
  templateUrl: './education.page.html',
  styleUrls: ['./education.page.scss'],
})
export class EducationPage {

  mediaRecorder: MediaRecorder | null = null;
  recordedBlobs: Blob[] = [];
  isRecording = false;
  stream: MediaStream | null = null;
  _filepath: string | null = null;
  private _storage: Storage | null = null;

  constructor(
    private platform: Platform,
    private location: Location,
    private storage: Storage
  ) {
    this.initStorage();
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.stopVideoPlayback();
      this.goBack();
    });
  }

  async initStorage() {
    this._storage = await this.storage.create();
    this.loadVideo();
  }

  async toggleRecording() {
    if (this.isRecording) {
      this.stopRecording();
    } else {
      await this.startRecording();
    }
  }

  async startRecording() {
    try {
      this.stream = await this.getUserMedia();
      this.mediaRecorder = new MediaRecorder(this.stream, { mimeType: 'video/webm; codecs=vp9,opus' });
      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) this.recordedBlobs.push(event.data);
      };
      this.mediaRecorder.onstop = () => {
        this.isRecording = false;
        this.playRecording();
        this.saveVideo();
      };
      this.mediaRecorder.start();
      this.isRecording = true;
      setTimeout(() => this.stopRecording(), 30000);
    } catch (error) {
      console.error('Error starting recording:', error);
      if (error instanceof DOMException && (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError')) {
        console.error('Camera/microphone access denied.');
        // Handle permission denial gracefully
        // Display a message to the user indicating that camera/microphone access is required.
      } else {
        console.error('An error occurred while starting recording:', error);
        // Handle other errors
      }
    }
  }
  

  stopRecording() {
    if (this.mediaRecorder && this.isRecording) {
      this.mediaRecorder.stop();
    }
  }

  async getUserMedia(): Promise<MediaStream> {
    try {
      return await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true },
        video: { width: 300, height: 300 },
      });
    } catch (error) {
      console.error('Error accessing media devices:', error);
      throw error;
    }
  }

  playRecording() {
    const recordedVideo = document.getElementById('education-recorded') as HTMLVideoElement;
    recordedVideo.hidden = false;
    const superBuffer = new Blob(this.recordedBlobs, { type: 'video/webm' });
    recordedVideo.src = window.URL.createObjectURL(superBuffer);
    recordedVideo.controls = true;
    recordedVideo.autoplay = true;
    recordedVideo.muted = true;
  }

  stopVideoPlayback() {
    const recordedVideo = document.getElementById('education-recorded') as HTMLVideoElement;
    if (recordedVideo) {
      recordedVideo.pause();
    }
  }

  goBack() {
    this.location.back();
  }

  async saveVideo() {
    if (this.recordedBlobs.length > 0) {
      const superBuffer = new Blob(this.recordedBlobs, { type: 'video/webm' });
      const reader = new FileReader();
      reader.onloadend = () => {
        this._storage?.set('educationSavedVideo', reader.result);
      };
      reader.readAsDataURL(superBuffer);
    }
  }

  async loadVideo() {
    const recordedVideo = document.getElementById('education-recorded') as HTMLVideoElement;
    const savedVideo = await this._storage?.get('educationSavedVideo');
    if (savedVideo) {
      recordedVideo.src = savedVideo;
      recordedVideo.hidden = false;
    }
  }

  ionViewWillEnter() {
    this.loadVideo();
  }

  ionViewWillLeave() {
    this.stopVideoPlayback();
  }

}

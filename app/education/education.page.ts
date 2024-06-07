<<<<<<< HEAD
import { Component } from '@angular/core';
=======
import { Component, OnDestroy, OnInit } from '@angular/core';
>>>>>>> origin/master
import { Capacitor } from '@capacitor/core';
import { Platform } from '@ionic/angular';
import { Location } from '@angular/common';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-education',
  templateUrl: './education.page.html',
  styleUrls: ['./education.page.scss'],
})
<<<<<<< HEAD
export class EducationPage {

=======
export class EducationPage implements OnInit, OnDestroy {
>>>>>>> origin/master
  mediaRecorder: MediaRecorder | null = null;
  recordedBlobs: Blob[] = [];
  isRecording = false;
  stream: MediaStream | null = null;
  _filepath: string | null = null;
  private _storage: Storage | null = null;
<<<<<<< HEAD
=======
  recordedVideo: HTMLVideoElement | null = null;
>>>>>>> origin/master

  constructor(
    private platform: Platform,
    private location: Location,
    private storage: Storage
  ) {
<<<<<<< HEAD
    this.initStorage();
=======
>>>>>>> origin/master
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.stopVideoPlayback();
      this.goBack();
    });
  }

<<<<<<< HEAD
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
=======
  async ngOnInit() {
    this.recordedVideo = document.getElementById('recorded') as HTMLVideoElement;
    this._storage = await this.storage.create();
    await this.loadVideo();
  }

  ngOnDestroy() {
    this.stopVideoPlayback();
  }

  async toggleRecording() {
    this.isRecording ? this.stopRecording() : await this.startRecording();
  }

  async startRecording() {
    if (Capacitor.isNativePlatform()) {
      this.startMobileRecording();
    } else {
      await this.startWebRecording();
    }
  }

  startMobileRecording() {
    try {
      (navigator as any).device.capture.captureVideo(
        (mediaFiles: any) => {
          this._filepath = mediaFiles[0].fullPath;
          this.playRecording();
          this.saveVideo();
        },
        (error: any) => console.info('Error code:', error),
        { limit: 1, duration: 30, direction: 1 }
      );
    } catch (error) {
      console.error('Error starting recording on mobile:', error);
    }
  }

  async startWebRecording() {
    try {
      this.stream = await this.getUserMedia();
      this.mediaRecorder = new MediaRecorder(this.stream, { mimeType: 'video/webm; codecs=vp9,opus' });
      this.mediaRecorder.ondataavailable = (event) => event.data.size > 0 && this.recordedBlobs.push(event.data);
>>>>>>> origin/master
      this.mediaRecorder.onstop = () => {
        this.isRecording = false;
        this.playRecording();
        this.saveVideo();
      };
      this.mediaRecorder.start();
      this.isRecording = true;
      setTimeout(() => this.stopRecording(), 30000);
    } catch (error) {
<<<<<<< HEAD
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
=======
      console.error('Error starting recording on web:', error);
    }
  }

  stopRecording() {
    this.mediaRecorder?.stop();
>>>>>>> origin/master
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
<<<<<<< HEAD
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
=======
    if (!this.recordedVideo) return;
    this.recordedVideo.hidden = false;
    if (Capacitor.isNativePlatform() && this._filepath) {
      this.recordedVideo.src = Capacitor.convertFileSrc(this._filepath);
    } else {
      const superBuffer = new Blob(this.recordedBlobs, { type: 'video/webm' });
      this.recordedVideo.src = window.URL.createObjectURL(superBuffer);
    }
    this.recordedVideo.controls = true;
    this.recordedVideo.autoplay = true;
    this.recordedVideo.muted = true;
  }

  stopVideoPlayback() {
    this.recordedVideo?.pause();
>>>>>>> origin/master
  }

  goBack() {
    this.location.back();
  }

  async saveVideo() {
    if (this.recordedBlobs.length > 0) {
      const superBuffer = new Blob(this.recordedBlobs, { type: 'video/webm' });
      const reader = new FileReader();
<<<<<<< HEAD
      reader.onloadend = () => {
        this._storage?.set('educationSavedVideo', reader.result);
      };
      reader.readAsDataURL(superBuffer);
=======
      reader.onloadend = () => this._storage?.set('savedVideo', reader.result);
      reader.readAsDataURL(superBuffer);
    } else if (this._filepath) {
      this._storage?.set('savedVideoPath', this._filepath);
>>>>>>> origin/master
    }
  }

  async loadVideo() {
<<<<<<< HEAD
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

=======
    if (!this.recordedVideo) return;
    const savedVideo = await this._storage?.get('savedVideo');
    const savedVideoPath = await this._storage?.get('savedVideoPath');
    if (savedVideo) {
      this.recordedVideo.src = savedVideo;
      this.recordedVideo.hidden = false;
    } else if (Capacitor.isNativePlatform() && savedVideoPath) {
      this.recordedVideo.src = Capacitor.convertFileSrc(savedVideoPath);
      this.recordedVideo.hidden = false;
    }
  }
>>>>>>> origin/master
}

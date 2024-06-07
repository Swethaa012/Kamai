import { Component } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Platform, NavController } from '@ionic/angular';
import { Location } from '@angular/common';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-extra',
  templateUrl: './extra.page.html',
  styleUrls: ['./extra.page.scss'],
})
export class ExtraPage {
  mediaRecorder: MediaRecorder | null = null;
  recordedBlobs: Blob[] = [];
  isRecording = false;
  stream: MediaStream | null = null;
  _filepath: string | null = null;
  private _storage: Storage | null = null;

  constructor(
    private platform: Platform,
    private location: Location,
    private storage: Storage,
<<<<<<< HEAD
    private navCtrl: NavController 
=======
    private navCtrl: NavController // Inject NavController for navigation control
>>>>>>> origin/master
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
    if (Capacitor.isNativePlatform()) {
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
    } else {
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
        console.error('Error starting recording on web:', error);
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
    const recordedVideo = document.getElementById('recorded') as HTMLVideoElement;
    recordedVideo.hidden = false;
    if (Capacitor.isNativePlatform() && this._filepath) {
      recordedVideo.src = Capacitor.convertFileSrc(this._filepath);
    } else {
      const superBuffer = new Blob(this.recordedBlobs, { type: 'video/webm' });
      recordedVideo.src = window.URL.createObjectURL(superBuffer);
    }
    recordedVideo.controls = true;
    recordedVideo.autoplay = true;
    recordedVideo.muted = true;
  }

  stopVideoPlayback() {
    const recordedVideo = document.getElementById('recorded') as HTMLVideoElement;
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
        this._storage?.set('savedVideo', reader.result);
      };
      reader.readAsDataURL(superBuffer);
    } else if (this._filepath) {
      this._storage?.set('savedVideoPath', this._filepath);
    }
  }

  async loadVideo() {
    const recordedVideo = document.getElementById('recorded') as HTMLVideoElement;
    const savedVideo = await this._storage?.get('savedVideo');
    const savedVideoPath = await this._storage?.get('savedVideoPath');

    if (savedVideo) {
      recordedVideo.src = savedVideo;
      recordedVideo.hidden = false;
    } else if (Capacitor.isNativePlatform() && savedVideoPath) {
      recordedVideo.src = Capacitor.convertFileSrc(savedVideoPath);
      recordedVideo.hidden = false;
    }
  }

  ionViewWillLeave() {
    this.stopVideoPlayback();
  }
}

import { Component } from '@angular/core';




 
  import { StreamingMedia } from '@ionic-native/streaming-media/ngx';
   
  declare var navigator: any;
  declare var capacitor: any;
   
  declare var window: any;
   
  @Component({
    selector: 'app-tabs',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
  })
  export class Tab1Page {
    
   
      videofile = '';
      _filepath = "";
      isPlayHidden = false;
     
      constructor() {}
     
      TakeVideo(){
        let me = this;
        let captureSuccess = (mediaFiles:any)=>{
         
           
           
           
            var i, path, len;
            for (i = 0, len = mediaFiles.length; i < len; i += 1) {
                path = mediaFiles[i].fullPath;
                // do something interesting with the file
                console.info("11",mediaFiles);
                console.info("22",this._filepath);
                this._filepath = path;
               
            // me.videoplayer.nativeElement.src = path;
            }
        };
        let captureError = (error:any)=>{
          this.isPlayHidden = false;
         
            console.info('Error code: ', error);
        };
        let options = { limit: 1, duration: 120 };
        navigator.device.capture.captureVideo(captureSuccess, captureError, options);
      }
     
      playVideo(){
        window.plugins.streamingMedia.playVideo(this._filepath);
      }
     
    }
  
    
  
  

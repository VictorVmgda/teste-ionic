import { CameraOptions, Camera } from "../../node_modules/@ionic-native/camera";
import { Injectable } from "../../node_modules/@angular/core";

@Injectable()
export class ImageHelper{

    constructor(private _camera: Camera){}

    options: CameraOptions = {
        quality : 75,
        destinationType: this._camera.DestinationType.DATA_URL,
        encodingType: this._camera.EncodingType.JPEG,
        mediaType: this._camera.MediaType.PICTURE
      }

    tirarFoto(){
        this.options.sourceType = this._camera.PictureSourceType.CAMERA;
        return this._camera.getPicture(this.options);
    }

    enviarFoto(){
        this.options.sourceType = this._camera.PictureSourceType.PHOTOLIBRARY;
        return this._camera.getPicture(this.options);
    }

    enviarFotoWeb(){
        
    }

}
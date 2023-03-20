import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Injectable()
export class PhotoService {

    constructor() { }

    async takePhoto() {
        const savedImage = await Camera.getPhoto({
            quality: 100,
            allowEditing: false,
            resultType: CameraResultType.Uri,
            source: CameraSource.Camera
        });       
        return savedImage;
    }
}

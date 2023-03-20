import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Photo } from "@capacitor/camera";
import { Observable } from "rxjs";
import { API_CONFIG } from "src/config/api.config";
import { ClientDTO } from "src/models/client.dto";

@Injectable()
export class ClientService {

    constructor(private http: HttpClient) {}

    findById(id : string) {
        return this.http.get(`${API_CONFIG.baseUrl}/clients/${id}`);
    }

    findByEmail(email : string) {
        return this.http.get(`${API_CONFIG.baseUrl}/clients/email?value=${email}`);
    }

    getImageFromBucket(id : string) : Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`
        return this.http.get(url, {responseType : 'blob'});
    }

    insert(obj : ClientDTO) {
        return this.http.post(`${API_CONFIG.baseUrl}/clients`, obj, {observe: 'response', responseType: 'text'});
    }

    async uploadPicture(photo: Photo) {
        let blobPicture = await fetch(photo.webPath);
        const blob = await blobPicture.blob();
        let formData: FormData = new FormData();
        formData.set('file', blob, 'file.png');

        return this.http.post(
            `${API_CONFIG.baseUrl}/clients/picture`, formData, {
            observe: 'response',
            responseType: 'text'
        });
    }
}
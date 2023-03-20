import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { API_CONFIG } from 'src/config/api.config';
import { ClientDTO } from 'src/models/client.dto';
import { ClientService } from 'src/services/domain/client.service';
import { PhotoService } from 'src/services/photo.service';
import { StorageService } from 'src/services/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  client: ClientDTO;

  constructor(
    private storage: StorageService, 
    private clientService : ClientService, 
    private router: Router,
    private photo: PhotoService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.clientService.findByEmail(localUser.email).subscribe(response => {
        this.client = response as ClientDTO;
        this.getImageIfExists();
      },
      error => {
        if (error.status == 403) {
          console.log(error.status);
          this.router.navigateByUrl("home");
        }
      });
      
    }
    else {
      this.router.navigateByUrl("home");
    }
  }

  getImageIfExists() {
    this.clientService.getImageFromBucket(this.client.id).subscribe(response => {
      this.client.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.client.id}.jpg`;
    }, 
    error => {});
  }

  async takePhoto() {
    let photo = await this.photo.takePhoto();
    (await this.clientService.uploadPicture(photo)).subscribe(response => {
      this.loadData();
    },
    error => {});
  }  
}

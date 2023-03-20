import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { CredentialsDTO } from 'src/models/credentials.dto';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  credentials : CredentialsDTO = {
    email: "",
    password: ""
  };

  constructor(
    private menu: MenuController, 
    private auth: AuthService, 
    private router: Router) { }

  ngOnInit() {
    this.auth.refreshToken().subscribe(response => {
      this.auth.successfulLogin(response.headers.get('Authorization'));
      this.router.navigateByUrl("category");
    }, error => { });
  }

  ionViewDidEnter() {
    this.menu.swipeGesture(false);
  }

  ionViewDidLeave() {
    this.menu.swipeGesture(true);
  }

  login() {
    this.auth.authenticate(this.credentials).subscribe(response => {
      this.auth.successfulLogin(response.headers.get('Authorization'));
      this.router.navigateByUrl("category");
    }, error => {});
  }
}

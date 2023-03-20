import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Profile', url: 'profile', icon: 'person' },
    { title: 'Category', url: 'category', icon: 'bag' },
    { title: 'Carrinho', url: 'cart', icon: 'cart' },
  ];
  
  public labels = [
    { title: 'Logout', icon: 'close' },
  ]
  constructor(private authService: AuthService, private router: Router) {}

  logout(){
    this.authService.logout();
    this.router.navigateByUrl("home");
  }
}

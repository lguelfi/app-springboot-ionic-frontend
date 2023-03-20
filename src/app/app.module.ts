import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CategoryService } from 'src/services/domain/category.service';
import { ErrorInterceptorProvider } from 'src/interceptors/error-interceptor';
import { AuthService } from 'src/services/auth.service';
import { StorageService } from 'src/services/storage.service';
import { ClientService } from 'src/services/domain/client.service';
import { AuthInterceptorProvider } from 'src/interceptors/auth-interceptor';
import { ProductService } from 'src/services/domain/product.service';
import { CartService } from 'src/services/domain/cart.service';
import { LoadingService } from 'src/services/loading.service';
import { PhotoService } from 'src/services/photo.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,HttpClientModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, CategoryService, AuthInterceptorProvider, ErrorInterceptorProvider, AuthService, StorageService, ClientService, 
  ProductService, CartService, LoadingService, PhotoService],
  bootstrap: [AppComponent],
})
export class AppModule {}

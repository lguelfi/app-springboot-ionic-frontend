import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddressDTO } from 'src/models/address.dto';
import { CartItem } from 'src/models/cart-item';
import { ClientDTO } from 'src/models/client.dto';
import { OrderDTO } from 'src/models/order.dto';
import { CartService } from 'src/services/domain/cart.service';
import { ClientService } from 'src/services/domain/client.service';
import { OrderService } from 'src/services/domain/order.service';
import { LoadingService } from 'src/services/loading.service';
import { StorageService } from 'src/services/storage.service';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.page.html',
  styleUrls: ['./order-confirmation.page.scss'],
})
export class OrderConfirmationPage implements OnInit {

  order: OrderDTO;
  cartItems: CartItem[];
  client: ClientDTO;
  address: AddressDTO;
  orderCod: string;

  constructor(
    private storage: StorageService,
    private cartService: CartService,
    private clientService: ClientService,
    private router: Router,
    private orderService: OrderService,
    private loading: LoadingService) {
      this.order = storage.getOrder();
     }

  ngOnInit() {
    this.cartItems = this.cartService.getCart().items;
    this.clientService.findById(this.order.client.id).subscribe(response => {
      this.client = response as ClientDTO;
      this.address = this.findAddress(this.order.deliveryAdress.id, response['adresses']);
    },
    error => {
      this.router.navigateByUrl("home");
    })
  }

  private findAddress(id: string, list: AddressDTO[]) : AddressDTO {
    let position = list.findIndex(x => x.id == id);
    return list[position];
  }

  total() {
    return this.cartService.total();
  }

  back() {
    this.router.navigateByUrl("cart");
  }

  checkOut() {
    this.loading.present();
    this.orderService.insert(this.order).subscribe(response => {
      this.loading.dismiss();
      this.cartService.createOrClearCart();
      this.orderCod = this.extractId(response.headers.get('location'));
    },
    error => {
      if (error.status == 403) {
        this.loading.dismiss();
        this.router.navigateByUrl("home");
      }
    });
  }

  private extractId(location : string) : string {
    let position = location.lastIndexOf('/');
    return location.substring(position + 1, location.length);
  }
}

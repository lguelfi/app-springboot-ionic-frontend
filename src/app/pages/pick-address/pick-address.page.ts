import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddressDTO } from 'src/models/address.dto';
import { OrderDTO } from 'src/models/order.dto';
import { CartService } from 'src/services/domain/cart.service';
import { ClientService } from 'src/services/domain/client.service';
import { StorageService } from 'src/services/storage.service';

@Component({
  selector: 'app-pick-address',
  templateUrl: './pick-address.page.html',
  styleUrls: ['./pick-address.page.scss'],
})
export class PickAddressPage implements OnInit {

  items : AddressDTO[];
  order : OrderDTO;

  constructor(
    private storage: StorageService,
    private clientService: ClientService,
    private router: Router, 
    private cartService: CartService) { }

  ngOnInit() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.clientService.findByEmail(localUser.email).subscribe(
        response => {
          this.items = response['adresses'];
          
          let cart = this.cartService.getCart();

          this.order = {
            client: {id: response['id']},
            deliveryAdress: null,
            payment: null,
            orderItems: cart.items.map(x => {return {quantity: x.quantity, product: {id: x.product.id}}})
          }
        },
        error => {
          console.log(error);
        });
    }
  }

  nextPage(item: AddressDTO) {
    this.order.deliveryAdress = {id: item.id};
    this.storage.setOrder(this.order);
    this.router.navigateByUrl("payment");
  }
}

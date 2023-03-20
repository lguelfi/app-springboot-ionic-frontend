import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderDTO } from 'src/models/order.dto';
import { StorageService } from 'src/services/storage.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

  order: OrderDTO;
  payNumber: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private storage: StorageService,
    private router: Router) { 
      
      this.order = this.storage.getOrder();
      this.formGroup = formBuilder.group({
        paymentNumber: [1, Validators.required],
        "@type": ["pagamentoComCartao", Validators.required] 
      });
    }

  ngOnInit() {
  }

  nextPage() {
    this.order.payment = this.formGroup.value;
    this.storage.setOrder(this.order);
    this.router.navigateByUrl("order-confirmation");
  }

}

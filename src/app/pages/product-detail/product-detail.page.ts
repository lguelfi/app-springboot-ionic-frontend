import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { API_CONFIG } from 'src/config/api.config';
import { ProductDTO } from 'src/models/product.dto';
import { CartService } from 'src/services/domain/cart.service';
import { ProductService } from 'src/services/domain/product.service';
import { StorageService } from 'src/services/storage.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {

  item : ProductDTO;

  constructor(
    private productService: ProductService,
    private storage: StorageService,
    private cartService: CartService,
    private router: Router) { }

  ngOnInit() {

    let productId = this.storage.getProductId();
    this.productService.findById(productId).subscribe(response => {
      this.item = response;
      this.getImageUrlIfExists();
    },
    error => {});

  }

  getImageUrlIfExists() {
    this.productService.getImageFromBucket(this.item.id).subscribe(response => {
      this.item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${this.item.id}.jpg`;
    },
    error => {});
  }

  addToCart(product: ProductDTO) {
    this.cartService.addProduct(product);
    this.router.navigateByUrl("cart");
  }
}

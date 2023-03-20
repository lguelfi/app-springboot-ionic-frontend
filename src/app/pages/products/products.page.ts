import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { API_CONFIG } from 'src/config/api.config';
import { ProductDTO } from 'src/models/product.dto';
import { ProductService } from 'src/services/domain/product.service';
import { LoadingService } from 'src/services/loading.service';
import { StorageService } from 'src/services/storage.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  items : ProductDTO[] = [];
  page : number = 0;
  checkComplete: boolean = false;

  constructor(
    private productService: ProductService,
    private router: Router,
    private storage: StorageService,
    private loading: LoadingService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    let categoryId = this.storage.getCategoryId();
    this.loading.present();
    this.productService.findByCategory(categoryId, this.page, 10).subscribe(response => {
      let start = this.items.length;
      this.items = this.items.concat(response['content']);
      let end = this.items.length - 1;
      this.loading.dismiss();
      this.loadImageUrls(start, end);
      if (response['last'] == true) {
        this.checkComplete = true;
      }
    },
      error => {
        this.loading.dismiss();
      });
  }

  loadImageUrls(start: number, end: number) {
    for (var i = start; i < end; i++) {

      let item = this.items[i];
      this.productService.getSmallImageFromBucket(item.id).subscribe(resposne => {
        item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`;
      },
      error => {});    
    }
  }

  showDetails(productId : string) {
    this.storage.setProductId(productId);
    this.router.navigateByUrl("product-detail");
  }

  handleRefresh(event) {
    this.page = 0;
    this.items = [];
    this.checkComplete = false;
    setTimeout(() => {
      this.loadData();
      event.target.complete();
    }, 1000);
  }

  doInfinite(event) {
    this.page++;
    this.loadData();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }
}  
  


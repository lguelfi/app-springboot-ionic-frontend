import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { API_CONFIG } from 'src/config/api.config';
import { CategoryDTO } from 'src/models/category.dto';
import { CategoryService } from 'src/services/domain/category.service';
import { StorageService } from 'src/services/storage.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {

  bucketUrl: string = API_CONFIG.bucketBaseUrl;

  items: CategoryDTO[];

  constructor(
    private categoryService: CategoryService, 
    private router: Router, 
    private storage: StorageService) { }

  ngOnInit() {
    this.categoryService.findAll().subscribe(response => { this.items = response; }, error => { });
  }

  showProducts(categoryId : string) {
    this.storage.setCategoryId(categoryId);
    this.router.navigateByUrl("products");
  }

}

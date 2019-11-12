import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ProductsService, IProduct } from "../product.service";
import { Observable } from "rxjs";

@Component({
  selector: 'in-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush   // Because of immutability of objects, leads to increased performance.
})
export class ProductsComponent {
  products$: Observable<IProduct[]> = this.productsService.products$;
  delete = false;
  productToBeDeleted;

  constructor(private productsService: ProductsService) { }
  trackById(index, item) {
    return item.id;
  }

  onDelete(product) {
    this.delete = true;
    this.productToBeDeleted = product;
  }

  handleCancel() {
    this.delete = false;
  }

  confirmDelete() {
    this.handleCancel();
    // Need to implement this method removeProduct in the ProductsService
    this.productsService.removeProduct(this.productToBeDeleted);
  }
}

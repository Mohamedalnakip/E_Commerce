import { Component, inject, OnInit } from '@angular/core';
import { BrandService } from '../../core/services/brand/brand.service';
import { IBrand } from '../../core/interfaces/brand/ibrand';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit{

  private readonly _BrandService=inject(BrandService)
  brandData!:IBrand[]

  ngOnInit(): void {
      this._BrandService.GetAllBrands().subscribe({
        next:(res)=>{
          console.log(res.data);
          this.brandData=res.data
          
        },
        error:(err)=>{
          console.log(err);
          
        }
      })
  }
}

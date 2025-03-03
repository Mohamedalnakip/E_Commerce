import { ICategory } from '../../core/interfaces/category/icategory';
import { CategoryService } from './../../core/services/categorys/category.service';
import { Component, inject, OnInit } from '@angular/core';


@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit{
  
  private readonly _CategoryService=inject(CategoryService)

  categoryData!:ICategory[]

  ngOnInit(): void {
      this._CategoryService.GetAllCategories().subscribe({
        next:(res)=>{
          console.log(res.data);
          this.categoryData=res.data
        },
        error:(err)=>{
          console.log(err);
        }
      })
  }
  
}

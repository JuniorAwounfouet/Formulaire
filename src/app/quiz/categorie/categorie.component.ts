import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../shared/services/category.service';
import { Category } from '../../shared/services/category.service';

@Component({
  selector: 'app-categorie',
  standalone: false,
  templateUrl: './categorie.component.html',
  styleUrl: './categorie.component.scss'
})
export class CategorieComponent implements OnInit {

  categories: Category[] = [];
  filteredCategories: Category[] = [];
  searchTerm: string = '';

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((data: Category[]) => {
      this.categories = data;
      this.filteredCategories = data;
    });
  }

  filterCategories(): void {
    if (!this.searchTerm) {
      this.filteredCategories = this.categories;
    } else {
      this.filteredCategories = this.categories.filter(cat =>
        cat.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  resetFilter(): void {
    this.searchTerm = '';
    this.filteredCategories = this.categories;
  }
}
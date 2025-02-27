import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list'
import { FilterpipeComponent } from '../../Pipes/filterpipe/filterpipe.component';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import {MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator'
import{MatMenuModule} from '@angular/material/menu'
import { MatButtonModule } from '@angular/material/button';
import{MatAutocompleteModule} from '@angular/material/autocomplete'
import {MatHeaderCellDef, MatTableModule} from '@angular/material/table'
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { EditrecipeboxComponent } from '../../DialogBoxes/Recipe/editrecipebox/editrecipebox.component';
import { MatInput, MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-grid',
  standalone:true,
  imports: [MatGridListModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatPaginator,
    MatIcon,
    MatMenuModule,
    MatButtonModule,
    MatAutocompleteModule,
  MatTableModule,MatInputModule,MatInput],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css'
})
export class GridComponent implements OnInit {

  searchTerm:string='';
  id:number=0;
  recipes:any[]=[];
  pageSize:number=5;
  pageIndex:number=0;
  paginatedData:any[]=[];
  filteredRecipes:any[]=[];
  
  displayedColumns: string[] = ['id', 'name', 'ingredients','rating','reviewCount','mealType', 'actions'];

  @ViewChild(MatPaginator) paginator!:MatPaginator;

  constructor(private http:HttpClient,private dialog:MatDialog){}

  //Lifecycle method to initialize
  ngOnInit(): void {

    this.fetchData();
  }
  // Fetch data from API
  fetchData(): void {
    this.http.get('https://localhost:44352/api/Recipe/recipes').subscribe((res: any) => {
      this.recipes = res;
      this.filteredRecipes = res;
      this.updatePaginatedData();
    });
  }


  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.updatePaginatedData();
  }
  
  refreshData() {
    console.log('Refreshing data...');
    this.http.get('https://localhost:44352/api/Recipe/recipes').subscribe((res:any)=>{
      this.recipes=res;
      this.filteredRecipes=res;
      this.updatePaginatedData();
    })
    // this.filteredRecipes = []; 
    // this.paginatedData = this.filteredRecipes.slice(0, this.pageSize);
  }

  //function for updating pagination setting (values)
  updatePaginatedData(){
    const filteredData=this.filteredRecipesList();
    const startIndex=this.pageIndex*this.pageSize;
    const endINdex=startIndex+this.pageSize;
    // this.paginatedData=this.filteredRecipesList().slice(startIndex,endINdex);
    this.paginatedData=filteredData.slice(startIndex,endINdex);
  }

  //returns list after applying filter based on search
  filteredRecipesList() :any[]{
    return this.filteredRecipes.filter(recipe =>
      recipe.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      (Array.isArray(recipe.ingredients)&&recipe.ingredients.some((ingredient: string) => ingredient.toLowerCase().includes(this.searchTerm.toLowerCase()))
    )
    );
  }


    // Method to check if ingredients is an array and join them
    getIngredients(recipe: any): string {
      if (typeof recipe.ingredients === 'string') {
        try {
          // to parse it as a JSON string into an array
          const parsedIngredients = JSON.parse(recipe.ingredients);
          return Array.isArray(parsedIngredients) ? parsedIngredients.join(', ') : recipe.ingredients;
        } catch (e) {
          // If parsing fails, just return the string as original string
          return recipe.ingredients;
        }
      }
      return Array.isArray(recipe.ingredients) ? recipe.ingredients.join(', ') : recipe.ingredients;
    }

    getMealType(recipe:any):string{
      if (typeof recipe.mealType === 'string') {
        try {
          // Try to parse it as a JSON string into an array
          const parsedMealType = JSON.parse(recipe.mealType);
          return Array.isArray(parsedMealType) ? parsedMealType.join(', ') : recipe.mealType;
        } catch (e) {
          // If parsing fails, just return the string as is
          return recipe.mealType;
        }
      }
      return Array.isArray(recipe.mealType)?recipe.mealType.join(', '):recipe.mealType;

    }
 // Open dialog for editing recipe
 editRecipe(recipe: any) {
  const dialogRef = this.dialog.open(EditrecipeboxComponent, {
    width: '400px',
    data: recipe
  });

  dialogRef.afterClosed().subscribe(updatedRecipe => {
    if (updatedRecipe) {
      this.http.put(`https://localhost:44352/api/Recipe/update_recipes/${updatedRecipe.id}`, updatedRecipe)
        .subscribe(response => {
          console.log('Recipe updated:', response);
          this.refreshData();
        });
    }
  });
}

//delete a recipe
deleteRecipe(recipe:any){
  console.log('Deleting recipe',recipe);
  this.http.delete(`https://localhost:44352/api/Recipe/delete_recipes/${recipe.id}`)
    .subscribe(response => {
      console.log('Recipe deleted:', response);
      this.recipes = this.recipes.filter(r => r !== recipe);
      this.filteredRecipes = this.recipes;
      this.updatePaginatedData();
    });
}

}

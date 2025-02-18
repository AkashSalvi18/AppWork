import { Component, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name:'filter'
})
export class FilterpipeComponent implements PipeTransform{

  transform(items:any[],searchTerm:string):any[] {
    if(!items || !searchTerm){
      return items;
    }
    return items.filter(item=>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.ingredients.some((ingredient:string)=>ingredient.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }
}

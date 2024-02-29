import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(allUsers: any[], searchKey: string): any[] {
    var result:any[]=[]
    if(!allUsers||searchKey==""){
      return allUsers
    }
    else{
      return allUsers?.filter(i=>i.name?.trim().toLowerCase().includes(searchKey.toLowerCase()))
    }
  }

}

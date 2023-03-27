import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'filter'
  })
  export class FilterPipe implements PipeTransform {
    transform(value: any[], searchText: string): any[] {
        if (!searchText) {
          return value;
        }

        searchText = searchText?.toLowerCase();

        const filteredRows = value?.filter(item => {
          let filteredItem;
          if(item?.hasOwnProperty('item')){
            filteredItem = item?.item
          }
          else filteredItem = item
          return (filteredItem?.name?.toLowerCase()?.includes(searchText) || JSON?.stringify(filteredItem?.description)?.toLowerCase()?.includes(searchText) || JSON?.stringify(filteredItem?.id)?.toLowerCase()?.includes(searchText));
        });
        if (filteredRows?.length == 0) {
            return [];
          }
          return filteredRows;
      }
  }

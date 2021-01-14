//custom pipe. Make sure add it to the module that needs it. In this case appModule
import { PipeTransform, Pipe } from '@angular/core';

import { IProduct } from './product';

//Pipe decorator
@Pipe({
    name: 'productFilter' //name of the pipe
})

export class ProductFilterPipe implements PipeTransform {

    //implement transform method to define your own pipe
    //the first parameter to transform is the value with want transformed - e.g. value: IProduct[] array
    //return type is also : IProduct[] 
    //filterBy: string is the transformation criteria provided by the user
    transform(value: IProduct[], filterBy: string): IProduct[] {

        //this means if there is a filterBy convert the IProducts[] to lower case otherwise set filterBy to  null
        filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;

       //if filter By not null then we filter the list. Otherwise we return the unaltered original value which is
       //our full list of products 
        return filterBy ? value.filter((product: IProduct) =>
            product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1) : value;
    }
}

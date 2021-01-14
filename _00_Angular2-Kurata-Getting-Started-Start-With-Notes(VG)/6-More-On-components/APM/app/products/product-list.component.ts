//make sure any angular interfaces such as onInit are imported
//onInit interface as a method called ngOnInit() that we need to implement
import { Component, OnInit } from '@angular/core';

//Import interface called IProduct
import { IProduct } from './product';

@Component({
    selector: 'pm-products',

    moduleId: module.id, //use module id to avoid coding absolute path
    templateUrl: 'product-list.component.html',  //using relative path because we provided moduleId:
    styleUrls: ['product-list.component.css']  
    // templateUrl: 'app/products/product-list.component.html', //using absolute path
    // styleUrls: ['app/products/product-list.component.css'] //using absolute path. styleUrls is an array. provide path to the style

})


//implement lifecycle hook. Angular2 lifecyle events are: onInit, onChange,
// onDestroy (they are al defined as interface)
export class ProductListComponent implements OnInit {
    pageTitle: string = 'Product List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    listFilter: string = 'cart';
    products: IProduct[] = [
        {
            "productId": 2,
            "productName": "Garden Cart",
            "productCode": "GDN-0023",
            "releaseDate": "March 18, 2016",
            "description": "15 gallon capacity rolling garden cart",
            "price": 32.99,
            "starRating": 4.2,
            "imageUrl": "http://openclipart.org/image/300px/svg_to_png/58471/garden_cart.png"
        },
        {
            "productId": 5,
            "productName": "Hammer",
            "productCode": "TBX-0048",
            "releaseDate": "May 21, 2016",
            "description": "Curved claw steel hammer",
            "price": 8.9,
            "starRating": 4.8,
            "imageUrl": "http://openclipart.org/image/300px/svg_to_png/73/rejon_Hammer.png"
        }
    ];

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    ngOnInit(): void {
        console.log('In OnInit');
    }

}

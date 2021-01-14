import  { Component, OnChanges, Input,
          Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'ai-star',
    templateUrl: 'app/shared/star.component.html',
    styleUrls: ['app/shared/star.component.css']
})
export class StarComponent implements OnChanges {
    // PARENT COMPONENT TO SESENDING  DATA TO DEPENDENT COMPONENT
    // - USE @INPUT property decorator

    //we want the rating property passed to product-list.compoenent.html
    //so that it can be populated (binding) in product-list.compoenent.html like this:
    //[rating]='product.starRating'. We encloe the binding target in square
    //bracket
    @Input() rating: number;
    starWidth: number;
    
    //SENDING DATA TO PARENT COMPONENT - use @output() property decorator, however
    //the property type must be an event of type EventEmitter<T>
    //<T> is the event payload in this case a string.
    @Output() ratingClicked: EventEmitter<string> =
        new EventEmitter<string>();

    //whenever the container data changes in this case the product rating 
    // in product-list.component
    //the OnChange lifecycle event is generated 
    ngOnChanges(): void {
        this.starWidth = this.rating * 86 / 5;
    }

    //when the button is clicked, the ratingClickEvent is raised and
    //the payload or argument is passed.
    //When the event is raised, the parent component receives that event
    //and stores it in the @property defined in star-component.ts which 
    //in this case is named ratingClicked
    //(see (ratingClicked)='onRatingClicked($event) in product-list.component.html)
    onClick(): void {
        this.ratingClicked.emit(`The rating ${this.rating} was clicked!`);
    }
}

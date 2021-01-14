import  { Component, OnChanges, Input,
          Output, EventEmitter } from '@angular/core';

//define component decorator
@Component({
    selector: 'ai-star', //component name
    templateUrl: 'app/shared/star.component.html',
    styleUrls: ['app/shared/star.component.css']
})


//define class. it is implementin OnChanges interface
export class StarComponent implements OnChanges {
    //we need the @Input decorator to decorate properties in the nested component's class that expects data
    //from the parent container
    //In this example we want the parent container to pass "rating number" to the nested component
    //specifically the product.starRating property which we call here "number"
    @Input() rating: number;

    starWidth: number;

    //if the child container wants to pass data to the parent container, it exposes an event
    //using the @Output decorator. However the property type must be an "EventEmitter" object.
    //<string> is the type of the event payload. We could also specify number, array, or object...as type
    @Output() ratingClicked: EventEmitter<string> =
        new EventEmitter<string>();  

    //calculates value of starWidth property
    ngOnChanges(): void {
        this.starWidth = this.rating * 86 / 5;
    }

    onClick(): void {
        //call ratingClicked event and call its emit() method to pass data to the parent container.
        //in the parent container we use the event binding to bind "ratingClicked" event and call ai
        //method. Example:
        // (ratingClicked)='onRatingClicked($event)'> The incoming data is access using $event.
        this.ratingClicked.emit(`The rating ${this.rating} was clicked!`);
    }
}

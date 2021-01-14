"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var StarComponent = (function () {
    function StarComponent() {
        // PARENT COMPONENT TO SESENDING  DATA TO DEPENDENT COMPONENT
        // - USE @INPUT property decorator
        //SENDING DATA TO PARENT COMPONENT - use @output() property decorator, however
        //the property type must be an event of type EventEmitter<T>
        //<T> is the event payload in this case a string.
        this.ratingClicked = new core_1.EventEmitter();
    }
    //whenever the container data changes in this case the product rating 
    // in product-list.component
    //the OnChange lifecycle event is generated 
    StarComponent.prototype.ngOnChanges = function () {
        this.starWidth = this.rating * 86 / 5;
    };
    //when the button is clicked, the ratingClickEvent is raised and
    //the payload or argument is passed.
    //When the event is raised, the parent component receives that event
    //and stores it in the @property defined in star-component.ts which 
    //in this case is named ratingClicked
    //(see (ratingClicked)='onRatingClicked($event) in product-list.component.html)
    StarComponent.prototype.onClick = function () {
        this.ratingClicked.emit("The rating " + this.rating + " was clicked!");
    };
    return StarComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], StarComponent.prototype, "rating", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], StarComponent.prototype, "ratingClicked", void 0);
StarComponent = __decorate([
    core_1.Component({
        selector: 'ai-star',
        templateUrl: 'app/shared/star.component.html',
        styleUrls: ['app/shared/star.component.css']
    })
], StarComponent);
exports.StarComponent = StarComponent;
//# sourceMappingURL=star.component.js.map
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
var core_1 = require("@angular/core");
//define component decorator
var StarComponent = (function () {
    function StarComponent() {
        //if the child container wants to pass data to the parent container, it exposes an event
        //using the @Output decorator. However the property type must be an "EventEmitter" object.
        //<string> is the type of the event payload. We could also specify number, array, or object...as type
        this.ratingClicked = new core_1.EventEmitter();
    }
    //calculates value of starWidth property
    StarComponent.prototype.ngOnChanges = function () {
        this.starWidth = this.rating * 86 / 5;
    };
    StarComponent.prototype.onClick = function () {
        //call ratingClicked event and call its emit() method to pass data to the parent container.
        //in the parent container we use the event binding to bind "ratingClicked" event and call ai
        //method. Example:
        // (ratingClicked)='onRatingClicked($event)'> The incoming data is access using $event.
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
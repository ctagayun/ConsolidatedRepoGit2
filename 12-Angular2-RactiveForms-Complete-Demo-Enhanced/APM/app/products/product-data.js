"use strict";
//this is the ProductData class, it implements InMemoryDbService which specifies
//one required method the "createDB" method. in this method we provide the 
//the data managed by the service. In our example we create an arry of products.
//Note: using "id is required for the in-memory-web-api service to access the data by id.
var ProductData = (function () {
    function ProductData() {
    }
    ProductData.prototype.createDb = function () {
        var products = [
            {
                'id': 1,
                'productName': 'Leaf Rake',
                'productCode': 'GDN-0011',
                'releaseDate': 'March 19, 2016',
                'description': 'Leaf rake with 48-inch wooden handle.',
                'price': 19.95,
                'starRating': 3.2,
                'imageUrl': 'http://openclipart.org/image/300px/svg_to_png/26215/Anonymous_Leaf_Rake.png',
                'tags': ['rake', 'leaf', 'yard', 'home']
            },
            {
                'id': 2,
                'productName': 'Garden Cart',
                'productCode': 'GDN-0023',
                'releaseDate': 'March 18, 2016',
                'description': '15 gallon capacity rolling garden cart',
                'price': 32.99,
                'starRating': 4.2,
                'imageUrl': 'http://openclipart.org/image/300px/svg_to_png/58471/garden_cart.png'
            },
            {
                'id': 5,
                'productName': 'Hammer',
                'productCode': 'TBX-0048',
                'releaseDate': 'May 21, 2016',
                'description': 'Curved claw steel hammer',
                'price': 8.9,
                'starRating': 4.8,
                'imageUrl': 'http://openclipart.org/image/300px/svg_to_png/73/rejon_Hammer.png',
                'tags': ['tools', 'hammer', 'construction']
            },
            {
                'id': 8,
                'productName': 'Saw',
                'productCode': 'TBX-0022',
                'releaseDate': 'May 15, 2016',
                'description': '15-inch steel blade hand saw',
                'price': 11.55,
                'starRating': 3.7,
                'imageUrl': 'http://openclipart.org/image/300px/svg_to_png/27070/egore911_saw.png'
            },
            {
                'id': 10,
                'productName': 'Video Game Controller',
                'productCode': 'GMG-0042',
                'releaseDate': 'October 15, 2015',
                'description': 'Standard two-button video game controller',
                'price': 35.95,
                'starRating': 4.6,
                'imageUrl': 'http://openclipart.org/image/300px/svg_to_png/120337/xbox-controller_01.png'
            }
        ];
        return { products: products };
    };
    return ProductData;
}());
exports.ProductData = ProductData;
//# sourceMappingURL=product-data.js.map
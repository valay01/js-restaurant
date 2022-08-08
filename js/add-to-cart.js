var menu = [
  {
    id: 1,
    product_name: "Burger",
    price: 4.99,
    quantity: 3,
  },
  {
    id: 2,
    product_name: "Chicken wrap",
    price: 8.99,
    quantity: 2,
  },
  {
    id: 3,
    product_name: "Veggie Bowl",
    price: 10.0,
    quantity: 1,
  },
];
// set array of object to browser local storage
localStorage.setItem("menu", JSON.stringify(menu));
cart = [];
localStorage.setItem("cart", JSON.stringify(cart));

// add item to cart function
function addItem(id) {
  // retrieve date from browser local storage
  var items = localStorage.getItem("menu");
  var arrayOfObjects = eval(items);
  //   console.log(arrayOfObjects);

  for (i = 0; i < arrayOfObjects.length; i++) {
    var object = arrayOfObjects[i];
    if (object["id"] == id) {
      var oldCart = localStorage.getItem("cart");
      // first phase when the cart is empty
      if (oldCart == "[]") {
        var newCart = [
          {
            id: object["id"],
            product_name: object["product_name"],
            price: object["price"],
            quantity: 1,
          },
        ];
        var updateCartObject = [...newCart];
        console.log("Item added first time");
      } else {
        console.log("Cart is not empty");
        var oldCartobject = eval(oldCart);
        var temp = false;
        for (cartItem = 0; cartItem < oldCartobject.length; cartItem++) {
          console.log("WHOLE CART", oldCartobject);
          var oldCartItem = oldCartobject[cartItem];

          if (oldCartItem["id"] == id) {
            console.log("Duplicate Item Found");
            var newCart = [
              {
                id: oldCartItem["id"],
                product_name: oldCartItem["product_name"],
                price: oldCartItem["price"],
                quantity: oldCartItem["quantity"] + 1,
              },
            ];
            const updatedOldCartObject = oldCartobject.filter(
              (item) => item.id !== id
            );
            
            console.log("NEW one", updatedOldCartObject);

            console.log("UPDATED WHOLE CART", oldCartobject);
            // oldCartobject = [...newCart];
            // console.log("oldCartobject", oldCartobject);
            var updateCartObject = [...updatedOldCartObject, ...newCart];
            console.log("done");
            temp = true;
          } else {
            if (temp == false) {
              console.log("New item added to the existing cart.");
              var newCart = [
                {
                  id: object["id"],
                  product_name: object["product_name"],
                  price: object["price"],
                  quantity: 1,
                },
              ];
              var updateCartObject = [...eval(oldCart), ...newCart];
            }
          }

          //   var newCart = [
          //     {
          //       id: oldCartItem["id"],
          //       product_name: oldCartItem["product_name"],
          //       price: oldCartItem["price"],
          //       quantity: oldCartItem["quantity"] + 1,
          //     },
          //   ];
          //   // var updateCartObject = [...eval(oldCart), ...newCart];

          //   console.log("Duplicate Item Found");
          // } else {
          //   console.log("New item added to the existing cart.");
          //   var newCart = [
          //     {
          //       id: object["id"],
          //       product_name: object["product_name"],
          //       price: object["price"],
          //       quantity: 1,
          //     },
          //   ];
          //   var updateCartObject = [...eval(oldCart), ...newCart];
          // }
        }
      }

      // var newCart = [
      //   {
      //     id: object["id"],
      //     product_name: object["product_name"],
      //     price: object["price"],
      //     quantity: 1,
      //   },
      // ];
      // if (oldCart == "[]") {
      //   var updateCartObject = [...newCart];
      // } else {
      //   var updateCartObject = [...eval(oldCart), ...newCart];
      // }
      localStorage.setItem("cart", JSON.stringify(updateCartObject));
    }
    var f = localStorage.getItem("cart");
    console.log("Final Cart", f);
  }
  updateCartNumber(); // update the cart number in menu
}

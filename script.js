var shoppingCart = (function () {
    var cart = [];

    /**
     * Function-constructor Item
     * @param name
     * @param price
     * @param count
     * @param weight
     * @constructor
     */
    function Item(name, price, count, weight) {
        this.name = name;
        this.price = price;
        this.count = count;
        this.weight = weight;
    }

    /**
     * function saveCart();
     */
    function saveCart() {
        sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
    }

    /**
     * function loadCart();
     */
    function loadCart() {
        cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
    }

    if (sessionStorage.getItem("shoppingCart") != null) {
        loadCart();
    }

    var obj = {};

    /**
     * Method Add to cart
     * @param name
     * @param price
     * @param count
     * @param weight
     */
    obj.addItemToCart = function (name, price, count, weight) {
        for (var item in cart) {
            if (cart[item].name === name) {
                cart[item].count++;
                saveCart();
                return;
            }
        }
        var item = new Item(name, price, count, weight);
        cart.push(item);
        saveCart();
    };

    /**
     * Method Set count from item
     * @param name
     * @param count
     */
    obj.setCountForItem = function (name, count) {
        for (var i in cart) {
            if (cart[i].name === name) {
                cart[i].count = count;
                break;
            }
        }
    };

    /**
     * Method Remove item from cart
     * @param name
     */
    obj.removeItemFromCart = function (name) {
        for (var item in cart) {
            if (cart[item].name === name) {
                cart[item].count--;
                if (cart[item].count === 0) {
                    cart.splice(item, 1);
                }
                break;
            }
        }
        saveCart();
    };

    /**
     * Method Remove all items from cart
     * @param name
     */
    obj.removeItemFromCartAll = function (name) {
        for (var item in cart) {
            if (cart[item].name === name) {
                cart.splice(item, 1);
                break;
            }
        }
        saveCart();
    };

    // Clear cart
    /**
     *  Method Clear cart
     */
    obj.clearCart = function () {
        cart = [];
        saveCart();
    };

    /**
     * Method Count cart
     * @returns {number}
     */
    obj.totalCount = function () {
        var totalCount = 0;
        for (var item in cart) {
            totalCount += cart[item].count;
        }
        return totalCount;
    };

    /**
     * Method Total cart
     * @returns {number}
     */
    obj.totalCart = function () {
        var totalCart = 0;
        for (var item in cart) {
            totalCart += cart[item].price * cart[item].count;
        }
        return Number(totalCart.toFixed(2));
    };

    /**
     * Method List cart
     * @returns {Array}
     */
    obj.listCart = function () {
        var cartCopy = [];
        for (i in cart) {
            item = cart[i];
            itemCopy = {};
            for (p in item) {
                itemCopy[p] = item[p];

            }
            itemCopy.total = Number(item.price * item.count).toFixed(2);
            cartCopy.push(itemCopy)
        }
        return cartCopy;
    };

    // cart : Array
    // Item : Object/Class
    // addItemToCart : Function
    // removeItemFromCart : Function
    // removeItemFromCartAll : Function
    // clearCart : Function
    // countCart : Function
    // totalCart : Function
    // listCart : Function
    // saveCart : Function
    // loadCart : Function
    return obj;
})();


// Add item
$('.add-to-cart').click(function (event) {
    event.preventDefault();
    var name = $(this).data('name');
    var price = Number($(this).data('price'));
    var weight = Number($(this).data('weight'));
    shoppingCart.addItemToCart(name, price, 1, weight);
    displayCart();
});

// Clear items
$('.clear-cart').click(function () {
    shoppingCart.clearCart();
    displayCart();
});


function displayCart() {
    var cartArray = shoppingCart.listCart();
    var output = "";
    for (var i in cartArray) {
        output += "<tr><th>Product</th><th>Price/1 item</th><th>Weight(g)</th><th>Quantity</th><th>Delete</th><th>Total</th></tr>" +

            "<tr>"
            + "<th>" + cartArray[i].name + "</th>"
            + "<td>$" + cartArray[i].price + "</td>"
            + "<td>" + cartArray[i].weight + "g</td>"
            + "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-primary' data-name=" + cartArray[i].name + ">-</button>"
            + "<input type='number' class='item-count form-control' data-name='" + cartArray[i].name + "' value='" + cartArray[i].count + "'>"
            + "<button class='plus-item btn btn-primary input-group-addon' data-name=" + cartArray[i].name + ">+</button></div></td>"
            + "<td><button class='delete-item btn btn-danger' data-name=" + cartArray[i].name + ">X</button></td>"
            + " = "
            + "<td>" + cartArray[i].total + "</td>"
            + "</tr>";
    }
    $('.show-cart').html(output);
    $('.total-cart').html(shoppingCart.totalCart());
    $('.total-count').html(shoppingCart.totalCount());
}

// Delete item button
$('.show-cart').on("click", ".delete-item", function (event) {
    var name = $(this).data('name')
    shoppingCart.removeItemFromCartAll(name);
    displayCart();
});


// -1
$('.show-cart').on("click", ".minus-item", function (event) {
    var name = $(this).data('name');
    shoppingCart.removeItemFromCart(name);
    displayCart();
});
// +1
$('.show-cart').on("click", ".plus-item", function (event) {
    var name = $(this).data('name');
    shoppingCart.addItemToCart(name);
    displayCart();
});

// Item count input
$('.show-cart').on("change", ".item-count", function (event) {
    var name = $(this).data('name');
    var count = Number($(this).val());
    shoppingCart.setCountForItem(name, count);
    displayCart();
});

displayCart();

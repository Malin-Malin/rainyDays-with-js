const cartContainer = document.getElementById("cart-container");
var cartCountContainer = document.getElementById("cart-count");
const cartTotalContainer = document.getElementById("cart-total-container");

var cart = JSON.parse(localStorage.getItem("cart"));
if (cart === null) {
    cart = {};
}

function addToCart(product, qty=1) {
  //Add quantity to cart, default to 1.
    if (cart[product.id] !== undefined) {
        cart[product.id].qty += qty;
    } else {
        cart[product.id] = {
                product:product,
                qty: qty
                }
    }
    displayCartCount();
    localStorage.setItem("cart",JSON.stringify(cart));
}

function removeFromCart(product, qty=-1){
    if (qty===-1) {
        //Remove all from cart
        if (cart[product.id] !== undefined) {
            delete cart[product.id]
        }
    }else{
        //Remove quantity from cart
        if (cart[product.id] !== undefined) {
            if(cart[product.id].qty <= qty){
                delete cart[product.id]
            }else{
                cart[product.id].qty -= qty
            }
        }
    }
    displayCartCount();
    localStorage.setItem("cart",JSON.stringify(cart));
}

function clearCart() {
    cart={};
    localStorage.setItem("cart", JSON.stringify(cart));
}

function displayCart(displayRemoveBtn=true) {
    if (!cartContainer){return;}
    cartContainer.innerHTML = "";
        if (Object.keys(cart).length === 0) {
            cartContainer.innerHTML = "<p>Your cart is empty.</p>";
            
            return;
        }
    
        Object.keys(cart).forEach(id => {
            const cartLineElement = document.createElement("div");
            cartLineElement.classList.add("cart-line");
            cartLineElement.innerHTML = `
                <h3>${cart[id].product.title}</h3>
                <img src="${cart[id].product.image.url}" alt="${cart[id].product.image.alt}">
                <p>Price:</strong> NOK ${cart[id].product.price}</p>
                <p>Quantity:</strong> ${cart[id].qty}</p>
                <p><strong>Total:</strong> NOK ${(cart[id].product.price*cart[id].qty).toFixed(2)}</p>
            `;
            

            if(displayRemoveBtn){
                var btnContainer = document.createElement('div');
                btnContainer.classList.add('btnShop');
                //removeOne button
                var removeOne = document.createElement('input');
                removeOne.type = "button"
                removeOne.addEventListener('click', function(){
                    removeFromCart(cart[id].product,1);
                    displayCart();
                    displayCartTotal();
                });
                removeOne.value="-";
                removeOne.classList.add('btn','btnShop');
                btnContainer.appendChild(removeOne);
                
                //removeAll button
                var removeAll = document.createElement('input');
                removeAll.type = "button"
                removeAll.addEventListener('click', function(){
                    removeFromCart(cart[id].product);
                    displayCart();
                    displayCartTotal();
                });
                removeAll.value="Remove all";
                removeAll.classList.add('btn','btnShop');
                btnContainer.appendChild(removeAll);

                cartLineElement.appendChild(btnContainer);
            }
            cartContainer.appendChild(cartLineElement);
        }
    );
    return;
}

function displayCartTotal() {
    if (!cartTotalContainer) return;
    cartTotalContainer.innerText="";
    if (Object.keys(cart).length === 0) {
        cartTotalContainer.innerText = "NOK 0";
        return;
    }
    var total = 0;
    Object.keys(cart).forEach(id => {
            total += cart[id].product.price * cart[id].qty;
        }
    );
    cartTotalContainer.innerText = `NOK ${total.toFixed(2)}`;
    return;
}

function displayCartCount() {
    if (!cartCountContainer){
        cartCountContainer = document.getElementById("cart-count");
        if (!cartCountContainer) return;
    }
    cartCountContainer.innerText="";
    if (Object.keys(cart).length === 0) {
        cartCountContainer.innerText = "0";
        return;
    }
    count = 0;
    Object.keys(cart).forEach(id => {
            count += cart[id].qty;
        }
    );
    cartCountContainer.innerText = `${count}`;
    return;
}

function getProductQty(productId) {
    if (cart[productId] === undefined){
        return 0;
    }else{
        return cart[productId].qty;
    }
}

displayCartCount();
displayCart();
displayCartTotal();
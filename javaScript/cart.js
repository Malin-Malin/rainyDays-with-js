const cartContainer = document.getElementById("cart-container");
const cartCountContainer = document.getElementById("cart-count");
const cartTotalContainer = document.getElementById("cart-total-container");

var cart = JSON.parse(localStorage.getItem("cart"));
if (cart === null) {
    cart={};
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
                <p><strong>Total:</strong> NOK ${cart[id].product.price*cart[id].qty}</p>
            `;
            
            if(displayRemoveBtn){
                //remove button
                var removeBtn = document.createElement('input');
                removeBtn.type = "button"
                removeBtn.addEventListener('click', function(){
                    removeFromCart(cart[id].product);
                    displayCart();
                    displayCartTotal();
                });
                removeBtn.value="Remove item";
                removeBtn.classList.add('btn');
                cartLineElement.appendChild(removeBtn);
            }
            cartContainer.appendChild(cartLineElement);
        }
    );
    return;
}

function displayCartTotal() {
    cartTotalContainer.innerText="";
    if (Object.keys(cart).length === 0) {
        cartTotalContainer.innerText = "$ 0";
        return;
    }
    total = 0;
    Object.keys(cart).forEach(id => {
            total += cart[id].product.price * cart[id].qty;
        }
    );
    cartTotalContainer.innerText = `$ ${total}`;
    return;
}

function displayCartCount() {
    if (cartCountContainer === null){return;}
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
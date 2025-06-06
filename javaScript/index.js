const apiUrl = "https://v2.api.noroff.dev/rainy-days";
const productContainer = document.getElementById("product-container");
const genderFilter = document.getElementById("gender");
const filterBtn = document.getElementById("filter-btn");

let allProducts = [];

async function fetchProducts() {
    showLoader();
    try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error("Failed to fetch products");
    }
    const data = await response.json();
    allProducts = data.data;
    filterProducts();
    } catch (error) {
        productContainer.innerHTML = `<p>Failed to load products: ${error.message}</p>`;
    } finally {
        hideLoader();
    }
}

function filterProducts(){
    var productsToDisplay = [];
    const selectedGender = genderFilter.value;
    if (selectedGender !== "all") {
        productsToDisplay = allProducts.filter(product => product.gender === selectedGender);
    }else{
        productsToDisplay = allProducts;
    }
    displayProducts(productsToDisplay);
}

function displayProducts(products) {
    productContainer.innerHTML = "";
    if (products.length === 0) {
        productContainer.innerHTML = "<p>No products found.</p>";
    return;
    }

    products.forEach(product => {
        const productElement = document.createElement("div");
        productElement.classList.add("product");
        productElement.innerHTML = `
            <h3>${product.title}</h3>
            <p><strong>Gender:</strong> ${product.gender}</p>
            <p><strong>Category:</strong> ${product.tags.join(", ")}</p>
            <img src="${product.image.url}" alt="${product.image.alt}">
            <a href="./product/index.html?pid=${product.id}" class="btn">View more</a>
            <p><strong>Price:</strong> NOK ${product.price}</p>
            <p>Quantity = ${getProductQty(product.id)}</p>
        `;
       
        var btnContainer = document.createElement('div');
        btnContainer.classList.add('btnShop');

        //Add button
        var addBtn = document.createElement('input');
        addBtn.type = "button"
        addBtn.addEventListener('click', function(){
            addToCart(product);
            fetchProducts();
        });
        addBtn.value="+";
        addBtn.classList.add('btn', 'btnShop');
        btnContainer.appendChild(addBtn);
        
        //remove button
        var removeBtn = document.createElement('input');
        removeBtn.type = "button"
        removeBtn.addEventListener('click', function(){
            removeFromCart(product,1);
            fetchProducts();
        });
        removeBtn.value="-";
        removeBtn.classList.add('btn', 'btnShop');
        btnContainer.appendChild(removeBtn);
        
        productElement.appendChild(btnContainer);
        productContainer.appendChild(productElement);
    });
}

function showLoader() {
    const loader = document.querySelector('.loader');
    loader.hidden = false;
}
  
function hideLoader() {
    const loader = document.querySelector('.loader');
    loader.hidden = true;
}

filterBtn.addEventListener("click", filterProducts);
fetchProducts();
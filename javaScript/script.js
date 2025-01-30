const apiUrl = "https://v2.api.noroff.dev/rainy-days"; 
const resultsContainer = document.getElementById("results");


async function fetchProducts() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error("Failed getting data from API");
        }
        const data = await response.json();
        products = data.data;
        displayProducts(products);
    } catch (error) {
        resultsContainer.innerHTML = `<p>No products to be found: ${error.message}</p>`;
    }
}

function displayProducts(productsToDisplay) {
    resultsContainer.innerHTML = "";
    if (productsToDisplay.length === 0) {
        resultsContainer.innerHTML = "<p>Ingen produkter funnet.</p>";
        return;
    }

    productsToDisplay.forEach(product => {
        const productElement = document.createElement("div");
        productElement.classList.add("product");
        productElement.innerHTML = `
            <h3>${product.title}</h3>
            <p><strong>Size:</strong> ${product.sizes}</p>
            <img src="${product.image.url}" alt="${product.image.alt}">
            <p><strong>Price:</strong> ${product.price} $</p>
        `;
        resultsContainer.appendChild(productElement);
    });
}

fetchProducts();

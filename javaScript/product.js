const apiBaseUrl = "https://v2.api.noroff.dev/rainy-days"; 
const resultsContainer = document.getElementById("results");

// Function to fetch a single product by ID
async function fetchProductById(productId) {
    try {
        const response = await fetch(`${apiBaseUrl}/${productId}`);
        if (!response.ok) {
            throw new Error("Failed to fetch product details");
        }
        const data = await response.json();
        displaySingleProduct(data.data);
    } catch (error) {
        resultsContainer.innerHTML = `<p>Product not found: ${error.message}</p>`;
    }
}

// Function to display product details
function displaySingleProduct(product) {
    resultsContainer.innerHTML = "";  // Clear previous content

    const productElement = document.createElement("div");
    productElement.classList.add("product-details");

    productElement.innerHTML = `
        <h2>${product.title}</h2>
        <img src="${product.image.url}" alt="${product.image.alt}">
        <p><strong>Description:</strong> ${product.description}</p>
        <p><strong>Size:</strong> ${product.sizes.join(", ")}</p>
        <p><strong>Price:</strong> ${product.price} $</p>
    `;

    resultsContainer.appendChild(productElement);
}

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
      var pair = vars[i].split("=");
      if (pair[0] == variable) {
        return pair[1];
      }
    }
    return "b8b528fc-6c60-41f6-a5a9-9a8b27a9482a";
    // alert('Query Variable ' + variable + ' not found');
  }

fetchProductById(getQueryVariable("pid"));

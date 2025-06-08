# Rainy Days - [Interactive Online Store](https://malin-malin.github.io/rainyDays-with-js/index.html)

## Project Overview

This project is an interactive online store built using JavaScript, HTML, and CSS. The store dynamically fetches and displays products from an API, allowing users to browse, filter, and manage their shopping cart. The implementation aligns with the provided user stories to create a functional e-commerce experience.

## Recent Changes and Updates

### 1. **Integration of JavaScript and API Fetching**

- Implemented JavaScript to dynamically fetch product data from the API endpoint.
- Products are now displayed on the homepage without requiring hardcoded HTML.
- Used `fetch()` to retrieve product data and update the UI in real-time.

### 2. **Product Listing and Filtering**

- Products are displayed dynamically using JavaScript.
- Implemented filtering functionality based on **category, gender, or genre**.
- Users can select filters and see the product list update accordingly.

### 3. **Single Product Page**

- Clicking on a product directs the user to a **single product page** that provides detailed information.
- Product details are dynamically loaded using the product ID from the API.

### 4. **Shopping Cart Functionality**

- Users can **add** products to the shopping cart, which is stored in `localStorage`.
- A **cart counter** updates in real-time to show the number of items in the cart.
- Implemented a "Remove from Cart" function to allow users to delete items from their basket.
- A checkout page summarizes all items in the cart.

### 5. **Order Confirmation Page**

- Once users proceed to checkout, an order confirmation screen is displayed.
- The confirmation screen provides a summary of the purchase, ensuring a complete shopping experience.

## Technologies Used

- **JavaScript (ES6+)** for dynamic UI updates and API interactions.
- **HTML & CSS** for structure and styling.
- **Fetch API** for retrieving product data.

## Next Steps and Improvements

- Improve user experience by adding **loading states** while fetching data.
- Implement a **search functionality** for quick product look-up.
- Add **error handling** to manage API failures more gracefully.
- Ensure responsiveness and accessibility improvements.

## API Endpoint Used

```
https://v2.api.noroff.dev/rainy-days
```

## Credits

RainyDays has design and code by Malin Skrettingland.

<p align="center">
  <img src="/Images/Cartoon-style-portrait-01.05.jpg" alt="Cartoon-style portrait" width="400">
</p>

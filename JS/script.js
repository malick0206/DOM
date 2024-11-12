// Function to update the total price
function updateTotalPrice() {
    let total = 0;
    const products = document.querySelectorAll(".card-body");
    products.forEach(product => {
        const unitPrice = parseFloat(product.querySelector(".unit-price").textContent.replace(" $", ""));
        const quantity = parseInt(product.querySelector(".quantity").textContent, 10);
        total += unitPrice * quantity;
    });
    document.querySelector(".total").textContent = `${total.toFixed(2)} $`;
}

// Function to adjust quantity when clicking plus or minus
function adjustQuantity(event) {
    const isIncrement = event.target.classList.contains("fa-plus-circle");
    const quantityElement = event.target.closest(".card-body").querySelector(".quantity");
    let quantity = parseInt(quantityElement.textContent, 10);

    // Increment or decrement quantity
    quantity = isIncrement ? quantity + 1 : Math.max(0, quantity - 1);
    quantityElement.textContent = quantity;

    // Update total price after quantity change
    updateTotalPrice();
}

// Function to remove an item from the cart
function removeItem(event) {
    const productCard = event.target.closest(".card-body");
    productCard.remove();
    updateTotalPrice(); // Update total after removing item
}

// Function to toggle the "liked" state of an item
function toggleLike(event) {
    event.target.classList.toggle("liked");
}

// Event listeners setup
function initializeCart() {
    // Event listeners for quantity adjustment
    document.querySelectorAll(".fa-plus-circle, .fa-minus-circle").forEach(button => {
        button.addEventListener("click", adjustQuantity);
    });

    // Event listeners for removing items
    document.querySelectorAll(".fa-trash-alt").forEach(button => {
        button.addEventListener("click", removeItem);
    });

    // Event listeners for liking items
    document.querySelectorAll(".fa-heart").forEach(button => {
        button.addEventListener("click", toggleLike);
    });

    // Initialize total price on load
    updateTotalPrice();
}

// Run initialization on DOMContentLoaded
document.addEventListener("DOMContentLoaded", initializeCart);

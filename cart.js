const cartItemsContainer = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const clearCartBtn = document.querySelector(".clear-cart");
const checkoutBtn = document.getElementById("checkoutBtn");
let cart = JSON.parse(localStorage.getItem("cart")) || [];
function renderCart() {
    cartItemsContainer.innerHTML = "";
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Your cart is empty 🛒</p>";
        cartTotal.innerText = "$0.00";
        updateCheckoutState();
        return;
    }
    let total = 0;
    cart.forEach((item, index) => {
        const priceNumber = Number(item.price.replace(/[^0-9.]/g, ""));
        total += priceNumber * item.quantity;
        cartItemsContainer.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-info">
          <h4>${item.name}</h4>
          <p>Price: ${item.price}</p>
          <p>Quantity: ${item.quantity}</p>
        </div>
        <div class="cart-actions">
          <button onclick="removeItem(${index})">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
    `;
    });

    cartTotal.innerText = `$${total.toFixed(2)}`;
    updateCheckoutState();
}
function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}
clearCartBtn.addEventListener("click", () => {
    localStorage.removeItem("cart");
    cart = [];
    renderCart();
});
function updateCheckoutState() {
    if (!checkoutBtn) return;
    if (cart.length === 0) {
        checkoutBtn.disabled = true;
        checkoutBtn.classList.remove(
            "bg-primary",
            "hover:bg-blue-700",
            "cursor-pointer"
        );
        checkoutBtn.classList.add(
            "bg-gray-300",
            "cursor-not-allowed"
        );
    } else {
        checkoutBtn.disabled = false;
        checkoutBtn.classList.remove(
            "bg-gray-300",
            "cursor-not-allowed"
        );
        checkoutBtn.classList.add(
            "bg-primary",
            "hover:bg-blue-700",
            "cursor-pointer"
        );
    }
}
if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
        alert(" Checkout completed successfully!");

        localStorage.removeItem("cart");
        cart = [];
        renderCart();
    });
}
renderCart();

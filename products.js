const products = document.querySelectorAll('.product-card');
const categoryFilters = document.querySelectorAll('.filter-category');
const ratingFilters = document.querySelectorAll('.filter-rating');
const minPriceInput = document.getElementById('minPrice');
const maxPriceInput = document.getElementById('maxPrice');
const resultsCount = document.getElementById('resultsCount');
function filterProducts() {
    const activeCategories = [...categoryFilters]
        .filter(c => c.checked)
        .map(c => c.value);

    const activeRatings = [...ratingFilters]
        .filter(r => r.checked)
        .map(r => Number(r.value));

    const minPrice = Number(minPriceInput.value);
    const maxPrice = Number(maxPriceInput.value);
    let visibleCount = 0;
    products.forEach(product => {
        const category = product.dataset.category;
        const price = Number(product.dataset.price);
        const rating = Number(product.dataset.rating);
        const matchCategory =
            activeCategories.length === 0 || activeCategories.includes(category);
        const matchPrice = price >= minPrice && price <= maxPrice;
        const matchRating =
            activeRatings.length === 0 ||
            activeRatings.some(r => rating >= r);

        if (matchCategory && matchPrice && matchRating) {
            product.style.display = "block";
            visibleCount++;
        } else {
            product.style.display = "none";
        }
    });
    resultsCount.textContent = `Showing ${visibleCount} products`;
}
categoryFilters.forEach(cb => cb.addEventListener('change', filterProducts));
ratingFilters.forEach(cb => cb.addEventListener('change', filterProducts));
minPriceInput.addEventListener('input', filterProducts);
maxPriceInput.addEventListener('input', filterProducts);
document.getElementById('resetFilters').onclick = () => {
    categoryFilters.forEach(cb => cb.checked = false);
    ratingFilters.forEach(cb => cb.checked = false);
    minPriceInput.value = 0;
    maxPriceInput.value = 2000;
    filterProducts();
};
filterProducts();
const cartButtons = document.querySelectorAll(".cart-btn");
cartButtons.forEach(button => {
    button.addEventListener("click", () => {
        const productCard = button.closest(".product-card");
        const product = {
            id: productCard.querySelector("h4").innerText,
            name: productCard.querySelector("h4").innerText,
            price: productCard.querySelector(".price").innerText,
            image: productCard.querySelector("img").src,
            quantity: 1
        };
        addToCart(product);
    });
});
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartDot();
}
const cartDot = document.querySelector(".cart-dot");
function updateCartDot() {
    if (!cartDot) return;

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length > 0) {
        cartDot.classList.remove("hidden");
    } else {
        cartDot.classList.add("hidden");
    }
}
updateCartDot();

// Sample product data
const products = [
    { id: 1, name: 'Lucknowi Chikan Shirt', category: 'shirts', price: 49.99, image: 'kurta.jpeg' },
    { id: 2, name: 'Mens Kurta', category: 'pants', price: 39.99, image: 'kurta3.jpeg' },
    { id: 3, name: 'Chikankari Dress', category: 'dresses', price: 79.99, image: 'kurta2.jpeg' },
    { id: 4, name: 'Ethnic Kurti', category: 'shirts', price: 54.99, image: 'kurta1.jpeg' },
    { id: 5, name: 'Ethnic Kurta', category: 'pants', price: 29.99, image: 'kurta4.jpeg' },
    { id: 6, name: 'Designer Lehenga', category: 'dresses', price: 149.99, image: 'kurta5.jpeg' },
    { id: 7, name: 'Embroidered Pants', category: 'dresses', price: 149.99, image: 'embroider.webp' },
    { id: 8, name: 'Casual Trousers', category: 'dresses', price: 149.99, image: 'casual.jpg' },
    { id: 9, name: 'saree', category: 'dresses', price: 149.99, image: 'saree.jpg' },
    { id: 10, name: 'Hand Embroidered kurta', category: 'dresses', price: 149.99, image: 'hand.jpg' },
];

document.addEventListener('DOMContentLoaded', function() {
    const productContainer = document.querySelector('.product-list');
    const cartItemsContainer = document.querySelector('.cart-items');
    const promotionBar = document.getElementById('promotionBar');
    const closePromotionBtn = document.getElementById('closePromotionBtn');
    const searchInput = document.getElementById('search');
    const newsletterForm = document.getElementById('newsletter-form');
    const cartTotalElement = document.querySelector('.cart-total');

    let cart = [];

    // Display products on page load
    displayProducts(products);

    // Show promotion bar after delay
    setTimeout(() => {
        promotionBar.classList.add('show');
    }, 2000);

    // Close promotion bar
    closePromotionBtn.addEventListener('click', () => {
        promotionBar.classList.remove('show');
    });

    // Filter products by category
    document.querySelectorAll('.categories a').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.dataset.category;
            const filteredProducts = category === 'all' ? products : products.filter(product => product.category === category);
            displayProducts(filteredProducts);
        });
    });

    // Search products
    searchInput.addEventListener('input', function() {
        const searchValue = this.value.trim().toLowerCase();
        const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchValue));
        displayProducts(filteredProducts);
    });

    // Add product to cart
    productContainer.addEventListener('click', function(e) {
        if (e.target.tagName.toLowerCase() === 'button') {
            const productId = parseInt(e.target.dataset.id);
            const productToAdd = products.find(product => product.id === productId);
            if (productToAdd) {
                addToCart(productToAdd);
                updateCartTotal();
            }
        }
    });

    // Subscribe to newsletter
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('newsletter-email').value;
        if (validateEmail(email)) {
            alert(`Subscribed successfully! We'll send newsletters to ${email}`);
            this.reset();
        } else {
            alert('Please enter a valid email address');
        }
    });

    // Display products on the page
    function displayProducts(products) {
        productContainer.innerHTML = '';
        products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('product');
            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>$${product.price.toFixed(2)}</p>
                <button data-id="${product.id}">Add to Cart</button>
            `;
            productContainer.appendChild(productElement);
        });
    }

    // Add item to cart
    function addToCart(product) {
        cart.push(product);
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="cart-item-info">
                <p>${product.name} - $${product.price.toFixed(2)}</p>
                <button class="remove-btn" data-id="${product.id}">&times;</button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    }

    // Update total price in the cart
    function updateCartTotal() {
        let total = 0;
        cart.forEach(item => {
            total += item.price;
        });
        cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;
    }

    // Validate email address
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Remove item from cart
    cartItemsContainer.addEventListener('click', function(e) {
        if (e.target.tagName.toLowerCase() === 'button' && e.target.classList.contains('remove-btn')) {
            const productId = parseInt(e.target.dataset.id);
            cart = cart.filter(item => item.id !== productId);
            e.target.closest('.cart-item').remove();
            updateCartTotal();
        }
    });
});

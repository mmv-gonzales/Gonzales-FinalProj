const products = [
    { id: 0, 
        image: 'images/Royal-Canin-Hair&Skin-85g.jpg', 
        title: 'Royal Canin Hair & Skin Wet Food 85g', 
        price: 60,
        category: 'Cat Food',
    },
    { id: 1, 
        image: 'images/special-dog-adult-20lbs.jpg', 
        title: 'Special Dog Adult Dry Food 20lbs', 
        price: 1340,
        category: 'Dog Food',
    },
    { id: 2, 
        image: 'images/double-sided-comb.jpg', 
        title: 'Double Sided Hair Pet Comb', 
        price: 150,
        category: 'Pet Supplies',
    },
    { id: 3, 
        image: 'images/lc-vit-120ml.jpg', 
        title: 'LC Vit Multivitamins Syrup 120ml', 
        price: 175,
        category: 'Pet Nutrition' 
    },
    { id: 4, 
        image: 'images/elevated-bowl.jpg', 
        title: 'Elevated Ceramic Pet Food Bowl', 
        price: 250,
        category: 'Pet Supplies', 
    },
];

// Fetch the category from the HTML file
const category = document.getElementById('category').value;

// Filter products based on category
const filteredProducts = products.filter(product => product.category === category);

// Display Items
const displayItem = (items) => {
    document.getElementById('root').innerHTML = items.map((item) => {
        var { id, image, title, price } = item;
        return `
                <div class="card">
                    <img src="${image}" alt="${title}">
                    <div class="card-content">
                        <h3>${title}</h3>
                        <p class="price">₱${price}.00</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mollis.</p>
                        <button class="card-button" onclick="addToCart(${id})">Add To Cart</button>
                    </div>
                </div>
        `;
    }).join('');
};

// Initial display of products
displayItem(filteredProducts);

// Search Functionality
document.getElementById('search-bar').addEventListener('keyup', (e) => {
    const searchData = e.target.value.toLowerCase();
    const filterData = filteredProducts.filter((item) => {
        return (
            item.title.toLowerCase().includes(searchData)
        );
    });
    displayItem(filterData);
});

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Product added to cart');
}

// Render Cart
function renderCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cart');
    cartContainer.innerHTML = '';

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <span>${item.title} - ₱${item.price}.00</span>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartContainer.appendChild(cartItem);
    });
}

// Remove from Cart
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

// Clear Cart
function clearCart() {
    localStorage.removeItem('cart');
    renderCart();
}

document.addEventListener('DOMContentLoaded', renderCart);

let originalData = []; // Array to store the original data fetched from db.json
let cart = []; // Array to store cart items

function toggleContent(sectionId) {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('hidden');
    });
    document.getElementById(sectionId).classList.remove('hidden');
}

// Fetch data from db.json
fetch('https://project-phase1-vc06.onrender.com/db.json')
    .then(response => response.json())
    .then(data => {
        originalData = data.products; // Store the original data
        populateProduceList(originalData);
    })
    .catch(error => console.error('Error fetching data:', error));

// Populate the produce list
function populateProduceList(data) {
    const produceList = document.getElementById('produce-list');
    produceList.innerHTML = ''; // Clear existing items
    data.forEach(product => {
        const productItem = document.createElement('div');
        productItem.classList.add('product-item');
        productItem.setAttribute('data-name', product.name); // Store name for easy access
        productItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}" />
            <h3>${product.name}</h3>
            <p>Price: $${product.price.toFixed(2)}</p>
            <button onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
            <button onclick="deleteItem('${product.name}')">Delete</button>
            <button onclick="openUpdateForm('${product.name}', ${product.price}, '${product.image}')">Update</button>
        `;
        produceList.appendChild(productItem);
    });
}

// Add product to the produce list
function addProduct() {
    const name = document.getElementById('product-name').value;
    const price = parseFloat(document.getElementById('product-price').value);
    const image = document.getElementById('product-image').value;

    if (name && price && image) {
        const newProduct = { name, price, image };
        originalData.push(newProduct); // Add the new product to the original data
        populateProduceList(originalData); // Refresh the display
        alert(`${name} has been added to the produce list.`);
        resetForm(); // Reset the form after adding
    } else {
        alert('Please fill in all fields.');
    }
}

// Add product to cart
function addToCart(productName, price) {
    cart.push({ productName, price });
    alert(`${productName} has been added to your cart at $${price.toFixed(2)}`);
}

// Delete product from original data (hides it temporarily)
function deleteItem(productName) {
    const productItem = document.querySelector(`.product-item[data-name='${productName}']`);
    
    if (productItem) {
        productItem.style.display = 'none'; // Hide the product item
        alert(`${productName} has been removed from your view.`);
    } else {
        alert(`${productName} not found.`);
    }
}

// Open update form with pre-filled data
function openUpdateForm(name, price, image) {
    document.getElementById('product-name').value = name;
    document.getElementById('product-price').value = price;
    document.getElementById('product-image').value = image;

    // Change the button to call updateProduct
    const addProductButton = document.querySelector('#add-product-form button[type="submit"]');
    addProductButton.textContent = 'Update Product';
    addProductButton.setAttribute('onclick', `updateProduct('${name}')`);

    // Show the add-product section
    toggleContent('add-product');
}

// Update product
function updateProduct(originalName) {
    const name = document.getElementById('product-name').value;
    const price = parseFloat(document.getElementById('product-price').value);
    const image = document.getElementById('product-image').value;

    const productIndex = originalData.findIndex(product => product.name === originalName);
    
    if (productIndex !== -1) {
        // Update the original data
        originalData[productIndex] = { name, price, image };

        // Update the display for the product
        const productItem = document.querySelector(`.product-item[data-name='${originalName}']`);
        productItem.setAttribute('data-name', name);
        productItem.querySelector('h3').textContent = name;
        productItem.querySelector('p').textContent = `Price: $${price.toFixed(2)}`;
        productItem.querySelector('img').src = image;

        alert(`${name} has been updated.`);
        resetForm(); // Reset the form after updating
    } else {
        alert(`Product ${originalName} not found.`);
    }
}

// Reset the form after updating or adding
function resetForm() {
    document.getElementById('product-name').value = '';
    document.getElementById('product-price').value = '';
    document.getElementById('product-image').value = '';
    
    const addProductButton = document.querySelector('#add-product-form button[type="submit"]');
    addProductButton.textContent = 'Add Product';
    addProductButton.setAttribute('onclick', `addProduct()`);
}

// Show cart contents
document.getElementById('cart-link').addEventListener('click', function() {
    const cartSection = document.getElementById('cart');
    cartSection.innerHTML = ''; // Clear existing items
    if (cart.length === 0) {
        cartSection.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.innerHTML = `<p>${item.productName} - $${item.price.toFixed(2)}</p>`;
            cartSection.appendChild(cartItem);
        });
    }
    toggleContent('cart'); // Show the cart section
});

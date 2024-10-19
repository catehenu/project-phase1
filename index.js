let originalData = []; // Array to store the original data fetched from db.json


function toggleContent(sectionId) {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('hidden');
    });
    document.getElementById(sectionId).classList.remove('hidden');
}

fetch('./db.json')
    .then(response => response.json())
    .then(data => {
        originalData = data; // Store the original data
        populateProduceList(data);
    })
    .catch(error => console.error('Error fetching data:', error));

function populateProduceList(data) {
    const produceList = document.getElementById('produce-list');
    produceList.innerHTML = ''; // Clear existing items
    data.forEach(product => {
        const productItem = document.createElement('div');
        productItem.classList.add('product-item');
        productItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}" />
            <h3>${product.name}</h3>
            <p>Price: $${product.price.toFixed(2)}</p>
            <button onclick="addToCart('${product.name}', ${product.price})">Add</button>
            <button onclick="deleteItem('${product.name}')">Delete</button>
            <button onclick="openUpdateForm('${product.name}', ${product.price}, '${product.image}')">Update</button>
        `;
        produceList.appendChild(productItem);
    });
}

document.getElementById('add-product-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent page refresh

    const name = document.getElementById('product-name').value;
    const price = parseFloat(document.getElementById('product-price').value);
    const image = document.getElementById('product-image').value;

    const newProduct = { name, price, image };
    
    // Add new product to the list
    originalData.push(newProduct);
    populateProduceList(originalData);

    // Clear the form
    this.reset();
});

function addToCart(productName, price) {
    cart.push({ productName, price });
    alert(`${productName} has been added to your cart at $${price.toFixed(2)}`);
}

function deleteItem(productName) {
    // Find the product in the original data
    const productIndex = originalData.findIndex(product => product.name === productName);
    
    if (productIndex !== -1) {
        originalData.splice(productIndex, 1); // Remove from original data
        alert(`${productName} has been removed from your list.`);
        populateProduceList(originalData); // Update display
    }
}

function openUpdateForm(name, price, image) {
    document.getElementById('product-name').value = name;
    document.getElementById('product-price').value = price;
    document.getElementById('product-image').value = image;
    
    // Optionally, you could have a way to distinguish between adding a new product and updating an existing one
    // For example, setting a data attribute to identify it's an update.
}

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
function openProfileEdit() {
    const name = document.getElementById('profile-name').textContent;
    const email = document.getElementById('profile-email').textContent;
    
    const profileEditForm = `
        <form id="edit-profile-form">
            <label for="edit-name">Name:</label>
            <input type="text" id="edit-name" value="${name}" required />
            <label for="edit-email">Email:</label>
            <input type="email" id="edit-email" value="${email}" required />
            <button type="submit">Save</button>
        </form>
    `;
    
    document.getElementById('profile-info').innerHTML = profileEditForm;

    document.getElementById('edit-profile-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const updatedName = document.getElementById('edit-name').value;
        const updatedEmail = document.getElementById('edit-email').value;

        document.getElementById('profile-name').textContent = updatedName;
        document.getElementById('profile-email').textContent = updatedEmail;

        alert('Profile updated successfully!');
        toggleContent('profile'); // Go back to the profile section
    });
}
function toggleContent(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('hidden');
        section.classList.remove('visible');
    });
    
    // Show the selected section
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.classList.remove('hidden');
        selectedSection.classList.add('visible');
    }
}

// Add functionality to add items to the cart and checkout
function addToCart(product) {
    // Logic to add product to the cart
}

function checkout() {
    // Logic for checkout process
}
let cart = [];

function addProduct(event) {
    event.preventDefault(); // Prevent the form from submitting

    // Get product details from the form
    const productName = document.getElementById('product-name').value;
    const productPrice = parseFloat(document.getElementById('product-price').value);
    const productImage = document.getElementById('product-image').value;

    // Create a product object
    const product = {
        name: productName,
        price: productPrice,
        image: productImage
    };

    // Add product to the cart
    cart.push(product);

    // Clear the form fields
    document.getElementById('add-product-form').reset();

    // Update the cart display
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartItemsDiv = document.getElementById('cart-items');
    cartItemsDiv.innerHTML = ''; // Clear existing items

    // Display each item in the cart
    cart.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px;">
            <span>${item.name} - $${item.price.toFixed(2)}</span>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItemsDiv.appendChild(itemDiv);
    });
}

function removeFromCart(index) {
    cart.splice(index, 1); // Remove item from the cart
    updateCartDisplay(); // Update cart display
}

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    // Here you could implement checkout logic (e.g., send cart to a server)
    alert("Proceeding to checkout with the following items:\n" + cart.map(item => `${item.name} - $${item.price.toFixed(2)}`).join('\n'));
    cart = []; // Clear the cart after checkout
    updateCartDisplay(); // Update cart display
}

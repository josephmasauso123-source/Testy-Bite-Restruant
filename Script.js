// Shopping Cart
let cart = [];

function addToCart(name, price) {
    const existingItem = cart.find(
        item => item.name === name
    );

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    displayCart();

    alert(name + " added to your cart!");
}


// Display Cart Items
function displayCart() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.textContent = "Your cart is empty.";
        cartTotal.textContent = "0";
        return;
    }

    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        const row = document.createElement("div");
        row.className = "cart-row";

        const details = document.createElement("span");

        details.textContent =
            `${item.name} x ${item.quantity} - K${item.price * item.quantity}`;

        const removeButton = document.createElement("button");

        removeButton.textContent = "Remove";

        removeButton.onclick = function () {
            cart.splice(index, 1);
            displayCart();
        };

        row.appendChild(details);
        row.appendChild(removeButton);

        cartItems.appendChild(row);
    });

    cartTotal.textContent = total;
}


// WhatsApp Checkout
function checkout() {
    if (cart.length === 0) {
        alert("Please add food to your cart first.");
        return;
    }

    let message = "Hello Tasty Bite! I want to order:\n\n";

    let total = 0;

    cart.forEach(item => {
        const subtotal = item.price * item.quantity;

        message +=
            `${item.name} x ${item.quantity} = K${subtotal}\n`;

        total += subtotal;
    });

    message += `\nTotal: K${total}`;
    message += "\n\nPlease confirm my order.";

    // Replace this number with the restaurant's
    // WhatsApp number, including country code.
    const phone = "260770000000";

    const whatsappURL =
        "https://wa.me/" + phone +
        "?text=" + encodeURIComponent(message);

    window.open(whatsappURL, "_blank");
}
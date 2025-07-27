// Simple theme toggle
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme")
  const newTheme = currentTheme === "dark" ? "light" : "dark"

  document.documentElement.setAttribute("data-theme", newTheme)
  localStorage.setItem("theme", newTheme)

  const themeToggle = document.getElementById("theme-toggle")
  if (themeToggle) {
    themeToggle.textContent = newTheme === "dark" ? "☀️" : "🌙"
  }
}

// Initialize theme on page load
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme") || "light"
  document.documentElement.setAttribute("data-theme", savedTheme)

  const themeToggle = document.getElementById("theme-toggle")
  if (themeToggle) {
    themeToggle.textContent = savedTheme === "dark" ? "☀️" : "🌙"
    themeToggle.addEventListener("click", toggleTheme)
  }

  // Mobile menu toggle
  const hamburger = document.getElementById("hamburger")
  const navMenu = document.querySelector(".nav-menu")

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("active")
    })
  }

  // Close mobile menu when clicking on links
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      if (navMenu) {
        navMenu.classList.remove("active")
      }
    })
  })

  // Simple cart functionality
  updateCartDisplay()
})

// Simple cart management
let cartItems = JSON.parse(localStorage.getItem("cart")) || []

function addToCart(id, title, artist, price, image) {
  const existingItem = cartItems.find((item) => item.id === id)

  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cartItems.push({
      id: id,
      title: title,
      artist: artist,
      price: price,
      image: image,
      quantity: 1,
    })
  }

  localStorage.setItem("cart", JSON.stringify(cartItems))
  updateCartDisplay()
  showNotification(title + " added to cart!")
}

function removeFromCart(id) {
  cartItems = cartItems.filter((item) => item.id !== id)
  localStorage.setItem("cart", JSON.stringify(cartItems))
  updateCartDisplay()
  displayCartItems()
}

function updateCartDisplay() {
  const cartCount = document.getElementById("cart-count")
  if (cartCount) {
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)
    cartCount.textContent = totalItems
  }
}

function showCart() {
  const cartModal = document.getElementById("cart-modal")
  if (cartModal) {
    cartModal.classList.add("active")
    displayCartItems()
  }
}

function hideCart() {
  const cartModal = document.getElementById("cart-modal")
  if (cartModal) {
    cartModal.classList.remove("active")
  }
}

function displayCartItems() {
  const cartItemsContainer = document.getElementById("cart-items")
  const cartTotal = document.getElementById("cart-total")

  if (!cartItemsContainer) return

  if (cartItems.length === 0) {
    cartItemsContainer.innerHTML = '<div class="empty-cart">Your cart is empty</div>'
  } else {
    cartItemsContainer.innerHTML = cartItems
      .map(
        (item) => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.title}">
        <div class="cart-item-info">
          <h4>${item.title}</h4>
          <p>by ${item.artist}</p>
          <p>Quantity: ${item.quantity}</p>
        </div>
        <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
        <button class="remove-item" onclick="removeFromCart(${item.id})">×</button>
      </div>
    `,
      )
      .join("")
  }

  if (cartTotal) {
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    cartTotal.textContent = total.toFixed(2)
  }
}

function showNotification(message) {
  const notification = document.createElement("div")
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--primary-color);
    color: white;
    padding: 1rem;
    border-radius: 0.5rem;
    z-index: 1001;
    animation: slideIn 0.3s ease;
  `
  notification.textContent = message
  document.body.appendChild(notification)

  setTimeout(() => {
    notification.remove()
  }, 3000)
}

// Simple form handling
function handleLogin(event) {
  event.preventDefault()
  const email = event.target.email.value
  alert("Login attempted for: " + email)
}

function handleContact(event) {
  event.preventDefault()
  const firstName = event.target.firstName.value
  alert("Thank you " + firstName + "! Your message has been sent.")
  event.target.reset()
}

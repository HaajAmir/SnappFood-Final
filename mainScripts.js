// with ChatGPT helps

// vriables(global)
let fetchedData = []
let cart = []
let nCard;
let nCardA = []
let buyList = document.getElementById("cart")
let inputSubmit = document.getElementById("submit")

// import modules
import { validateInputs } from "./validation.js"
import { showNotification } from "./notification.js"



// use json data
async function fetchData() {
    try {
        let response = await fetch("data.json", {
            method: "get"
        })
        let data = await response.json()

        data.forEach((item) => {
            fetchedData.push(item)
        })

        renderMenu()
        renderCart()

    } catch (error) {
        console.log(error)
    } finally {
        console.log("fetch data is over")
    }
}

fetchData()




// map part buy chatGPT

function renderMenu() {
    let productBox = document.getElementById("products")
    fetchedData.forEach((food, index) => {
        productBox.innerHTML += `
      <div class="card">
        <h3>${food.name}</h3>
        <ul class="ingredients">
          ${food.ingredients.map(x => `<li>${x}</li>`).join("")}
        </ul>
        <div class="price">${food.price} Tooman</div>
        <button class="buy-buttn" onclick="addToCart(${index})">Buy</button>
      </div>`
    })
}

function renderCart() {
    buyList.innerHTML = "Your buy list is empty"
    let total = cart.reduce((s, x) => s + x.price, 0)
    buyList.innerHTML = `
    <ul class="cart-items">
      ${cart.map((x, i) => `
        <li>${x.name} - ${x.price} Tooman
          <button class="remove-butn" onclick="removeItem(${i})">Cancel</button>
        </li>`).join("")}
    </ul>
    <div class="cart-total">Total: ${total} Tooman</div>
    <button class="checkout-btn" onclick="checkout()">Order</button>
  `
}

function addToCart(i) {
    cart.push(fetchedData[i])
    renderCart()
}

function removeItem(i) {
    cart.splice(i, 1);
    renderCart()
}

function checkout() {
    document.getElementById("show-time").innerText = "Order registered, Food is in your mouth in 20 mins"
    document.getElementById("show-time").style.border = "1px solid #dcdcdc"
    renderCart()
}



inputSubmit.addEventListener("click", function () {
    let name = document.getElementById("name").value
    let price = document.getElementById("price").value
    let ingredients = document.getElementById("ingredients").value

    if (!validateInputs(name, price, ingredients)) {
        showNotification("Please fill inputs")
        return
    }

    nCard = {
        foodName: name,
        foodPrice: parseInt(price),
        foodIngredients: ingredients.split(",")
    }

    nCardA.push(nCard)
    renderMenu2()
})


// add product by user
function renderMenu2() {
    let productBox = document.getElementById("products")
    productBox.innerHTML += `
    <div class="card">
      <h3>${nCard.foodName}</h3>
      <ul class="ingredients">
        ${nCard.foodIngredients.map(x => `<li>${x}</li>`).join("")}
      </ul>
      <div class="price">${nCard.foodPrice} Tooman</div>
      <button class="buy-buttn" onclick="addToCartNew(${nCardA.length - 1})">Buy</button>
    </div>`
}

function addToCartNew(index) {
    let newFood = nCardA[index]
    cart.push({
        name: newFood.foodName,
        ingredients: newFood.foodIngredients,
        price: newFood.foodPrice
    })
    renderCart()
}




window.addToCart = addToCart
window.removeItem = removeItem
window.checkout = checkout
window.addToCartNew = addToCartNew

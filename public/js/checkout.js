// import { commonNavBar, commonFooter } from "./common.mjs";

// commonNavBar();
// commonFooter();

let priceArray = JSON.parse(sessionStorage.getItem("priceArray")) || [];
const totalPrice = document.querySelector(".total-price");
const showCart = document.querySelector(".show-cart");

let total = 0;
priceArray.forEach(function (price) {
    let parsedPrice = parseFloat(price.price);
    let parsedTitle = price.title;
    if (!isNaN(parsedPrice)) {
        total += parsedPrice;
        showCart.innerHTML += `<tr class="product-row">
    <td class="product-title">${parsedTitle}</td>
    <td>
    <span><i class="bi bi-trash3 delete-btn" style="font-size:24px;color:Red"></i></span>
    </td>
    <td><div class="p_amnt">₹${parsedPrice}</div></td>
    </tr>`;
        const deleteButtons = document.querySelectorAll(".delete-btn");
        deleteButtons.forEach(function (button) {
            button.addEventListener("click", function () {
                //  get cartCount from local storage
                let cartCount = JSON.parse(sessionStorage.getItem("cartCount"));
                //  decrement cartCount
                cartCount -= 1;
                //  update cartCount in local storage
                sessionStorage.setItem("cartCount", JSON.stringify(cartCount));
                //  update cartCount in navbar
                const cartCountElement = document.querySelector(".cart-count");
                cartCountElement.textContent = cartCount;
                const productRow = this.closest(".product-row");
                const productTitle = productRow.querySelector(".product-title");
                const title = productTitle.textContent;
                const price = parseFloat(
                    productRow.querySelector(".p_amnt").textContent.replace("₹", "")
                );
                const product = {title, price};
                console.log(product);
                // Filter priceArray to remove the product with matching title and price
                priceArray = priceArray.filter(
                    (p) => !(p.title === title && p.price === price)
                );
                // update the price array in local storage
                sessionStorage.setItem("priceArray", JSON.stringify(priceArray));
                productRow.remove();
                total -= price;
                totalPrice.textContent = total;
            });
        });
    } else {
        console.log("did not add");
    }
});

totalPrice.textContent = total;


const checkoutBtn = document.getElementById("checkoutBtn");
checkoutBtn.addEventListener("click", (e) => {
    const userName = document.getElementById("firstName").value;
    const userEmail = document.getElementById("email").value;
    const userContact = document.getElementById("contact").value
    const userCountry = document.getElementById("country").value
    const userData = {name: userName, email: userEmail, phoneNumber: userContact, country: userCountry};
    sessionStorage.setItem("userCheckoutData", JSON.stringify(userData));
});

const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('recaptcha-failed') === 'true') {
    // Display an alert message
    alert('Please complete the reCAPTCHA to submit the form.');
}
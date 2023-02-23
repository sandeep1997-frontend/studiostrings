// import axios from "axios";

// let paypal = window.paypal_sdk;

let priceArray = JSON.parse(sessionStorage.getItem("priceArray")) || [];
const totalPrice = document.querySelector(".total-price");
const showCart = document.querySelector(".show-cart");
const userGetName = document.querySelector(".user-get-name");
const userCheckoutData = JSON.parse(sessionStorage.getItem("userCheckoutData"));
const jsonData = [
    {
        "title": "South Indian Premium Loops Pack",
        "price": 500
    },
    {
        "title": "North Indian Premium Loops Pack",
        "price": 500
    },
    {
        "title": "Melodic Instruments Loops Pack",
        "price": 500
    }
];

// Parse the JSON data
const data = JSON.parse(JSON.stringify(jsonData));

userGetName.innerText =
    userCheckoutData.name.charAt(0).toUpperCase() +
    userCheckoutData.name.slice(1);
let total = 0;
priceArray.forEach(function (price) {
    let parsedPrice = parseFloat(price.price);
    let parsedTitle = price.title;
    if (!isNaN(parsedPrice)) {
        const matchingDataItem = data.find(item => item.title === parsedTitle);
        if (matchingDataItem) {
            parsedPrice = matchingDataItem.price;
        }
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
// paypal
// paypal
//   .Buttons({
//     createOrder: function (data, actions) {
//       return actions.order.create({
//         purchase_units: [
//           {
//             amount: {
//               value: `${total}`,
//             },
//           },
//         ],
//       });
//     },
//     onApprove: function (data, actions) {
//       return actions.order.capture().then(function (details) {
//         const packDetails = JSON.parse(sessionStorage.getItem("priceArray"));
//         const titles = packDetails.map((item) => item.title);
//         // console.log(titles);
//         alert(
//           "Transaction completed by " + details.payer.name.given_name + "!"
//         );
//         //store those titles in local storage
//         localStorage.setItem("boughtItems", JSON.stringify(titles));
//         //redirect to the home page
//         window.location.href = "/transaction-success";
//         // clear session storage
//         const purchasedItems = JSON.parse(localStorage.getItem("boughtItems"));
//         const userCheckOutData = JSON.parse(sessionStorage.getItem("userCheckoutData"))
//         console.log(userCheckOutData)
//         console.log(purchasedItems);
//         fetch('http://localhost:8080/fcheckout', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({ boughtPacks: purchasedItems, userData: userCheckOutData })
//         })
//             .then(response => response.json())
//             .then(data => console.log('Success:', data))
//             .catch(error => console.error('Error:', error));
//         sessionStorage.clear();
//       });
//     },
//     onCancel: function (data, actions) {
//       // Your code for handling a cancelled transaction
//       alert("Transaction cancelled.");
//     }
//   })
//   .render("#paypal");

const payBtn = document.getElementById("pay")

payBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const userCheckOutData = JSON.parse(sessionStorage.getItem("userCheckoutData"))
    const totalCartPrice = totalPrice.textContent = total;
    const userCartPrice = JSON.parse(total)
    const packDetails = JSON.parse(sessionStorage.getItem("priceArray"));
    const titles = packDetails.map((item) => item.title);
    // console.log(titles);
    //store those titles in local storage
    localStorage.setItem("boughtItems", JSON.stringify(titles));
    const purchasedItems = JSON.parse(localStorage.getItem("boughtItems"));
    const response = await fetch('/create-checkout-session', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({boughtPacks: purchasedItems, userData: userCheckOutData, cartPrice: userCartPrice}),
    });

    // Parse the response to get the checkout session URL
    const {url} = await response.json();

    // Redirect the user to the checkout page
    window.location.href = url

    sessionStorage.clear();
})
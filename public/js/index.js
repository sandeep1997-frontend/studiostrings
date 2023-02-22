import { commonNavBar, commonFooter } from "./common.mjs";

commonNavBar();
commonFooter();

let cartCount = 0;

const buttons = document.querySelectorAll(".btn-cart");
buttons.forEach(function (button) {
  button.addEventListener("click", function () {
    cartCount++;
    // get the price and title of the product and store it in local storage
    const price = parseFloat(
        button.parentElement.parentElement
          .querySelector(".product-price")
          .textContent.replace("$", "")
      ),
      title =
        button.parentElement.parentElement.querySelector(
          ".product-title"
        ).textContent,
      product = {
        title: title,
        price: price,
      };
    const priceArray = JSON.parse(sessionStorage.getItem("priceArray")) || [];
    priceArray.push(product);
    sessionStorage.setItem("priceArray", JSON.stringify(priceArray));
    document.querySelector(".cart-count").textContent = cartCount;
    document.querySelector(".cart-count").style.display = "block";
    sessionStorage.setItem("cartCount", cartCount);
    const addToCartDiv =
      button.parentElement.parentElement.querySelector(".add-to-cart");
    addToCartDiv.style.display = "inline-block";
    setTimeout(function () {
      addToCartDiv.style.display = "none";
    }, 3000);
  });
  // button.setAttribute("disabled", "");
  // // add exact title also to addToCartDisabled
  // localStorage.setItem(
  //   `addToCartDisabled-${index}`,
  //   JSON.stringify({
  //     title: title,
  //     disabled: true,
  //   })
  // );
});

// content to 150chars
const cardTexts = document.querySelectorAll(".card-text");

cardTexts.forEach(function (cardText) {
  cardText.textContent = cardText.textContent.substr(0, 200) + "...";
});

window.addEventListener("load", function () {
  let cartCount = sessionStorage.getItem("cartCount");
  document.querySelector(".cart-count").textContent = cartCount;
  if (cartCount > 0) {
    document.querySelector(".cart-count").style.display = "block";
  } else {
    document.querySelector(".cart-count").style.display = "none";
  }
  // buttons.forEach(function (button, index) {
  //   const isDisabled = localStorage.getItem(`addToCartDisabled-${index}`);
  //  if (isDisabled) {
  //    const { title, disabled } = JSON.parse(isDisabled);
  //    if (
  //      title ===
  //        button.parentElement.parentElement.querySelector(".product-title")
  //          .textContent &&
  //      disabled
  //    ) {
  //      button.setAttribute("disabled", "");
  //    }
  //  }
  // });
});

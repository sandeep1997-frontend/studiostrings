// import {commonNavBar, commonFooter} from "./common.mjs";
//
// commonNavBar();
// commonFooter();

// const submitBtn = document.getElementById("submitBtn");
// submitBtn.addEventListener("click", (e) => {
//
//     const userName = document.getElementById("name").value;
//     const userEmail = document.getElementById("email").value;
//     const userMessage = document.getElementById("message").value;
//     const userData = {name: userName, email: userEmail, message: userMessage};
//     sessionStorage.setItem("userContactData", JSON.stringify(userData));
// });

const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('recaptcha-failed') === 'true') {
    // Display an alert message
    alert('Please complete the reCAPTCHA to submit the form.');
}

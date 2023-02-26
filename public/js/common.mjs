// navbar
const navbar = document.querySelector(".navbar");
function commonNavBar() {
  const container = document.createElement("div");
  container.classList.add("container-fluid");

  const brand = document.createElement("a");
  brand.classList.add("navbar-brand");
  brand.href = "/";
  brand.textContent = "Studio strings";

  const toggleButton = document.createElement("button");
  toggleButton.classList.add("navbar-toggler");
  toggleButton.type = "button";
  toggleButton.dataset.bsToggle = "collapse";
  toggleButton.dataset.bsTarget = "#navbarNavAltMarkup";
  toggleButton.setAttribute("aria-controls", "navbarNavAltMarkup");
  toggleButton.setAttribute("aria-expanded", "false");
  toggleButton.setAttribute("aria-label", "Toggle navigation");

  const toggleIcon = document.createElement("span");
  toggleIcon.classList.add("navbar-toggler-icon");

  toggleButton.appendChild(toggleIcon);

  const collapse = document.createElement("div");
  collapse.classList.add("collapse", "navbar-collapse");
  collapse.id = "navbarNavAltMarkup";

  const nav = document.createElement("div");
  nav.classList.add("navbar-nav");

  const home = document.createElement("a");
  home.classList.add("nav-link");
  home.href = "/";
  home.textContent = "Home";

  const packs = document.createElement("a");
  packs.classList.add("nav-link");
  packs.href = "/#myPacks";
  packs.textContent = "Packs";

  // const about = document.createElement("a");
  // about.classList.add("nav-link");
  // about.href = "#";
  // about.textContent = "About";

  const contact = document.createElement("a");
  contact.classList.add("nav-link");
  contact.href = "contact";
  contact.textContent = "Contact";

  const cart = document.createElement("a");
  cart.classList.add("nav-link", "cart-icon");
  cart.href = "checkout";

  const cartIcon = document.createElement("i");
  cartIcon.classList.add("bi", "bi-cart-fill");

  const cartCount = document.createElement("span");
  cartCount.classList.add("cart-count");
  cartCount.style.display = "none";
  // cartCount.textContent = "0";

  cart.appendChild(cartIcon);
  cart.appendChild(cartCount);

  nav.appendChild(home);
  nav.appendChild(packs);
  // nav.appendChild(about);
  nav.appendChild(contact);
  nav.appendChild(cart);

  collapse.appendChild(nav);

  container.appendChild(brand);
  container.appendChild(toggleButton);
  container.appendChild(collapse);

  navbar.appendChild(container);

  return container;
}

// footer
const footer = document.querySelector("footer");
function commonFooter() {
  const container = document.createElement("div");
  container.classList.add("container");

  const row = document.createElement("div");
  row.classList.add("row", "footer-row");

  const col1 = document.createElement("div");
  col1.classList.add("col-md-4");

  const col2 = document.createElement("div");
  col2.classList.add("col-md-4");

  const col3 = document.createElement("div");
  col3.classList.add("col-md-4");

  const brand = document.createElement("h5");
  brand.classList.add(
    "footer-subheading",
    "text-uppercase",
    "font-weight-bold"
  );
  brand.textContent = "Studio Strings";

  const brandDesc = document.createElement("p");
  brandDesc.textContent = "Elevating Your Music Production to New Heights";

  const services = document.createElement("h5");
  services.classList.add(
    "footer-subheading",
    "text-uppercase",
    "font-weight-bold"
  );
  services.textContent = "Services";

  const service1 = document.createElement("p");
  service1.textContent = "Music Production";

  const service2 = document.createElement("p");
  service2.textContent = "Mixing and Mastering";

  const service3 = document.createElement("p");
  service3.textContent = "VST Plugins Installation";

  const contact = document.createElement("h5");
  contact.classList.add(
    "footer-subheading",
    "text-uppercase",
    "font-weight-bold"
  );
  contact.textContent = "Contact";

  const contact1 = document.createElement("p");
  contact1.innerHTML = `<i class="bi bi-whatsapp"></i>+91 9398078395`;

  const contact2 = document.createElement("p");
  contact2.innerHTML = `<i class="bi bi-envelope"></i>studiostrings9948@gmail.com`;

  const copyRight = document.createElement("div");
  copyRight.classList.add("footer-copyright");
  const copyRightText = document.createElement("p");
  copyRightText.textContent = "© All Rights Reserved By Studiostrings";
  copyRightText.classList.add("text-center", "footer-copyright-text");
  copyRight.appendChild(copyRightText);

  const copyRightTermsSection = document.createElement("p");
  copyRightTermsSection.style.marginBottom = "0";
  copyRightTermsSection.style.fontSize = "smaller";
  copyRightTermsSection.style.textAlign = "center";
  copyRightTermsSection.style.display = "flex";
  copyRightTermsSection.style.justifyContent = "center";
  copyRightTermsSection.style.alignItems = "center";
  copyRightTermsSection.style.flexWrap = "wrap";
  copyRightTermsSection.style.gap = "0.5rem";

  const terms = document.createElement("a");
  terms.style.color = "white";
  terms.href = "/terms-and-conditions";
  terms.textContent = "Terms of Use";
  const returnPolicy = document.createElement("a");
  returnPolicy.style.color = "white";
  returnPolicy.href = "/returnpolicy";
  returnPolicy.textContent = "Return & Refund Policy";
  const privacyPolicy = document.createElement("a");
  privacyPolicy.style.color = "white";
  privacyPolicy.href = "/privacypolicy";
  privacyPolicy.textContent = "Privacy Policy";
  copyRightTermsSection.appendChild(terms);
  copyRightTermsSection.appendChild(returnPolicy);
  copyRightTermsSection.appendChild(privacyPolicy);
  copyRight.appendChild(copyRightTermsSection);
  col1.appendChild(brand);
  col1.appendChild(brandDesc);
  col2.appendChild(services);
  col2.appendChild(service1);
  col2.appendChild(service2);
  col2.appendChild(service3);
  col3.appendChild(contact);
  col3.appendChild(contact2);
  row.appendChild(col1);
  row.appendChild(col2);
  row.appendChild(col3);
  container.appendChild(row);
  container.appendChild(copyRight);
  footer.appendChild(container);
  return container;
}

export { commonNavBar, commonFooter };

// SignUp.js
import { UserManager } from "./UserManager.js";
import { FormValidator } from "./Validation.js";
import { StorageManager } from "./StorageManager.js";


//title and image 
const signImage = document.getElementById("sign_image")
const pageTitle = document.getElementById("page_title");


// Create a single validator instance
const validator = new FormValidator();

// Initialize default admin account
UserManager.initializeDefaultAdmin();

document.addEventListener("DOMContentLoaded", () => {
  // Initialize the validator when DOM is ready
  validator.init();



  const guestButton = document.querySelector(".btn-guest");
  // Add click handler for the guest button
  if (guestButton) {
    guestButton.addEventListener("click", () => {
      StorageManager.remove("currentUser");
      console.log("Continuing as guest");
      // Redirect to homepage
      window.location.href = "../index.html";
    });
  }

  //this is just for the store name
  const accountTypeRadios = document.querySelectorAll(
    'input[name="accountType"]'
  );
  const storeNameContainer =
    document.getElementById("storeNameContainer") || createStoreNameField();
  // added event listener to show store name field when seller is selected
  accountTypeRadios.forEach((radio) => {
    radio.addEventListener("change", function () {
      // Show store name field only if seller is selected
      if (this.value === "seller") {
        storeNameContainer.style.display = "block";
        pageTitle.innerText="Create a seller account"
        signImage.src = "../images/partener.png"
      } else {
        storeNameContainer.style.display = "none";
        pageTitle.innerText="Create an account"
        signImage.src = "../images/15.png"
      }
    });
  });

  const form = document.querySelector("form");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // These calls should now work because init() has completed
    validator.validateName({ target: document.getElementById("fullName") });
    validator.validateEmailField({ target: document.getElementById("email") });
    validator.validatePasswordField({
      target: document.getElementById("password"),
    });

    // Only proceed if all validations pass
    if (
      validator.isNameValid &&
      validator.isEmailValid &&
      validator.isPasswordValid
    ) {
      // const userData = {
      //   name: document.getElementById('fullName').value.trim(),
      //   email: document.getElementById('email').value.trim(),
      //   password: document.getElementById('password').value,
      //   role: document.querySelector('input[name="accountType"]:checked').value === 'seller' ? 'seller' : 'customer'};
      
      const isSeller =
        document.querySelector('input[name="accountType"]:checked').value ===
        "seller";

      // For sellers, also validate store name
      let isStoreNameValid = true;
      if (isSeller) {
        const storeNameInput = document.getElementById("storeName");
        if (!storeNameInput.value.trim()) {
          isStoreNameValid = false;
          // Show error for empty store name
          const errorElement =
            document.getElementById("storeNameError") ||
            createErrorElement("storeNameError", storeNameInput);
          errorElement.textContent = "Store name is required";
          errorElement.style.display = "block";
        } else {
          const errorElement = document.getElementById("storeNameError");
          if (errorElement) errorElement.style.display = "none";
        }
      }

      const userData = {
        name: document.getElementById("fullName").value.trim(),
        email: document.getElementById("email").value.trim(),
        password: document.getElementById("password").value,
        role: isSeller ? "seller" : "customer",
      };

      if (isSeller) {
        userData.store = document.getElementById("storeName").value.trim();
      }


      const result = UserManager.createUser(userData);

      if (result.success) {
        UserManager.loginUser(userData.email, userData.password);

        // Redirect
        if (userData.role === "seller") {
          window.location.href = "../Seller DashBoard/SellerDashboard.html";
        } else {
          window.location.href = "../index.html";
        }
      } else {
        alert(result.message || "Error creating account");
      }
    }
  });
});

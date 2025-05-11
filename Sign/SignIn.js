// SignIn.js
import { UserManager } from './UserManager.js';
import { StorageManager } from './StorageManager.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  const emailInput = document.getElementById('loginEmail');
  const passwordInput = document.getElementById('loginPassword');
  const errorElement = document.getElementById('loginError');
  const guestButton = document.getElementById('guestButton');
  
  // Helper function to validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Helper function to validate password
  const validatePassword = (password) => {
    return password.length >= 8;
  };

  // Helper function to show error message
  const showError = (message) => {
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.style.display = 'block';
    } else {
      alert(message);
    }
  };

  // Helper function to clear error message
  const clearError = () => {
    if (errorElement) {
      errorElement.style.display = 'none';
    }
  };

  //guest button 
  if (guestButton) {
    guestButton.addEventListener('click', () => {
      // Clear any existing user session -just removes the current user from storage
      StorageManager.remove("currentUser");
      console.log("Continuing as guest");
      window.location.href = '../index.html';
    });
  }

  if (form) {
    // Add input event listeners for real-time validation
    emailInput.addEventListener('input', () => {
      const email = emailInput.value.trim();
      if (!validateEmail(email)) {
        showError('Please enter a valid email address');
      } else {
        clearError();
      }
    });

    passwordInput.addEventListener('input', () => {
      const password = passwordInput.value;
      if (!validatePassword(password)) {
        showError('Password must be at least 8 characters long');
      } else {
        clearError();
      }
    });

    form.addEventListener('submit', function(event) {
      event.preventDefault();
      
      const email = emailInput.value.trim();
      const password = passwordInput.value;
      
      // Clear any previous errors
      clearError();
      
      // Validate email format
      if (!validateEmail(email)) {
        showError('Please enter a valid email address');
        return;
      }
      
      // Validate password
      if (!validatePassword(password)) {
        showError('Password must be at least 8 characters long');
        return;
      }
      
      // Attempt login
      const result = UserManager.loginUser(email, password);
      
      if (result.success) {
        // Redirect based on role
        const user = result.user;
        
        if (user.role === 'seller') {
          window.location.href = '../Seller DashBoard/SellerDashboard.html';
        } else if (user.role === 'customer') {
          window.location.href = '../index.html';
        } else if (user.role === 'admin') {
          window.location.href = '../AdminDashboard.html';
        }
      } else {
        // Show error message
        showError(result.message || 'Invalid email or password');
      }
    });
  }
});
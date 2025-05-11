// Initialize.js
import { UserManager } from './UserManager.js';
import { AccessControl } from './AccessControl.js';

// Wait for DOM content to be loaded before executing
document.addEventListener('DOMContentLoaded', () => {
  // Create default admin if it doesn't exist
  UserManager.initializeDefaultAdmin();
  
  // Check route access - wrapped in try/catch for safety
  try {
    AccessControl.restrictAccess();
  } catch (error) {
    console.error("Error restricting access:", error);
  }
});
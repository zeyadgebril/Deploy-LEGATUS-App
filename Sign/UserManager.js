// UserManager.js
import { StorageManager } from './StorageManager.js';

export class UserManager {
  // Initialize with default admin account
  static initializeDefaultAdmin() {
    const users = StorageManager.load("users") || [];
    
    // Check if admin already exists
    const adminExists = users.some(user => user.email === "admin@swamptime.com");
    
    if (!adminExists) {
      // Create default admin
      const adminUser = {
        id: 1,
        name: "Admin User",
        email: "admin@swamptime.com",
        password: "Admin123", 
        role: "admin"
      };
      
      users.push(adminUser);
      StorageManager.save("users", users);
      console.log("Default admin account created");
    }
  }
  
  // Create a new user (customer or seller)
  static createUser(userData) {
    const users = StorageManager.load("users") || [];
    
    // Check if user already exists
    const userExists = users.some(user => user.email === userData.email);
    
    if (userExists) {
      console.log("User already exists");
      return { success: false, message: "Email already registered" };
    }
    
    const newUser = {
      id: Date.now() + 1,
      name: userData.name,
      email: userData.email,
      password: userData.password,
      role: userData.role || "customer"
    };
    
    // Add store property if user is a seller i will add it to local storage 
    if (userData.role === "seller") {
      newUser.store = userData.store || "Default Store";
    }
    
    users.push(newUser);
    StorageManager.save("users", users);
    console.log("New user created:", newUser);
    
    return { success: true, user: newUser };
  }
  
  // Login user
  static loginUser(email, password) {
    const users = StorageManager.load("users") || [];
    
    const user = users.find(user => 
      user.email === email && user.password === password
    );
    
    if (user) {
      // Store current user in session
      StorageManager.save("currentUser", user);
      console.log("User logged in:", user);
      return { success: true, user: user };
    }
    
    return { success: false, message: "Invalid email or password" };
  }
  
  // Logout user
  static logoutUser() {
    StorageManager.remove("currentUser");
    console.log("User logged out");
    return { success: true };
  }
  
  // Get current user
  static getCurrentUser() {
    return StorageManager.load("currentUser");
  }
  
  // Get all users
  static getAllUsers() {
    return StorageManager.load("users") || [];
  }
}
import { StorageManager } from './StorageManager.js';

export class AccessControl {
  static restrictAccess() {
    try {
      const currentUser = StorageManager.load("currentUser");
      const currentPath = window.location.pathname;
      const currentHref = window.location.href;

      console.log("Current User:", currentUser);
      console.log("Current Path:", currentPath);
      console.log("Current URL:", currentHref);

      // Check if this is a dashboard URL - be more specific for customer dashboard
      const isCustomerDashboard =currentPath.includes("customer-dashboard.html");
      const isSellerDashboard =
        currentHref.includes("Seller") && currentHref.includes("Dashboard");
      const isAdminDashboard =
        currentHref.includes("Admin") && currentHref.includes("Dashboard");
      const isSellerManageAccount = currentPath.includes("SellerManageAccount.html");

      // If user is logged in and accessing the correct dashboard for their role, allow immediately
      if (currentUser) {
        const role = currentUser.role;

        // Special handling for customer dashboard (more specific checking)
        if (role === "customer" && isCustomerDashboard) {
          console.log("Customer accessing customer dashboard - access granted");
          return; // Allow access immediately
        }

        // Handle seller dashboard and seller manage account
        if (role === "seller" && (isSellerDashboard || isSellerManageAccount)) {
          console.log(`${role} accessing their dashboard or account management - access granted`);
          return; // Allow access immediately
        }

        // Handle admin dashboard
        if (role === "admin" && isAdminDashboard) {
          console.log(`${role} accessing their dashboard - access granted`);
          return; // Allow access immediately
        }

        // Prevent access to wrong dashboards
        if (role !== "customer" && isCustomerDashboard) {
          console.log("Non-customer trying to access customer dashboard");
          redirectToCorrectDashboard(role);
          return;
        }

        if (role !== "seller" && (isSellerDashboard || isSellerManageAccount)) {
          console.log("Non-seller trying to access seller dashboard or account management");
          redirectToCorrectDashboard(role);
          return;
        }

        if (role !== "admin" && isAdminDashboard) {
          console.log("Non-admin trying to access admin dashboard");
          redirectToCorrectDashboard(role);
          return;
        }
      } else {
        // Guests trying to access any dashboard
        if (isCustomerDashboard || isSellerDashboard || isAdminDashboard || isSellerManageAccount) {
          console.log(
            "Guest trying to access dashboard - redirecting to login"
          );
          redirectToSignIn();
          return;
        }
      }

      // Public pages accessible to everyone
      const publicPages = [
        "index.html",
        "productCatalog.html",
        "productDetails.html",
        "ContactUs.html",
        
      ];

      // Check if current page is public
      const isPublicPage = publicPages.some((page) =>
        currentHref.includes(page)
      );
      if (isPublicPage) {
        console.log("Accessing public page - access granted");
        return;
      }

      // Authentication pages - allow access only for guests
      const authPages = ["Sign.html", "SignUp.html"];
      const isAuthPage = authPages.some((page) => currentHref.includes(page));

      if (isAuthPage) {
        if (currentUser) {
          // Redirect logged-in users away from auth pages
          console.log(
            "Logged-in user trying to access auth page - redirecting to appropriate dashboard"
          );
          redirectToCorrectDashboard(currentUser.role);
          return;
        } else {
          // Allow guests to access auth pages
          console.log("Guest accessing auth page - access granted");
          return;
        }
      }

      // Shopping pages - accessible to customers and guests - will add it for checkout only now
      const shoppingPages = ["Cart.html", "checkout.html"];
      const isShoppingPage = shoppingPages.some((page) =>
        currentHref.includes(page)
      );

      if (isShoppingPage) {
        if (!currentUser) {
          // Redirect guests to sign in if they try to access checkout
          console.log(
            "Guest trying to access shopping page - redirecting to sign in"
          );
          redirectToSignIn();
          return;
        } else if (
          currentUser.role === "seller" ||
          currentUser.role === "admin"
        ) {
          // Redirect sellers/admins away from shopping pages
          console.log(
            `${currentUser.role} trying to access shopping page - redirecting`
          );
          redirectToCorrectDashboard(currentUser.role);
          return;
        } else {
          // Allow customers to access shopping pages
          console.log("Customer accessing shopping page - access granted");
          return;
        }
      }

      // If we get here, default to redirecting to appropriate location
      if (currentUser) {
        console.log(
          "Redirecting to appropriate dashboard for role:",
          currentUser.role
        );
        redirectToCorrectDashboard(currentUser.role);
      } else {
        console.log("Guest accessing restricted page - redirecting to sign in");
        redirectToSignIn();
      }

      // Helper functions
      function redirectToCorrectDashboard(role) {
        switch (role) {
          case "customer":
            window.location.href =
              "../Customer Dashboard/customer-dashboard.html";
            break;
          case "seller":
            window.location.href = "../Seller DashBoard/SellerDashboard.html";
            break;
          case "admin":
            window.location.href = "../AdminDashboard.html";
            break;
          default:
            window.location.href = "../index.html";
        }
      }

      function redirectToSignIn() {
        // Determine the correct path to Sign.html based on current location
        const signPath = currentPath.includes("/Sign/")
          ? "Sign.html"
          : "../Sign/Sign.html";
        window.location.href = signPath;
      }
    } catch (error) {
      console.error("Access control error:", error);
    }
  }
}

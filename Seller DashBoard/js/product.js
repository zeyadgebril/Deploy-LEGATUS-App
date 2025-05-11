export class LocalStorageManager {
  constructor() {
    this.initializeProducts();
  }

  initializeProducts() {
    if (!this.getProducts()) {
      this.setProducts([]);
    }
  }

  getProducts() {
    return JSON.parse(localStorage.getItem("products")) || [];
  }
  
  getUserAuthentication() {
    return JSON.parse(localStorage.getItem("users")) || [];
  }
  
  getCurrentUser() {
    return JSON.parse(localStorage.getItem("currentUser")) || {};
  }

 
  getOrders() {
    return JSON.parse(localStorage.getItem('Orders')) || [];
  }
  
  getSellerOrders(sellerId) {
    const orders = this.getOrders(); // This now uses the correct key
    return orders.filter(order => order.sellerId === sellerId);
  }

  createOrder(orderData) {
    const orders = this.getOrders();
    orders.push(orderData);
    localStorage.setItem("Orders", JSON.stringify(orders));
    return orderData;
  }

  setProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
  }

  ClearCurrentUser() {
    localStorage.setItem("currentUser", "");
  }
  
  addProduct(productData) {
    const products = this.getProducts();
    products.push(productData);
    this.setProducts(products);
  }

  updateProduct(updatedProduct) {
    const products = this.getProducts();
    const index = products.findIndex((p) => p.id === updatedProduct.id);

    if (index !== -1) {
      products[index] = updatedProduct;
      this.setProducts(products);
    }
  }

  deleteProduct(productId) {
    const products = this.getProducts();
    const filteredProducts = products.filter((p) => p.id !== productId);
    this.setProducts(filteredProducts);
  }

  getSellerProducts(sellerId) {
    const products = this.getProducts();
    return products.filter((p) => p.sellerId === sellerId);
  }

  saveOrders(orders) {
    localStorage.setItem('Orders', JSON.stringify(orders));
  }

  restockProduct(productId, additionalQuantity) {
    const products = this.getProducts();
    const productIndex = products.findIndex(p => p.id === productId);
    
    if (productIndex !== -1) {
      products[productIndex].stock += additionalQuantity;
      this.setProducts(products);
      return true;
    }
    return false;
  }


  checkStock(productId, requestedQuantity) {
    const products = this.getProducts();
    const product = products.find(p => p.id === productId);
    return product && product.stock >= requestedQuantity;
}

decreaseStock(productId, quantity) {
    const products = this.getProducts();
    const productIndex = products.findIndex(p => p.id === productId);
    
    if (productIndex !== -1) {
        products[productIndex].stock -= quantity;
        this.setProducts(products);
        return true;
    }
    return false;
}

increaseStock(productId, quantity) {
    const products = this.getProducts();
    const productIndex = products.findIndex(p => p.id === productId);
    
    if (productIndex !== -1) {
        products[productIndex].stock += quantity;
        this.setProducts(products);
        return true;
    }
    return false;
}


updateStockFromOrder(order) {
  const products = this.getProducts();
  let productsUpdated = false;
  
  order.products.forEach(orderProduct => {
      const productIndex = products.findIndex(p => p.id === orderProduct.product.id);
      if (productIndex !== -1) {
          const currentStock = Number(products[productIndex].stock) || 0;
          const orderedQuantity = Number(orderProduct.quantity_in_cart) || 0;
          
          products[productIndex].stock = Math.max(0, currentStock - orderedQuantity);
          productsUpdated = true;
      }
  });
  
  if (productsUpdated) {
      this.setProducts(products);
  }
}
deductOrderedQuantities(order) {
  const products = this.getProducts();
  let stockAdjusted = false;
  
  // Validate order structure
  if (!order || !order.products || !Array.isArray(order.products)) {
      console.error("Invalid order structure");
      return false;
  }

  order.products.forEach(item => {
      // Skip if product or quantity is missing
      if (!item.product || !item.product.id || item.quantity_in_cart === undefined) {
          console.warn("Skipping invalid order item:", item);
          return;
      }

      const productId = item.product.id;
      const product = products.find(p => p.id === productId);
      
      // Skip if product not found or stock is null/undefined
      if (!product || product.stock == null) {
          console.warn(`Skipping product ${productId} - stock not managed`);
          return;
      }

      // Convert to numbers safely
      const currentStock = Number(product.stock) || 0;
      const orderedQty = Number(item.quantity_in_cart) || 0;
      
      // Validate stock availability
      if (orderedQty <= 0) {
          console.warn(`Invalid quantity for ${productId}:`, orderedQty);
          return;
      }

      if (currentStock < orderedQty) {
          console.error(`Insufficient stock for ${productId} (${currentStock} < ${orderedQty})`);
          return;
      }

      // Update stock
      product.stock = currentStock - orderedQty;
      stockAdjusted = true;
      console.log(`Adjusted stock for ${productId}: ${currentStock} → ${product.stock}`);
  });

  if (stockAdjusted) {
      this.setProducts(products);
  }
  
  return stockAdjusted;
}
}



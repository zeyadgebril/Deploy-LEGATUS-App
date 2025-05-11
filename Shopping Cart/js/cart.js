export class LocalStorageManager {
  constructor() {
    this.initializeProducts();
  }

  initializeProducts() {
    if (!localStorage.getItem('Cart')) {
      localStorage.setItem('Cart', JSON.stringify([]));
    }
  }

  getProducts() {
    return JSON.parse(localStorage.getItem('Cart')) || [];
  }

  setProducts(products) {
    localStorage.setItem('Cart', JSON.stringify(products));
  }

  updateProductQuantity(productId, newQuantity) {
    const products = this.getProducts();
    const productIndex = products.findIndex(item => item.product.id === productId);
    
    if (productIndex !== -1) {
      products[productIndex].product.quantity_in_cart = newQuantity;
      this.setProducts(products);
      return true;
    }
    return false;
  }

  getUserAuthentication() {
    return JSON.parse(localStorage.getItem('UserAuthentication')) || [];
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser')) || null;
  }

  setProductToCheckCart(checkoutData){
    localStorage.setItem("checkout", JSON.stringify(checkoutData));
  }
}

export class CartRenderer {
  constructor(storageManager) {
    this.storageManager = storageManager;
    this.cartTableBody = document.getElementById('cart-table-body');
    this.cartMobileList = document.getElementById('cart-mobile-list');
    this.cartData = this.storageManager.getProducts();
  }

  renderCartItems() {
      this.cartTableBody.innerHTML = '';
      this.cartMobileList.innerHTML = '';
      
      const currentUser = this.storageManager.getCurrentUser();
      const allProducts = this.storageManager.getProducts();
    
      // Filter products that belong to current user
      const userProducts = allProducts.filter(item => {
        return item.userId === currentUser?.id;
      });
  
      userProducts.forEach((item, index) => {
        this.renderDesktopItem(item, index);
        this.renderMobileItem(item, index);
      });
    
      this.initializeQuantityControls();
      this.initializeDeleteButtons();
      this.updateCartTotals();
    }

  renderDesktopItem(item, index) {

    const product = item.product;
    const priceValue = parseFloat(product.price.split(' ')[0]);
    const quantity = product.quantity_in_cart;
    const total = (priceValue * quantity).toFixed(2);

    const row = document.createElement('tr');
    row.className = 'cart-item';
    row.dataset.index = index;

    row.innerHTML = `
      <td class="d-flex align-items-center">
        <img
          src="${product.image}"
          alt="${product.name}"
          class="img-fluid me-3"
          style="max-width: 60px"
          product-name="${product.name}"
          product-id="${product.id}"
          product-image="${product.image}"
          product-price="${product.price}"
          product-quantity-in-cart="${product.quantity_in_cart}"
          product-max-quantity="${product.max_quantity}"
        />
        <div>
          <p class="product-name mb-1 fw-bold">${product.name}</p>
          <p class="product-id mb-1 small text-muted">ID: ${product.id}</p>
        </div>
      </td>
      <td class="product-price text-center">${product.price}</td>
      <td class="text-center">
        <div class="d-flex justify-content-center quantity-controls">
          <button class="btn btn-sm quantity-minus">
            <i class="fas fa-minus"></i>
          </button>
          <span class="mx-2 quantity-value fw-bold">${product.quantity_in_cart}</span>
          <button class="btn btn-sm quantity-plus">
            <i class="fas fa-plus"></i>
          </button>
        </div>
      </td>
      <td class="product-total text-center fw-bold">${total} $</td>
      <td class="text-center">
        <button class="btn btn-sm btn-danger delete-item" data-index="${index}">
          <i class="fa-solid fa-xmark"></i>               
        </button>
      </td>
    `;

    this.cartTableBody.appendChild(row);
  }

  renderMobileItem(item, index) {
    const product = item.product;
    const priceValue = parseFloat(product.price.split(' ')[0]);
    const quantity = product.quantity_in_cart;
    const total = (priceValue * quantity).toFixed(2);

    const card = document.createElement('div');
    card.className = 'card mb-3 cart-item';
    card.dataset.index = index;

    card.innerHTML = `
      <div class="card-body">
        <div class="row">
          <div class="col-4">
            <img
              src="${product.image}"
              alt="${product.name}"
              class="product-img-mobile img-fluid"
              product-name="${product.name}"
              product-id="${product.id}"
              product-image="${product.image}"
              product-price="${product.price}"
              product-quantity-in-cart="${product.quantity_in_cart}"
              product-max-quantity="${product.max_quantity}"
            />
          </div>
          <div class="col-8">
            <div class="d-flex justify-content-between">
              <div>
                <p class="product-name mb-1 fw-bold">${product.name}</p>
                <p class="product-id mb-1 small text-muted">ID: ${product.id}</p>
              </div>
              <button class="btn btn-sm btn-danger delete-item align-self-start" data-index="${index}">
                <i class="fa-solid fa-xmark"></i>       
              </button>
            </div>

            <div class="d-flex justify-content-between align-items-center">
              <div class="d-flex align-items-center quantity-controls">
                <button class="btn btn-sm quantity-minus">
                  <i class="fas fa-minus"></i>
                </button>
                <span class="mx-2 quantity-value fw-bold">${product.quantity_in_cart}</span>
                <button class="btn btn-sm quantity-plus">
                  <i class="fas fa-plus"></i>
                </button>
              </div>
              <span class="product-price fw-bold">${product.price}</span>
            </div>

            <div class="d-flex justify-content-between align-items-center mt-2">
              <span class="text-muted">Total:</span>
              <span class="product-total fw-bold">${total} $</span>
            </div>
          </div>
        </div>
      </div>
    `;

    this.cartMobileList.appendChild(card);
  }

  initializeQuantityControls() {
    document.querySelectorAll('.cart-item').forEach((item) => {
      const productId = item.querySelector('img[product-image]').getAttribute('product-id');
      
      // Get the current product data from storage
      const products = this.storageManager.getProducts();
      const productData = products.find(p => p.product.id === productId);
      
      if (!productData) return;
  
      const product = {
        id: productId,
        price: parseFloat(productData.product.price.split(' ')[0]),
        quantity: productData.product.quantity_in_cart,
        maxQuantity: productData.product.max_quantity,
        element: item
      };
  
      const quantityDisplays = item.querySelectorAll('.quantity-value');
      const minusBtns = item.querySelectorAll('.quantity-minus');
      const plusBtns = item.querySelectorAll('.quantity-plus');
  
      quantityDisplays.forEach((display) => (display.textContent = product.quantity));
  
      minusBtns.forEach((btn) => {
        btn.addEventListener('click', () => this.handleMinusClick(btn, product));
      });
  
      plusBtns.forEach((btn) => {
        btn.addEventListener('click', () => this.handlePlusClick(btn, product));
      });
    });
  }
  
  handlePlusClick(btn, product) {
    const display = btn.closest('.quantity-controls').querySelector('.quantity-value');
    let currentQty = parseInt(display.textContent);
    
    // Get fresh data from storage to ensure we have the latest quantity
    const products = this.storageManager.getProducts();
    const productData = products.find(p => p.product.id === product.id);
    
    if (!productData) return;
    
    if (currentQty < productData.product.max_quantity) {
      currentQty++;
      display.textContent = currentQty;
      
      // Update the product data in storage
      productData.product.quantity_in_cart = currentQty;
      this.storageManager.setProducts(products);
      
      // Update the UI
      const price = parseFloat(productData.product.price.split(' ')[0]);
      const total = (price * currentQty).toFixed(2);
      product.element.querySelectorAll('.product-total').forEach(el => el.textContent = `${total} $`);
      
      this.updateCartTotals();
      
      if (currentQty === productData.product.max_quantity) {
        this.showMaxQuantityWarning();
      }
    }
  }
  
  handleMinusClick(btn, product) {
    const display = btn.closest('.quantity-controls').querySelector('.quantity-value');
    let currentQty = parseInt(display.textContent);
    
    // Get fresh data from storage
    const products = this.storageManager.getProducts();
    const productData = products.find(p => p.product.id === product.id);
    
    if (!productData) return;
    
    if (currentQty > 1) {
      currentQty--;
      display.textContent = currentQty;
      
      // Update the product data in storage
      productData.product.quantity_in_cart = currentQty;
      this.storageManager.setProducts(products);
      
      // Update the UI
      const price = parseFloat(productData.product.price.split(' ')[0]);
      const total = (price * currentQty).toFixed(2);
      product.element.querySelectorAll('.product-total').forEach(el => el.textContent = `${total} $`);
      
      this.updateCartTotals();
    }
  }

  showMaxQuantityWarning() {
    document.querySelector('.warning-max').innerHTML = `
      <div class="container mt-3">
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
          <strong>Warning</strong> You reached the maximum quantity.
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      </div>`;
  }

  initializeDeleteButtons() {
    document.querySelectorAll('.delete-item').forEach((btn) => {
      btn.addEventListener('click', () => {
        const index = parseInt(btn.dataset.index);
        this.cartData.splice(index, 1);
        this.storageManager.setProducts(this.cartData);
        this.renderCartItems();
      });
    });
  }

  updateItemTotal(item, total) {
    const totalDisplay = `${total.toFixed(2)} $`;
    item.querySelectorAll('.product-total').forEach((el) => (el.textContent = totalDisplay));
  }

  updateCartTotals() {
    const currentUser = this.storageManager.getCurrentUser();
    const allProducts = this.storageManager.getProducts();
    
    // Filter products for current user
    const userProducts = allProducts.filter(item => item.userId === currentUser?.id);
    
    let subtotal = 0;
    userProducts.forEach(item => {
      const price = parseFloat(item.product.price.split(' ')[0]);
      const quantity = item.product.quantity_in_cart;
      subtotal += price * quantity;
    });
  
    const grandTotal = subtotal;
  
    document.querySelector('.subtotal-amount').textContent = `${subtotal.toFixed(2)} $`;
    document.querySelector('.grand-total-amount').textContent = `${grandTotal.toFixed(2)} $`;
  }
}
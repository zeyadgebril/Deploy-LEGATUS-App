window.addEventListener('load',()=>{
let container = document.getElementById("card_container");
async function products(){
    let allProducts = await fetch('./products.json')
    
    let productsjson = await allProducts.json();
    let htmlCards ="";

    productsjson.slice(0, 8).forEach(data => {
        htmlCards += `<div class="col-md-3 col-sm-6">
          <div class="product-card h-100 text-center">
            <img src="${data.image}" alt="Panerai" class="img-fluid product-img">
            <div class="product-info">
              <h6 class="product-title">${data.name}</h6>
              <p class="product-price">EGP ${data.price}</p>
            </div>
          </div>
        </div>`;
      });
      
      container.innerHTML = htmlCards;
    }

    let containerproduct = document.getElementById("card_product");
async function cardproducts(){
    let Product = await fetch('./products.json')
    
    let productsjson = await Product.json();
    let htmlCards ="";

    productsjson.slice(0, 6).forEach(data => {
        htmlCards += `<div class="col-md-4">
          <div class="product-card h-100 d-flex flex-column">
            <img src="${data.image}" alt="Blancpain Watch" class="img-fluid product-img">
            <div class="product-info d-flex flex-column justify-content-center flex-grow-1">
              <h5 class="product-title text-center">${data.name}</h5>
              <p class="product-price  text-center">EGP ${data.price}</p>

            </div>
          </div>
        </div>`;
      });
      
      containerproduct.innerHTML = htmlCards;
    }
    
products();
cardproducts(); 
})//end of load
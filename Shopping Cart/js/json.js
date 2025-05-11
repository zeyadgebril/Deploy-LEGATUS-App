let myJson = [
    {
    "userId": "1",
    "product": {
      "name": "Smart Watch",
      "id": "#12345",
      "image": "./img/watch1.png",
      "price": "10.90 $",
      "quantity_in_cart": 2,
      "max_quantity": 5
    }
  }
  ,{
    "userId": "1",
    "product": {
      "name": "Clasic Watch",
      "id": "#67890",
      "image": "./img/watch2.png",
      "price": "18.90 $",
      "quantity_in_cart": 1,
      "max_quantity": 4
    }
  }
  ,{
    "userId": "2",
    "product": {
      "name": "modern  Watch",
      "id": "#4589",
      "image": "./img/watch2.png",
      "price": "10.90 $",
      "quantity_in_cart": 2,
      "max_quantity": 5
    }
  }
]

// JSON.stringify(myJson);
localStorage.setItem("Cart", JSON.stringify(myJson));

// JSON.parse(localStorage.getItem("Cart"));
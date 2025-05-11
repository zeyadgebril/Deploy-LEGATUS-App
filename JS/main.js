import { Product } from "./product.js";
import { initDB,saveData,load } from "./storage.js";

let product = new Product();
product.ID
product.Name="Analog Watch International";
product.Image = "watches images/Analog watch International Watch.png";
product.Brand = "International";
product.Price = 120;
product.Stock = 45
product.Gender = ["men", "women"];
product.Description = "Classic analog watch with minimalist design, perfect for everyday wear. Features a stainless steel case and Japanese quartz movement."
product.SelerId = 2;



initDB();
saveData('products',product);
let productsss  = load('products')

console.log(productsss)

export class Product{
    #id;
    static #lastId =0;
    #sellerId
    #name;
    #image;
    #brand;
    #price;
    #stock;
    #gender;
    #description;

    //constructor
   
    set ID(_id){
        this.#id =`prod_${++Product.#lastId}`// Auto-generate id
    }
    set SelerId(_sellerId){
        this.#sellerId = super.SelelrId;
    }
    set Name(_name){
        if (typeof _name !== 'string' || _name.trim().length < 2) {
            throw new Error('Product name must be at least 2 characters');
          }
          this.#name = _name.trim();
        
    }
    set Image(_image){
        this.#image =_image
    }

    set Brand(_brand){
        if (typeof _brand !== 'string' || _brand.trim().length < 2) {
            throw new Error('Product brand must be at least 2 characters');
          }
          this.#brand = _brand.trim();
    }
    set Price(_price){
        if (typeof _price !== 'number' || _price <= 0) {
            throw new Error('Price must be a positive number');
          }
          this.#price = parseFloat(_price.toFixed(2));
    }
    set Stock(_stock){
        if (!Number.isInteger(_stock)) {
            throw new Error('Stock must be an integer');
          }
          this.#stock = Math.max(0, _stock);
    }
    set Gender(_gender){
        this.#gender =_gender
    }
    set Description(_description){
        this.#description =_description
    }

    get ID() {
         return this.#id; 
        }
    get SellerId() {
         return this.#sellerId; 
        }
    get Name() {
         return this.#name; 
        }
    get Image() {
         return this.#image; 
        }
    get Brand() {
         return this.#brand; 
        }
    get Price() {
         return this.#price; 
        }
    get Stock() {
         return this.#stock; 
        }
    get Gender() {
         return this.#gender; 
        }
    get Description() {
         return this.#description; 
        }
// 3. LOCALSTORAGE SUPPORT
  // ======================
  toJSON() {
    return{
      id: this.#id,
      sellerId: this.#sellerId,
      name: this.#name,
      image: this.#image,
      price: this.#price,
      stock: this.#stock,
      gender: this.#gender,
      description: this.#description

    };
  }

  static fromJSON(data) {
    const product = new Product();
    product.#id = data.id;
    product.#sellerId = data.sellerId;
    product.#name = data.name;
    product.#image = data.image;
    product.#brand = data.brand;
    product.#price = data.price;
    product.#stock = data.stock;
    product.#gender = data.gender;
    product.#description = data.description;
    
    return product;
  }
}


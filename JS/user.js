export class User{
    #id;
    #userName;
    #userEmail;
    #userPassword;
    #role;

    //Setters

    set ID(_id){
        this.#id = _id;
    }
    set Name(_name){
        if(_name.trim().length>=3)
        this.#userName = _name;
    }
    set Email(_email){
        this.#userEmail = _email;
    }
    
    set Password(_password){
        
        this.#userPassword = _password;
    }
    set Role(_role){
        this.#role = _roler;
    }
    //Getters
    get ID(){
        return this.#id;
    }
    get Name(){
        return this.#userName;
    }
    get Email(){
        return this.#userEmail;
    }
    
    get Password(){
        return this.#userPassword;
    }
    get Role(){
        return this.#role;
    }

//localStorage only stores public data SO 


//  to storage private fields (its like storing(private data) into a box (public format) for delivery)
toJSON() {
    return {
      id: this.#id,
      name: this.#userName,
      email: this.#userEmail,
      password: this.#userPassword, //  
      role: this.#role
    };
  }

  // to get private fields from locak storage (Only the recipient (User class) can unpack the box back into gifts)
  static fromJSON(data) {
    const user = new User();
    user.#id = data.id;
    user.#userName = data.name;
    user.#userEmail = data.email;
    user.#userPassword = data.password;
    user.#role = data.role;
    return user;
  }

}
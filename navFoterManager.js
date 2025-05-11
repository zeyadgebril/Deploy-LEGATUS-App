import { StorageManager } from "./Sign/StorageManager.js"


const userData = StorageManager.load("currentUser") || [];
const users = userData ? (Array.isArray(userData) ? userData : [userData]) : [];

console.log(users);
class SpecialNav extends HTMLElement{
  
connectedCallback(){

  const currentPath = window.location.pathname;
  const depth = currentPath.split('/').filter(segment => segment && !segment.includes('.html')).length;
  // 2. Set the correct path prefix (./ or ../)
  const prefix = depth > 0 ? '../'.repeat(depth) : '/';
  console.log(currentPath)
  // IN HOME PAGE 
  


  //in case current user Empty (LOGED OUT) 
  if(users.length === 0){
    if(currentPath ==='/index.html'){
      this.innerHTML=`
      
      <nav class="navbar  navbar-expand-lg  ">
     <div class="container-fluid d-flex px-4 ">
       <a class="navbar-brand  fw-bolder m-0" href="${prefix}index.html">LEGATUS
         <a> <div class=" d-flex d-lg-none align-items-center gap-4">
              <a  href="${prefix}Sign/Sign.html"> <button type="button" class="btn text-white" style="background-color: #3d5a8a; border: 1px solid white;">Login</button></a>
              <a  href="${prefix}Sign/SignUp.html"> <button type="button" class="btn " style="background-color: #ffffff;color: #002f5f; border: 1px solid #184a79;">Sign up</button> </a>
        </div></a></a>

           <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
             <i class="fa-solid fa-bars text-light fs-1"></i>
           </button>
           <div class="collapse navbar-collapse gap-2" id="navbarSupportedContent">
             <ul class="navbar-nav mx-auto fs-6 mb-2 gap-4  mb-lg-0">
               <li class="nav-item">
                 <a class="nav-link active" aria-current="page" href="${prefix}index.html">Home</a>
               </li>
               <li class="nav-item">
                 <a class="nav-link" href="${prefix}productCatalog.html">Shop</a>
               </li> 
               <li class="nav-item">
                 <a class="nav-link" href="${prefix}ContactUs.html">Contact Us</a>
               </li>
             </ul>
        
         </div>
         <div class="d-none d-lg-flex align-items-center gap-3">
        <a  href="${prefix}Sign/Sign.html"> <button type="button" class="btn text-white" style="background-color: #184a79; border: 1px solid white;">Login</button></a>
        <a  href="${prefix}Sign/SignUp.html"> <button type="button" class="btn " style="background-color: #ffffff;color: #002f5f; border: 1px solid #184a79;">Sign up</button> </a>
       </div>
       </div>   
     </nav>
     `
    }else{
    this.innerHTML=`
    
    <nav class="navbar navbar-expand-lg  ">
     <div class="container-fluid d-flex px-4 gap-3">
       <a class="navbar-brand  fw-bolder m-0" href="${prefix}index.html">LEGATUS
         <a> <div class=" d-flex d-lg-none align-items-center gap-3">
              <a  href="${prefix}Sign/Sign.html"> <button type="button" class="btn text-white" style="background-color: #3d5a8a; border: 1px solid white;">Login</button></a>
              <a  href="${prefix}Sign/SignUp.html"> <button type="button" class="btn " style="background-color: #ffffff;color: #002f5f; border: 1px solid #184a79;">Sign up</button> </a>
  
              
         </div></a></a>
         <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
           <i class="fa-solid fa-bars text-light fs-1"></i>
         </button>
         <div class="collapse navbar-collapse gap-2" id="navbarSupportedContent">
           <ul class="navbar-nav me-auto fs-6 mb-2 gap-4  mb-lg-0">
             <li class="nav-item">
               <a class="nav-link active" aria-current="page" href="${prefix}index.html">Home</a>
             </li>
             <li class="nav-item">
               <a class="nav-link" href="${prefix}productCatalog.html">Shop</a>
             </li> 
             <li class="nav-item">
               <a class="nav-link" href="${prefix}ContactUs.html">Contact Us</a>
             </li>
           </ul>
           <form class="d-flex align-items-center rounded  bg-white flex-grow-1" role="search">
             <input id="search_input" class="form-control  border-0 me-2" type="search" placeholder="Search" aria-label="Search">
             <i class="fa-solid search_icon fs-5 me-2 fa-magnifying-glass"></i>
           </form>
       </div>
       <div class="d-none d-lg-flex align-items-center gap-3">
        <a  href="${prefix}Sign/Sign.html"> <button type="button" class="btn text-white" style="background-color: #184a79; border: 1px solid white;">Login</button></a>
        <a  href="${prefix}Sign/SignUp.html"> <button type="button" class="btn " style="background-color: #ffffff;color: #002f5f; border: 1px solid #184a79;">Sign up</button> </a>
       </div>
     </div>   
   </nav>
   `
    }
  }

  users.forEach(data=>{
    console.log(data.role);
    if(data.role === 'customer'){
      if(currentPath ==='/index.html' || currentPath === '/Customer%20Dashboard/customer-dashboard.html'
        || currentPath === '/ContactUs.html' || currentPath === '/Shopping%20Cart/Cart.html' || currentPath == '/SellerManageAccount.html'){
        this.innerHTML=`
        
        <nav class="navbar navbar-expand-lg px-2 ">
         <div class="container-fluid d-flex px-4  ">
           <a class="navbar-brand  fw-bolder m-0" href="${prefix}index.html">LEGATUS
             <a> <div class="dropdown position-relative d-flex d-lg-none align-items-center gap-3">
               <!-- Shopping Bag Icon -->
               <a href="${prefix}Shopping Cart/Cart.html" class="fa-solid text-white  fa-bag-shopping fs-4 me-2"></a>
             
               <!-- User Icon with Dropdown Toggle -->
               <a class="nav-link dropdown p-2" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                 <i class="fa-solid fa-user fs-4"></i>
               </a>
             
               <!-- Dropdown Menu -->
               <ul class="dropdown-menu dropdown-menu-end">
                 <li><span class="dropdown-header">${data.role}</span></li>
                 <li><h1 class="dropdown-item-text h1 fs-6">${data.name}</h1></li>
                 <li><a class="dropdown-item" href="${prefix}Customer Dashboard/customer-dashboard.html">My Account</a></li>
                 <li><hr class="dropdown-divider"></li>
                 <li><a class="dropdown-item logout_option" href="${prefix}Sign/Sign.html">Logout</a></li>
               </ul>
             </div></a></a>
             <button class="navbar-toggler border-0 ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
               <i class="fa-solid fa-bars text-light fs-1"></i>
             </button>
             <div class="collapse navbar-collapse gap-2" id="navbarSupportedContent">
               <ul class="navbar-nav mx-auto fs-6 mb-2 gap-4  mb-lg-0">
                 <li class="nav-item">
                   <a class="nav-link active" aria-current="page" href="${prefix}index.html">Home</a>
                 </li>
                 <li class="nav-item">
                   <a class="nav-link" href="${prefix}productCatalog.html">Shop</a>
                 </li> 
                 <li class="nav-item">
                   <a class="nav-link" href="${prefix}ContactUs.html">Contact Us</a>
                 </li>
               </ul>
          
           </div>
           <div class="dropdown position-relative d-none d-lg-flex align-items-center  gap-3">
             <!-- Shopping Bag Icon -->
             <a href="${prefix}Shopping Cart/Cart.html" class="fa-solid text-white  fa-bag-shopping fs-4 me-2"></a>
           
             <!-- User Icon with Dropdown Toggle -->
             <a class="nav-link dropdown p-2" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
               <i class="fa-solid fa-user fs-4"></i>
             </a>
           
             <!-- Dropdown Menu -->
             <ul class="dropdown-menu dropdown-menu-end">
              <li><span class="dropdown-header">${data.role}</span></li>
                 <li><h1 class="dropdown-item-text h1 fs-6">${data.name}</h1></li>
                 <li><a class="dropdown-item" href="${prefix}Customer Dashboard/customer-dashboard.html">My Account</a></li>
                 <li><hr class="dropdown-divider"></li>
                 <li><a class="dropdown-item logout_option" href="">Logout</a></li>
             </ul>
           </div>
         </div>   
       </nav>
       `
      }else{
        this.innerHTML=`
    
        <nav class="navbar navbar-expand-lg px-2 ">
         <div class="container-fluid d-flex px-4 gap-4">
           <a class="navbar-brand  fw-bolder m-0" href="${prefix}index.html">LEGATUS
             <a> <div class="dropdown position-relative d-flex d-lg-none align-items-center">
               <!-- Shopping Bag Icon -->
               <a href="${prefix}Shopping Cart/Cart.html" class="fa-solid text-white  fa-bag-shopping fs-4 me-2"></a>
             
               <!-- User Icon with Dropdown Toggle -->
               <a class="nav-link dropdown p-2" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                 <i class="fa-solid fa-user fs-4"></i>
               </a>
             
               <!-- Dropdown Menu -->
               <ul class="dropdown-menu dropdown-menu-end ">
                 <li><span class="dropdown-header">${data.role}</span></li>
                 <li><h1 class="dropdown-item-text h1 fs-6">${data.name}</h1></li>
                 <li><a class="dropdown-item" href="${prefix}Customer Dashboard/customer-dashboard.html">My Account</a></li>
                 <li><hr class="dropdown-divider"></li>
                 <li><a class="dropdown-item logout_option" href="${prefix}Sign/Sign.html">Logout</a></li>
               </ul>
             </div></a></a>
             <button class="navbar-toggler border-0 ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
               <i class="fa-solid fa-bars text-light fs-1"></i>
             </button>
             <div class="collapse navbar-collapse gap-2" id="navbarSupportedContent">
               <ul class="navbar-nav me-auto fs-6 mb-2 gap-4  mb-lg-0">
                 <li class="nav-item">
                   <a class="nav-link active" aria-current="page" href="${prefix}index.html">Home</a>
                 </li>
                 <li class="nav-item">
                   <a class="nav-link" href="${prefix}productCatalog.html">Shop</a>
                 </li> 
                 <li class="nav-item">
                   <a class="nav-link" href="${prefix}ContactUs.html">Contact Us</a>
                 </li>
               </ul>
               <form class="d-flex align-items-center rounded  bg-white flex-grow-1" role="search">
                 <input id="search_input" class="form-control  border-0 me-2" type="search" placeholder="Search" aria-label="Search">
                 <i class="fa-solid search_icon fs-5 me-2 fa-magnifying-glass"></i>
               </form>
           </div>
           <div class="dropdown position-relative d-none d-lg-flex align-items-center gap-3">
             <!-- Shopping Bag Icon -->
             <a href="${prefix}Shopping Cart/Cart.html" class="fa-solid text-white  fa-bag-shopping fs-4 me-2"></a>
           
             <!-- User Icon with Dropdown Toggle -->
             <a class="nav-link dropdown p-2" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
               <i class="fa-solid fa-user fs-4"></i>
             </a>
           
             <!-- Dropdown Menu -->
             <ul class="dropdown-menu dropdown-menu-end">
              <li><span class="dropdown-header">${data.role}</span></li>
                 <li><h1 class="dropdown-item-text h1 fs-6">${data.name}</h1></li>
                 <li><a class="dropdown-item" href="${prefix}Customer Dashboard/customer-dashboard.html">My Account</a></li>
                 <li><hr class="dropdown-divider"></li>
                 <li><a class="dropdown-item logout_option" href="">Logout</a></li>
             </ul>
           </div>
         </div>   
       </nav>
       `
      }
      
    }else if(data.role ==='seller'){
      if(currentPath ==='/index.html' || currentPath === '/Customer%20Dashboard/customer-dashboard.html'
        || currentPath === '/ContactUs.html' || currentPath === '/Shopping%20Cart/Cart.html'|| currentPath == '/SellerManageAccount.html'){
        this.innerHTML=`
        
        <nav class="navbar navbar-expand-lg px-2">
         <div class="container-fluid d-flex px-4 ">
           <a class="navbar-brand  fw-bolder m-0" href="${prefix}index.html">LEGATUS
             <a> <div class="dropdown position-relative d-flex d-lg-none align-items-center gap-3">
                            
               <!-- User Icon with Dropdown Toggle -->
               <a class="nav-link dropdown p-2" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                 <i class="fa-solid fa-user fs-4"></i>
               </a>
             
               <!-- Dropdown Menu -->
               <ul class="dropdown-menu dropdown-menu-end">
                 <li><span class="dropdown-header">${data.role}</span></li>
                 <li><h1 class="dropdown-item-text h1 fs-6">${data.name}</h1></li>
                 <li><a class="dropdown-item" href="${prefix}Seller DashBoard/SellerDashboard.html">My Dashboard</a></li>
                 <li><a class="dropdown-item" href="${prefix}SellerManageAccount.html">Manage Account</a></li>
                 <li><hr class="dropdown-divider"></li>
                 <li><a class="dropdown-item logout_option" href="${prefix}Sign/Sign.html">Logout</a></li>
               </ul>
             </div></a></a>
             <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
               <i class="fa-solid fa-bars text-light fs-1"></i>
             </button>
             <div class="collapse navbar-collapse gap-2" id="navbarSupportedContent">
               <ul class="navbar-nav mx-auto fs-6 mb-2 gap-4  mb-lg-0">
                 <li class="nav-item">
                   <a class="nav-link active" aria-current="page" href="${prefix}index.html">Home</a>
                 </li>
                 <li class="nav-item">
                   <a class="nav-link" href="${prefix}productCatalog.html">Shop</a>
                 </li> 
                 <li class="nav-item">
                   <a class="nav-link" href="${prefix}ContactUs.html">Contact Us</a>
                 </li>
               </ul>
          
           </div>
           <div class="dropdown position-relative d-none d-lg-flex align-items-center  gap-3">
           
           
             <!-- User Icon with Dropdown Toggle -->
             <a class="nav-link dropdown p-2" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
               <i class="fa-solid fa-user fs-4"></i>
             </a>
           
             <!-- Dropdown Menu -->
             <ul class="dropdown-menu dropdown-menu-end">
              <li><span class="dropdown-header">${data.role}</span></li>
                 <li><h1 class="dropdown-item-text h1 fs-6">${data.name}</h1></li>
                 <li><a class="dropdown-item" href="${prefix}Seller DashBoard/SellerDashboard.html">My Dashboard</a></li>
                 <li><a class="dropdown-item" href="${prefix}SellerManageAccount.html">Manage Account</a></li>
                 
                 <li><hr class="dropdown-divider"></li>
                 <li><a class="dropdown-item logout_option" href="">Logout</a></li>
             </ul>
           </div>
         </div>   
       </nav>
       `
      }else{
      this.innerHTML=`
    
      <nav class="navbar navbar-expand-lg px-2 ">
         <div class="container-fluid d-flex px-4 gap-4">
           <a class="navbar-brand  fw-bolder m-0" href="${prefix}index.html">LEGATUS
             <a> <div class="dropdown position-relative d-flex d-lg-none align-items-center">
           
             <!-- User Icon with Dropdown Toggle -->
             <a class="nav-link dropdown p-2" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
               <i class="fa-solid fa-user fs-4"></i>
             </a>
           
             <!-- Dropdown Menu -->
             <ul class="dropdown-menu dropdown-menu-end">
               <li><span class="dropdown-header">${data.role}</span></li>
               <li><h1 class="dropdown-item-text h1 fs-6">${data.name}</h1></li>
               <li><a class="dropdown-item" href="${prefix}Seller DashBoard/SellerDashboard.html">My Dashboard</a></li>
                 <li><a class="dropdown-item" href="${prefix}SellerManageAccount.html">Manage Account</a></li>
               <li><hr class="dropdown-divider"></li>
               <li><a class="dropdown-item logout_option" href="${prefix}Sign/Sign.html">Logout</a></li>
             </ul>
           </div></a></a>
           <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
             <i class="fa-solid fa-bars text-light fs-1"></i>
           </button>
           <div class="collapse navbar-collapse gap-2" id="navbarSupportedContent">
             <ul class="navbar-nav me-auto fs-6 mb-2 gap-4  mb-lg-0">
               <li class="nav-item">
                 <a class="nav-link active" aria-current="page" href="${prefix}index.html">Home</a>
               </li>
               <li class="nav-item">
                 <a class="nav-link" href="${prefix}productCatalog.html">Shop</a>
               </li> 
               <li class="nav-item">
                 <a class="nav-link" href="${prefix}ContactUs.html">Contact Us</a>
               </li>
             </ul>
             <form class="d-flex align-items-center rounded  bg-white flex-grow-1" role="search">
               <input id="search_input" class="form-control  border-0 me-2" type="search" placeholder="Search" aria-label="Search">
               <i class="fa-solid search_icon fs-5 me-2 fa-magnifying-glass"></i>
             </form>
         </div>
         <div class="dropdown position-relative d-none d-lg-flex align-items-center gap-3">
           
         
           <!-- User Icon with Dropdown Toggle -->
           <a class="nav-link dropdown p-2" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
             <i class="fa-solid fa-user fs-4"></i>
           </a>
         
           <!-- Dropdown Menu -->
           <ul class="dropdown-menu dropdown-menu-end">
            <li><span class="dropdown-header">${data.role}</span></li>
               <li><h1 class="dropdown-item-text h1 fs-6">${data.name}</h1></li>
               <li><a class="dropdown-item" href="${prefix}Seller DashBoard/SellerDashboard.html">My Dashboard</a></li>
                 <li><a class="dropdown-item" href="${prefix}SellerManageAccount.html">Manage Account</a></li>
               <li><hr class="dropdown-divider"></li>
               <li><a class="dropdown-item logout_option" href="${prefix}Sign/Sign.html">Logout</a></li>
           </ul>
         </div>
       </div>   
     </nav>
     `
    }
    }else if(data.role === 'admin'){
      if(currentPath ==='/index.html' || currentPath === '/Customer%20Dashboard/customer-dashboard.html'
        || currentPath === '/ContactUs.html' || currentPath === '/Shopping%20Cart/Cart.html'){
        this.innerHTML=`
        
        <nav class="navbar navbar-expand-lg px-2">
         <div class="container-fluid d-flex px-4 ">
           <a class="navbar-brand  fw-bolder m-0" href="${prefix}index.html">LEGATUS
             <a> <div class="dropdown position-relative d-flex d-lg-none align-items-center gap-3">
               <!-- Shopping Bag Icon -->
             
               <!-- User Icon with Dropdown Toggle -->
               <a class="nav-link dropdown p-2" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                 <i class="fa-solid fa-user fs-4"></i>
               </a>
             
               <!-- Dropdown Menu -->
               <ul class="dropdown-menu dropdown-menu-end">
                 <li><span class="dropdown-header">${data.role}</span></li>
                 <li><h1 class="dropdown-item-text h1 fs-6">${data.name}</h1></li>
                 <li><a class="dropdown-item" href="${prefix}AdminDashboard.html">My Dashboard</a></li>
                 <li><a class="dropdown-item" href="${prefix}SellerManageAccount.html">Manage Account</a></li>

                 <li><hr class="dropdown-divider"></li>
                 <li><a class="dropdown-item logout_option" href="${prefix}Sign/Sign.html">Logout</a></li>
               </ul>
             </div></a></a>
             <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
               <i class="fa-solid fa-bars text-light fs-1"></i>
             </button>
             <div class="collapse navbar-collapse gap-2" id="navbarSupportedContent">
               <ul class="navbar-nav mx-auto fs-6 mb-2 gap-4  mb-lg-0">
                 <li class="nav-item">
                   <a class="nav-link active" aria-current="page" href="${prefix}index.html">Home</a>
                 </li>
                 <li class="nav-item">
                   <a class="nav-link" href="${prefix}productCatalog.html">Shop</a>
                 </li> 
                 <li class="nav-item">
                   <a class="nav-link" href="${prefix}ContactUs.html">Contact Us</a>
                 </li>
               </ul>
          
           </div>
           <div class="dropdown position-relative d-none d-lg-flex align-items-center  gap-3">
             <!-- Shopping Bag Icon -->
           
             <!-- User Icon with Dropdown Toggle -->
             <a class="nav-link dropdown p-2" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
               <i class="fa-solid fa-user fs-4"></i>
             </a>
           
             <!-- Dropdown Menu -->
             <ul class="dropdown-menu dropdown-menu-end">
              <li><span class="dropdown-header">${data.role}</span></li>
                 <li><h1 class="dropdown-item-text h1 fs-6">${data.name}</h1></li>
                 <li><a class="dropdown-item" href="${prefix}AdminDashboard.html">My Dashboard</a></li>
                 <li><a class="dropdown-item" href="${prefix}SellerManageAccount.html">Manage Account</a></li>
                 <li><hr class="dropdown-divider"></li>
                 <li><a class="dropdown-item logout_option" href="">Logout</a></li>
             </ul>
           </div>
         </div>   
       </nav>
       `
      }else{
      this.innerHTML=`
    
     <nav class="navbar navbar-expand-lg px-2 ">
         <div class="container-fluid d-flex px-4 gap-4">
           <a class="navbar-brand  fw-bolder m-0" href="${prefix}index.html">LEGATUS
             <a> <div class="dropdown position-relative d-flex d-lg-none align-items-center">
             <!-- Shopping Bag Icon -->
             <a href="${prefix}Shopping Cart/Cart.html" class="fa-solid text-white  fa-bag-shopping fs-4 me-2"></a>
           
             <!-- User Icon with Dropdown Toggle -->
             <a class="nav-link dropdown p-2" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
               <i class="fa-solid fa-user fs-4"></i>
             </a>
           
             <!-- Dropdown Menu -->
             <ul class="dropdown-menu dropdown-menu-end">
               <li><span class="dropdown-header">${data.role}</span></li>
               <li><h1 class="dropdown-item-text h1 fs-6">${data.name}</h1></li>
               <li><a class="dropdown-item" href="${prefix}AdminDashboard.html">My Dashboard</a></li>
                 <li><a class="dropdown-item" href="${prefix}SellerManageAccount.html">Manage Account</a></li>
                 <li><a class="dropdown-item" href="${prefix}AdminDashboard.html">My Dashboard</a></li>

               <li><hr class="dropdown-divider"></li>
               <li><a class="dropdown-item logout_option" href="${prefix}Sign/Sign.html">Logout</a></li>
             </ul>
           </div></a></a>
           <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
             <i class="fa-solid fa-bars text-light fs-1"></i>
           </button>
           <div class="collapse navbar-collapse gap-2" id="navbarSupportedContent">
             <ul class="navbar-nav me-auto fs-6 mb-2 gap-4  mb-lg-0">
               <li class="nav-item">
                 <a class="nav-link active" aria-current="page" href="${prefix}index.html">Home</a>
               </li>
               <li class="nav-item">
                 <a class="nav-link" href="${prefix}productCatalog.html">Shop</a>
               </li> 
               <li class="nav-item">
                 <a class="nav-link" href="${prefix}ContactUs.html">Contact Us</a>
               </li>
             </ul>
             <form class="d-flex align-items-center rounded  bg-white flex-grow-1" role="search">
               <input id="search_input" class="form-control  border-0 me-2" type="search" placeholder="Search" aria-label="Search">
               <i class="fa-solid search_icon fs-5 me-2 fa-magnifying-glass"></i>
             </form>
         </div>
         <div class="dropdown position-relative d-none d-lg-flex align-items-center gap-3">
           <!-- Shopping Bag Icon -->
           <a href="${prefix}Shopping Cart/Cart.html" class="fa-solid text-white  fa-bag-shopping fs-4 me-2"></a>
         
           <!-- User Icon with Dropdown Toggle -->
           <a class="nav-link dropdown p-2" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
             <i class="fa-solid fa-user fs-4"></i>
           </a>
         
           <!-- Dropdown Menu -->
           <ul class="dropdown-menu dropdown-menu-end">
            <li><span class="dropdown-header">${data.role}</span></li>
               <li><h1 class="dropdown-item-text h1 fs-6">${data.name}</h1></li>
               <li><a class="dropdown-item" href="${prefix}AdminDashboard.html">My Dashboard</a></li>
                 <li><a class="dropdown-item" href="${prefix}SellerManageAccount.html">Manage Account</a></li>
               <li><hr class="dropdown-divider"></li>
               <li><a class="dropdown-item logout_option" href="${prefix}Sign/Sign.html">Logout</a></li>
           </ul>
         </div>
       </div>   
     </nav>
     `
    }
  }
  })
  const logoutOption = document.querySelectorAll('.logout_option')
  logoutOption.forEach(logotout=>{
    logotout.addEventListener('click', (e)=>{
      e.preventDefault()
      localStorage.removeItem('currentUser');
      window.location.href =`${prefix}productCatalog.html`;
      
    })//end click
  })   
}
}




class SpecialFooter extends HTMLElement{
  
    connectedCallback(){
      
  const currentPath = window.location.pathname;
  const depth = currentPath.split('/').filter(segment => segment && !segment.includes('.html')).length;
  // 2. Set the correct path prefix (./ or ../)
  const prefix = depth > 0 ? '../'.repeat(depth) : './';

        this.innerHTML=`
        <footer class="footer text-white pt-5 pb-3 mt-5" style="  background-color: #002f5f;">
  <div class="container">
    <div class="d-flex flex-column flex-md-row text-center text-md-start">
      
      <!-- Brand / About -->
      <div class="flex-fill px-3 mb-4 mb-md-0">
        <h5 class="text-uppercase text-center text-md-start">Legatus</h5>
        <p class="small text-white">Discover timeless elegance with our curated <br> selection of luxury watches from top global brands.</p>
      </div>

      <!-- Quick Links -->
      <div class="flex-fill px-3 mb-4 mb-md-0">
        <h6 class="text-uppercase mb-3 text-center text-md-start">Quick Links</h6>
        <ul class="list-unstyled small">
          <li><a href="${prefix}index.html" class="text-white text-decoration-none">Home</a></li>
          <li><a href="${prefix}productCatalog.html" class="text-white text-decoration-none">Shop</a></li>
          <li><a href="${prefix}ContactUs.html" class="text-white text-decoration-none">Contact Us</a></li>
        </ul>
      </div>

      <!-- Contact Info -->
      <div class="flex-fill px-3">
        <h6 class="text-uppercase mb-3 text-center text-md-start">Contact Us</h6>
        <p class="small text-white mb-1">📍 123 Luxury Ave, Cairo, Egypt</p>
        <p class="small text-white mb-1">📞 +20 123 456 789</p>
        <p class="small text-white mb-3">✉️ info@watchstore.com</p>
        <div class="d-flex justify-content-center justify-content-md-start gap-3">
          <a href="#" class="text-white fs-5"><i class="bi bi-facebook"></i></a>
          <a href="#" class="text-white fs-5"><i class="bi bi-instagram"></i></a>
          <a href="#" class="text-white fs-5"><i class="bi bi-twitter"></i></a>
        </div>
      </div>

    </div>
  </div>
</footer>
        `
    }
    }
    
    customElements.define('special-nav', SpecialNav)
    customElements.define('special-footer', SpecialFooter)

     //Search
     let serach = document.getElementById("search_input");
     let Prodcutcard = document.querySelectorAll(".card");

     serach.addEventListener('input', ()=>{
       if(serach.value !==""){
         Prodcutcard.forEach(card=>{
           let productHead = card.querySelector('h5');
           let productNameText = productHead.innerHTML.toLowerCase();
           let inputText = serach.value.toLowerCase(); 

           if(!productNameText.includes(inputText)) {
             card.style.display = 'none';
            
           }else{
             card.style.display = 'block';
           }
         })
       }else{
         Prodcutcard.forEach(card=>{
           card.style.display = "block";
         })
         
       }

     })//end of search input
   
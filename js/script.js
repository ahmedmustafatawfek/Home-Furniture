//define product
let productDom = document.querySelector(".products");
let cartProductMenu = document.querySelector(".cart-products ");
let itemsDom = document.querySelector(".cart-products div");
let shoppingCartIcon = document.querySelector(".shoppingcart")
let badgeDom = document.querySelector(".badge");
let products = productsDB;


//***************************************************************************************** */

// Display Products
let drawProductUI;
( drawProductUI = function (products = []){

    let productUI = products.map( (item)=>{ 
        return`
                <div class="product-item">
                    <img src="${item.imageUrl}" alt="item" class="product-item-img">

                    <div class="product-desc">
                        <a onclick="saveItemData(${item.id})" >${item.title}</a>
                        <p>${item.desc}</p>
                    </div>

                    <div class="product-item-actions">
                        <button class="add-to-cart"  onclick="addedToCart(${item.id})">Add To Cart</button>
                        <i class="fav far fa-heart" style= "color:${item.liked == true ? "red" : ""}" onclick="addToFavorite(${item.id})"></i>
                    </div>
                </div>  `; 
    });
    productDom.innerHTML = productUI.join("");
})(JSON.parse( localStorage.getItem("products") )|| products);

/********************************************************************************************** */

//check if there is items in localstorage ********************************************************/

let addedItem = localStorage.getItem("productInCart") ? JSON.parse(localStorage.getItem("productInCart")) : [];

    if(addedItem){
        addedItem.map((item) =>{
            itemsDom.innerHTML += `<p> ${item.title} ${item.qty} </p>`;
        });
        badgeDom.style.display = "block";
        badgeDom.innerHTML += addedItem.length;
    };

/****************************************************************************************************/

//add to cart **************************************************************************************/
function addedToCart(id){
    if( localStorage.getItem("username")){
        let product = products.find( (item)=> item.id === id);
        let isProductInCart = addedItem.some((i) => i.id === product.id );
        
        if(isProductInCart){
            addedItem = addedItem.map((p) => {
                if(p.id === product.id) p.qty +=1;
                return p;
            })
        }else{
            addedItem.push(product);
        }

        //UI
        itemsDom.innerHTML = "";
        addedItem.forEach(item =>{
            itemsDom.innerHTML += `<p> ${item.title} ${item.qty} </p>`;
        })
    

        // save data
        localStorage.setItem("productInCart", JSON.stringify(addedItem));

        // add counter of items
        let cartItems = document.querySelectorAll(".cart-products div p");
        badgeDom.style.display = "block";
        badgeDom.innerHTML = cartItems.length;

    }else{
        // window.location = "login.html";
    }
};

function getUniqeArr (arr , filterType){
    let uniqe = arr
    .map((item) => item[filterType])
    .map((item ,i , final) => final.indexOf(item) === i && i)
    .filter((item) => arr[item])
    .map((item) => arr[item]);

    return uniqe;
}

/********************************************************************************************************/

// open Cart Menu****************************************************************************************/
shoppingCartIcon.addEventListener("click" , openCartMenu);

function openCartMenu(){
    if(itemsDom.innerHTML != ""){
        if(cartProductMenu.style.display == "block"){
        cartProductMenu.style.display = "none";
        }else{
            cartProductMenu.style.display = "block";
        }
    }
};

/************************************************************************************************/

//save Item Data*************************************************************/
function saveItemData(id){
    localStorage.setItem("productId" , id);
    window.location = "cartdetails.html";
};

/****************************************************************************/

//search function************************************************************/

let input = document.querySelector("#search");

input.addEventListener("keyup" , function(e){

        search(e.target.value , JSON.parse(localStorage.getItem("products")));

    if(e.target.value.trim() === "")
    drawProductUI(JSON.parse(localStorage.getItem("products")));
});


function search(title , myArray){
    let arr = myArray .filter((item) => item.title.indexOf(title) !== -1);
    drawProductUI(arr);
};

/***************************************************************************/

//add to favorate
let favoritesItems = localStorage.getItem("productsFavorite") ? JSON.parse(localStorage.getItem("productsFavorite")) : [];

function addToFavorite(id){
    if(localStorage.getItem("username")){
        let chooseItem = products.find((item) =>item.id ===id);
        chooseItem.liked = true ;
        favoritesItems = [...favoritesItems , chooseItem];
        let uniqeProducts= getUniqeArr(favoritesItems ,"id");
        localStorage.setItem("productsFavorite" , JSON.stringify(uniqeProducts));
        products.map( item => {
            if(item.id === chooseItem.id){
                item.liked = true;
            }
        })
        localStorage.setItem("products" , JSON.stringify(products));
        drawProductUI(products);
    }else{
        
    }
}
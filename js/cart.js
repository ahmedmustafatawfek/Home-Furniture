let productDom = document.querySelector(".products");
let noProductDom = document.querySelector(".no-products");

function  drawCartProductUI(allProducts = []){

    if(JSON.parse(localStorage.getItem("productInCart")).length === 0)
    noProductDom.innerHTML = "There Is No Items ..";

let products = JSON.parse(localStorage.getItem("productInCart")) ||allProducts;
let productUI = products.map( (item)=>{ 
    return`
        <div class="product-item">
            <img src="${item.imageUrl}" alt="item" class="product-item-img">

            <div class="product-desc">
                <h2>${item.title}</h2><br>
                <p>${item.desc}</p><br>
                <span> Quantity : ${item.qty}</span>
            </div>

            <div class="product-item-actions">
                <button class="remove-from-cart"  onclick="removeItemFromCart(${item.id})">Remove</button>
            </div>
        </div>  `; 
} );

productDom.innerHTML = productUI.join("");
};
drawCartProductUI();


function removeItemFromCart(id){
    let productInCart = localStorage.getItem("productInCart")
    if(productInCart ){
        let items = JSON.parse(productInCart);

        let filteredItems = items.filter((item) => item.id !== id);
        localStorage.setItem("productInCart" , JSON.stringify(filteredItems));
        drawCartProductUI(filteredItems);

    }
};
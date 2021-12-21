let products = JSON.parse(localStorage.getItem("products"));
let productId = localStorage.getItem("productId");

let itemDom = document.querySelector(".item-details");

let productDetails = products.find((item )=> item.id == productId);


itemDom.innerHTML = 
`                    
    <img src="${productDetails.imageUrl}" alt="image">
    <h2>${productDetails.title}</h2><br>
    <p>${productDetails.desc}</p><br>
    <h2>Quantity : ${productDetails.qty}</h2>

`
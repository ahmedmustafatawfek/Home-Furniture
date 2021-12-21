//variables
let productName = document.querySelector("#product-name");
let productDesc = document.querySelector("#product-desc");
let createForm = document.querySelector("#create-form");
let inputFile = document.querySelector("#upload-img")
let productImage;



//events
// inputFile.addEventListener("change" , uploadImage );

//functions 
function createProduct(e){
    e.preventDefault();
    let allProducts = JSON.parse(localStorage.getItem("products"))|| productsDB;
    let nameValue = productName.Value;
    let descValue = productDesc.Value;

    if(nameValue && descValue) {
        let obj = {
            id: allProducts ? allProducts.length + 1 :1,
            // imageUrl:productImage,
            title:nameValue,
            desc:descValue,
            qty:1,
        };
    
        let newProducts = allProducts ? [...allProducts , obj] : [obj];
        localStorage.setItem("products" ,  JSON.stringify(newProducts));  

        productName.Value = "";
        productDesc.Value = "";
    }else{
        alert("Enter The Data !")
    }
};


//upload img
// function uploadImage (){
    // let file = this.files[0];
    // let types = ["image/jpeg" , "image/png"];

    // if(types.indexOf(file.type) === -1){
        // alert("Type Not Supported");
        // return;
    // };

    // if(file.size >2*1024*1024 ){
        // alert("Image Not Exced 2MG");
        // return;
    // };
// 
    // getImageBase64(file);
    //  productImage = URL.createObjectURL(file);
// 
// }
// 
// ******get image base 64
// function getImageBase64(file){
    // let reader = new FileReader();
// 
    // reader.readAsDataURL(file);
// 
    // reader.onload = function(){
        // productImage = reader.result;
    // };
// 
    // reader.onerror = function(){
        // alert("Error !");
    // };
// }
let userInfo =document.querySelector('#user_info');
let userDom =document.querySelector('#user');
let logoutBtn =document.querySelector('#logout');
let links =document.querySelector('#links');

let user = localStorage.getItem("username")
if (user) {
    links.remove();
    userInfo.style.display = "flex";
    userDom.innerHTML = user;
}

logoutBtn.addEventListener("click" , function(){
    localStorage.clear();
    setTimeout(() =>{
        window.location = "login.html";
    } , 1500); 
})
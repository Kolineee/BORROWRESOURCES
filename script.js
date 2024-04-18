function toggleMenu() {
    var menuItems = document.querySelector('.navbar');
    menuItems.classList.toggle('active');
}   
let subMenu = document.getElementById("subMenu");

function toggleMenu2(){
  subMenu.classList.toggle("open-menu");
}

function toggleNotification() {
    var notificationBox = document.getElementById("notificationBox");
    notificationBox.style.display = notificationBox.style.display === "none" ? "block" : "none";
}
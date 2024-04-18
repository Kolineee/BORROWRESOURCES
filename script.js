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
var hasReserved = false;

function reserve(buttonId, timeSlot) {
    if (hasReserved) {
        alert('You have already reserved a time slot for today.');
        return;
      }

  
      var startTime = timeSlot.split(' - ')[0];
      var endTime = timeSlot.split(' - ')[1];
      var startHour = parseInt(startTime.split(':')[0]);
      var endHour = parseInt(endTime.split(':')[0]);
      if (endHour - startHour < 2) {
        alert('The projector must be reserved for at least 2 hours.');
        return;
      }

      var button = document.getElementById(buttonId);
      button.textContent = 'Reserved';
      button.classList.add('reserved');
      button.disabled = true;

  
      hasReserved = true;

  
      var notification = document.getElementById('notification');
      var reservedTime = document.getElementById('reserved-time');
      reservedTime.textContent = 'Reserved time: ' + timeSlot;
      notification.style.display = 'block';

    
      setTimeout(function() {
        notification.style.display = 'none';
      }, 5000); 
  }

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


/* para sa return sa history profile*/
let hasReserved = false;
let notificationTimeout;

function reserve(buttonId, timeSlot) {
  if (hasReserved) {
    showAlert('You have already reserved a time slot for today.');
    return;
  }

  // Check if the time slot has at least 2 hours available
  var startTime = timeSlot.split(' - ')[0];
  var endTime = timeSlot.split(' - ')[1];
  var startHour = parseInt(startTime.split(':')[0]);
  var endHour = parseInt(endTime.split(':')[0]);
  if (endHour - startHour < 2) {
    showAlert('The projector must be reserved for at least 2 hours.');
    return;
  }

  // Update button style to indicate reservation and disable it
  var button = document.getElementById(buttonId);
  button.textContent = 'Reserved';
  button.classList.add('reserved');
  button.disabled = true;

  // Update reservation status
  hasReserved = true;

  // Display success message in notification
  showNotification('Returned Successful', 'Returned time: ' + endTime);
}

function showAlert(message) {
  var notification = document.getElementById('notification');
  var notificationMessage = notification.querySelector('p');

  notificationMessage.textContent = message;
  notification.style.display = 'block';

  // Clear previous timeout if exists
  if (notificationTimeout) {
    clearTimeout(notificationTimeout);
  }

  // Hide the notification after 5 seconds
  notificationTimeout = setTimeout(function() {
    notification.style.display = 'none';
  }, 5000); // 5000 milliseconds = 5 seconds
}

function showNotification(title, message) {
  var notification = document.getElementById('notification');
  var notificationTitle = notification.querySelector('h3');
  var notificationMessage = notification.querySelector('p');

  notificationTitle.textContent = title;
  notificationMessage.textContent = message;
  notification.style.display = 'block';

  // Clear previous timeout if exists
  if (notificationTimeout) {
    clearTimeout(notificationTimeout);
  }

  // Hide the notification after 5 seconds
  notificationTimeout = setTimeout(function() {
    notification.style.display = 'none';
    hasReserved = false; // Reset reservation status
  }, 5000); // 5000 milliseconds = 5 seconds
}

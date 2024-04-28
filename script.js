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

//Para functinable ang mga notif
var hasReserved = false;
var notificationTimeout;

// Function to reserve a time slot
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
  button.textContent = 'Borrowed';
  button.classList.add('reserved');
  button.disabled = true;

  // Show the cancel button
  var cancelButton = document.getElementById('cancel' + buttonId.slice(3));
  cancelButton.style.display = 'inline-block';

  // Update reservation status
  hasReserved = true;

  // Display success message in notification
  showNotification('Reservation Successful', 'Reserved time: ' + timeSlot, 3000); // 3 seconds
}

// Function to cancel a reservation
function cancelReservation(buttonId, timeSlot) {
  var button = document.getElementById(buttonId);
  var cancelButton = document.getElementById('cancel' + buttonId.slice(3)); 
  cancelButton.style.display = 'none'; 
  button.textContent = 'Reserve'; 
  button.classList.remove('reserved'); 
  button.disabled = false; 
  hasReserved = false; 
  showNotification('Reservation Cancelled', 'Cancelled time: ' + timeSlot, 2000); // 2 seconds
}

// Function to show alert notification
function showAlert(message) {
  showNotification('Error', message, 3000); // 3 seconds
}

// Function to show notification
function showNotification(title, message, duration) {
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

  // Hide the notification after the specified duration
  notificationTimeout = setTimeout(function() {
    notification.style.display = 'none';
  }, duration);
}


// reserve button click
function borrow(timeSlot) {
  var isLoggedIn = checkLoginStatus();

  if (!isLoggedIn) {
    var modal = document.getElementById("loginModal");
    modal.style.display = "block";
    var closeButton = document.getElementsByClassName("close")[0];
    closeButton.onclick = function() {
      modal.style.display = "none";
    }
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
    var loginButton = document.getElementById("loginButton");
    loginButton.onclick = function() {
 
      window.location.href = "login.html";
    }
  } else {
   console.log("Resource reserved for: " + timeSlot);
  }
}
function checkLoginStatus() {
    return false;
}
//reservatin
function changeSelection(selection) {
  document.getElementById('dropdownText').textContent = selection;
}




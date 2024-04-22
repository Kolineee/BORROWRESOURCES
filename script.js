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
    button.textContent = 'Reserved';
    button.classList.add('reserved');
    button.disabled = true;

    // Show the cancel button
    var cancelButton = document.getElementById('cancel' + buttonId.slice(3));
    cancelButton.style.display = 'inline-block';

    // Update reservation status
    hasReserved = true;

    // Display success message in notification
    showNotification('Reservation Successful', 'Reserved time: ' + timeSlot);
  }

  // Function to cancel a reservation
  function cancelReservation(buttonId, timeSlot) {
    var button = document.getElementById(buttonId);
    var cancelButton = document.getElementById('cancel' + buttonId.slice(3)); // Get the cancel button
    cancelButton.style.display = 'none'; // Hide the cancel button
    button.textContent = 'Reserve'; // Change the button text back to Reserve
    button.classList.remove('reserved'); // Remove the reserved class
    button.disabled = false; // Enable the button
    hasReserved = false; // Update reservation status
    showNotification('Reservation Cancelled', 'Cancelled time: ' + timeSlot); // Show cancellation notification
    setTimeout(function() {
      var notification = document.getElementById('notification');
      notification.style.display = 'none';
    }, 2000); // 2 seconds
  }

  // Function to show alert notification
  function showAlert(message) {
    var notification = document.getElementById('notification');
    var notificationTitle = notification.querySelector('h3');
    var notificationMessage = notification.querySelector('p');

    notificationTitle.textContent = 'Error';
    notificationMessage.textContent = message;
    notification.style.display = 'block';

    // Disable all reserve buttons
    var reserveButtons = document.querySelectorAll('.reserve-button');
    reserveButtons.forEach(function(button) {
      button.disabled = true;
    });

    // Clear previous timeout if exists
    if (notificationTimeout) {
      clearTimeout(notificationTimeout);
    }

    // Hide the notification after 5 seconds
    notificationTimeout = setTimeout(function() {
      notification.style.display = 'none';
      // Enable all reserve buttons after hiding the notification
      reserveButtons.forEach(function(button) {
        button.disabled = false;
      });
    }, 5000); // 5000 milliseconds = 5 seconds
  }

  // Function to show success notification
  function showNotification(title, message) {
    var notification = document.getElementById('notification');
    var notificationTitle = notification.querySelector('h3');
    var notificationMessage = notification.querySelector('p');

    notificationTitle.textContent = title;
    notificationMessage.textContent = message;
    notification.style.display = 'block';
  }

  // Function to cancel all reservations
  function cancelAllReservations() {
    var reserveButtons = document.querySelectorAll('.reserve-button');
    var cancelButtons = document.querySelectorAll('.cancel-button');

    reserveButtons.forEach(function(button, index) {
      button.textContent = 'Reserve';
      button.classList.remove('reserved');
      button.disabled = false;
      cancelButtons[index].style.display = 'none';
    });

    hasReserved = false;
    showNotification('All Reservations Cancelled', 'All reservations have been cancelled.');
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





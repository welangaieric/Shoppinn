
  $(document).ready(function () {
    if($('#fixed-header')){
      window.onscroll = function() {
        var header = document.getElementById("fixed-header");
  
        var scrollPosition = window.scrollY 
    
      
        if (scrollPosition > 0) {
            header.classList.add('fixed-header')
        } else {
            header.classList.remove("fixed-header");
        }
    };
    }
   
    $("#registerBtn").on("click", function () {
       
        var newUsername = $("#newUsername").val();
        var newEmail = $("#newEmail").val();
        var newPassword = $("#newPassword").val();

        
        $.ajax({
            url: 'http://localhost:3000/register',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ newUsername: newUsername, newEmail: newEmail, newPassword: newPassword }),
            success: function (response) {
                console.log(response);
                alert(response.message);
            },
            error: function (error) {
                console.error(error);
                alert('Error during registration');
            }
        });

      
      $("#signInBtn").on("click", function () {
          
          var username = $("#username").val();
          var password = $("#password").val();
  
         
          $.ajax({
              url: 'http://localhost:3000/signin',
              method: 'POST',
              contentType: 'application/json',
              data: JSON.stringify({ username: username, password: password }),
              success: function (response) {
                  if (response.success) {
                    
                      window.location.href = 'http://localhost:3000/index1?username=' + response.username;
                  } else {
                     
                      console.log(response);
  
                      
                      var errorMessage = response.message || 'Sign-in failed. Please try again.';
                      alert(errorMessage);
                  }
              },
              error: function (error) {
                  console.error(error);
                  alert('Error during sign-in');
              }
          });
      });
  });
  

    
    
    $("#showSignInBtn").on("click", function () {
        $(".sign-in-form").toggle();
        $(this).hide();
    });



  /*checkout editing script*/
  function editDetails(contentId1, contentId2) {
    
    document.querySelector(`[onclick="editDetails('${contentId1}', '${contentId2}')"]`).innerHTML = 'Update';
    document.querySelector(`[onclick="editDetails('${contentId1}', '${contentId2}')"]`).setAttribute('onclick', `updateDetails('${contentId1}', '${contentId2}')`);
  
    
    document.getElementById(contentId1).querySelector('span').setAttribute('contenteditable', 'true');
    document.getElementById(contentId2).querySelector('span').setAttribute('contenteditable', 'true');
  }
  
  function updateDetails(contentId1, contentId2) {
    
    document.querySelector(`[onclick="updateDetails('${contentId1}', '${contentId2}')"]`).innerHTML = 'Edit';
    document.querySelector(`[onclick="updateDetails('${contentId1}', '${contentId2}')"]`).setAttribute('onclick', `editDetails('${contentId1}', '${contentId2}')`);
  
    
    document.getElementById(contentId1).querySelector('span').setAttribute('contenteditable', 'false');
    document.getElementById(contentId2).querySelector('span').setAttribute('contenteditable', 'false');
  }
  
  function placeOrder() {
    
    alert('Order placed successfully!');
  }
  /*cart*/
  //==open and close cart==//
  var cart = $('#floatingCart');
  $('.show-cart-btn').on('click',()=>{
    cart.fadeIn()
    $('#cartBackdrop').fadeIn()
  })
  $('.close-cart-btn').on('click',()=>{
    $('#cartBackdrop').fadeOut()
    cart.fadeOut()
  })
  //===////

  
  function increaseQuantity(btn) {
    var quantitySpan = btn.parentNode.querySelector('.quantity');
    var currentQuantity = parseInt(quantitySpan.textContent);
    quantitySpan.textContent = currentQuantity + 1;
  }
  
  function decreaseQuantity(btn) {
    var quantitySpan = btn.parentNode.querySelector('.quantity');
    var currentQuantity = parseInt(quantitySpan.textContent);
    if (currentQuantity > 1) {
      quantitySpan.textContent = currentQuantity - 1;
    }
  }

  /*product page*/

    $('.owl-carousel').owlCarousel({
        loop:true,
        margin:10,
        nav:false,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:3
            },
            1000:{
                items:5
            }
        }
    })
    //============count down =========================///
    function startCountdown(durationInSeconds) {
        let timerElement = document.getElementById('timer');
        let countdown = durationInSeconds;
  
        function updateTimer() {
          const hours = Math.floor(countdown / 3600);
          const minutes = Math.floor((countdown % 3600) / 60);
          const seconds = countdown % 60;
  
          timerElement.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  
          if (countdown <= 0) {
            clearInterval(timerInterval);
            timerElement.textContent = "00:00:00"; // Optional: Show a specific message when the countdown reaches zero
          } else {
            countdown--;
          }
        }
  
        // Initial call to set up the timer
        updateTimer();
  
        // Update the timer every second
        let timerInterval = setInterval(updateTimer, 1000);
      }
  
      // Start the countdown with a duration of 72 hours (72 * 60 * 60 seconds)
      startCountdown(72 * 60 * 60);
      /// ==================fixed header =================////////
      window.onscroll = function() {
        var header = document.getElementById("fixed-header");
  
        var scrollPosition = window.scrollY 
    
      
        if (scrollPosition > 0) {
            header.classList.add('fixed-header')
        } else {
            header.classList.remove("fixed-header");
        }
    };
    // const similarElements = document.querySelectorAll('.product');

    // // Calculate the width based on the number of similar elements
    // const containerWidth = document.querySelector('.products').offsetWidth;
    // const calculatedWidth = containerWidth / similarElements.length;
  
    // // Set the width for each similar element
    // similarElements.forEach(element => {
    //   element.style.width = `${calculatedWidth}px`;
    // });
})


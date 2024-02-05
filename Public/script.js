
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

  
  $(document).ready(function() {
    // URL to your JSON file
    var jsonUrl = './products.json';

    // Fetch the JSON data using AJAX
    $.ajax({
        url: jsonUrl,
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            // Process the fetched data
            $('.loading').fadeOut()
            $('.products').html('')
            displayCartItems(data);
        },
        error: function(error) {
            console.error('Error fetching data:', error);
        }
    });
});

function displayCartItems(cartItems) {
    var cartItemsContainer = $('.products');

    // Iterate through the cart items and display them
    $.each(cartItems, function(index, item) {
      let temp = `<div class="product-card" data.id=${item.itemId}>
                    <div class="product-card-header">
                      <img src="${item.itemImage}" alt="${item.itemName}">
                    </div>
                    <div class="product-details">
                    <div class="product-title">${item.itemName}</div>
                    <div class="product-price">$${item.itemPrice.toFixed(2)}</div>
                    <div class="product-ratings">
                        <span class="star">&#9733;</span>
                        <span class="star">&#9733;</span>
                        <span class="star">&#9733;</span>
                        <span class="star">&#9733;</span>
                        <span class="star">&#9734;</span>
                    </div>
                    </div>
                </div>`
        var itemHtml = `
            <div class="cart-item">
                <div class="cart-item-header">
                    <img src="${item.itemImage}" alt="${item.itemName}">
                </div>
                <div class="cart-item-body">
                    <h6 class="item-name">${item.itemName}</h6>
                    <p class="item-price">$${item.itemPrice.toFixed(2)}</p>
                    <p class="item-description">${item.itemDescription}</p>
                </div>
            </div>
        `;

        cartItemsContainer.append(temp);
    });
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


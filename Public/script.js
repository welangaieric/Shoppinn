


  $(document).ready(function () {
    const serverUrl = 'http://localhost:3000'
    const cartItem=[]
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
    $('')
   
     // Register button click event handler
     $("#registerBtn").on("click", function () {
      var newUsername = $("#newUsername").val();
      var newEmail = $("#newEmail").val();
      var newPassword = $("#newPassword").val();

      $.ajax({
          url: `${serverUrl}/register`,
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
  });

  // Sign-in button click event handler
  // $(".sign-in-form").on("submit", function (e) {
  //     var username = $("#username").val();
  //     var password = $("#password").val();
  //     e.preventDefault()

  //     $.ajax({
  //         url: `${serverUrl}/signin`,
  //         method: 'POST',
  //         data:$(".sign-in-form").serialize(),
  //         success: function (response) {
  //           console.log(response); 
  //       },
  //         error: function (error) {
  //             console.error(error);
  //             alert('Error during sign-in');
  //         }
  //     });
  // });

  // Show sign-in form button click event handler
  $("#showSignInBtn").on("click", function () {
      $(".sign-in-form").toggle();
      $(this).hide();
  });

  /*checkout editing script*/
  

 
  /*cart*/
  //==open and close cart==//
  var cart = $('#floatingCart');
  $('.show-cart-btn').on('click',function(){
    cart.fadeIn()
    const id =$(this).data('id')
    $('.cart-body').html('')
    getCart(id)
    $('#cartBackdrop').fadeIn()

  })
  $('.close-cart-btn').on('click',()=>{
    $('#cartBackdrop').fadeOut()
    cart.fadeOut()
  })

  $('.add-to-cart').on('click', async function(e) {
    e.preventDefault();
    let id = $(this).data('productid');
    let user = $(this).data('user');
    $('.cart-body').html('');
  
   addToCart(id, user);
   getCart(user);
  });
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
            displayProducts(data)
            
        },
        error: function(error) {
            console.error('Error fetching data:');
        }
    });
   
});
function displayProducts(cartItems) {
  var productsContainer = $('.products');

  // Iterate through the cart items and display them
  $.each(cartItems, function(index, item) {

    let temp = `
    <a href=${serverUrl}/checkout/${item.itemId}>
              <div class="product-card" data-id=${item.itemId}>
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
              </div>
              </a>`
  

      productsContainer.append(temp);
  });
    const prod = $('.product-card');

    prod.each(function(index, element) {
        $(element).on('click', () => {
            const id = $(element).data('id');
            $.ajax({
              type:'get',
              url:`${serverUrl}/checkout/${id}`,
              success:function(response){
                console.log(response)
              }
            })
        });
    });
}
function displayCartItems(item){
  var cartItemsContainer = $('.cart-body');
  var itemHtml = `
            <div class="cart-item">
                    <div class="cart-item-header">
                    <img src="${item.image}" alt="${item.product_name}">
                    </div>
                    <div class="cart-item-body">
                      <h6 class="item-name">${item.product_name}</h6>
                      <p class="item-price">$${item.price}</p>
                        <div class="item-quantity">
                            <div class="quantity-btn add-quantity" onclick="updateQuantity(this, -1)">-</div>
                            <span class="quantity">1</span>
                            <div class="quantity-btn decrease-quantity" onclick="updateQuantity(this, 1)">+</div>
                        </div>
                    </div>
                    <div class="cart-item-action deleteItem"  data-id=${item.id} data-user=${item.user_id}>
                        <i class="bi bi-trash"></i>
                    </div>
                </div>
        `;

        cartItemsContainer.append(itemHtml);
        $('.cart-body').on('click', '.deleteItem', function () {
          const id = $(this).data('id');
          const user = $(this).data('user');
          console.log("result");
        
          $.ajax({
            type: 'DELETE',
            url: `${serverUrl}/api/cart/${id}`,
            success: function (result) {
              // console.log(result);
              showSnackbar('Item removed successfully');
              $('.cart-body').html('');
              getCart(user);
            },
            error: function (err) {
              console.log(err);
              showSnackbar('Item removed successfully');
            }
          });
        });

}

function addToCart(id,user){
  $.ajax({
    type:'get',
    url:`${serverUrl}/cartitem/${id}/${user}`,
    success:function(response){
      // $('.cart-body').html('')
      // displayCartItems(response)
      showSnackbar('Added To Your Cart')
    }
  })
  
}
function getCart(id) {
  try {
    $.ajax({
      type: 'GET',
      url: `${serverUrl}/cart/${id}`,
      success: function (result) {
        console.log(result);
        result.forEach(async function(data){
          // console.log(data);
          await displayCartItems(data);
        });
        
        // Calculate total price and append it to .cart-total
        const totalPrice = getTotalPrice();
        console.log('Total Price:', totalPrice);
        $('#total_Amount').html(`$${totalPrice}`);
      },
      error: function (xhr, status, error) {
        console.error("Error occurred while fetching cart:", error);
        // Handle the error, such as displaying a message to the user
      }
    });
  } catch (error) {
    console.error("An unexpected error occurred:", error);
    // Handle unexpected errors
  }
}
function getTotalPrice() {
  let totalPrice = 0;
  const itemPrices = document.querySelectorAll('.item-price');
  
  itemPrices.forEach(item => {
    totalPrice += parseFloat(item.innerHTML.replace('$', '')); // Remove '$' before parsing
  });
  
  return totalPrice.toFixed(2); // Return formatted as 2 decimal places
}

function showSnackbar(message = '', buttonText = '', event) {

  const snackbar = document.querySelector('.mdc-snackbar');
  document.querySelector('.mdc-snackbar__label')
      .innerHTML = `${message}`;

  snackbar.classList.add('show');
  setTimeout(function () {
      snackbar.classList.remove("show");
  }, 6200);

}

  /*product page*/

  
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
 
})


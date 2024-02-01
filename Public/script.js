
/*log in*/
function showSignInForm() {
    var signInForm = document.querySelector('.sign-in-form');
    signInForm.style.display = 'block';
  
    var signInBtn = document.getElementById('showSignInBtn');
    signInBtn.style.display = 'none'; // Hide the "Sign In" button
  }
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
  
  function toggleCartVisibility() {
    var cart = document.getElementById('floatingCart');
    cart.style.display = cart.style.display === 'none' ? 'block' : 'none';
  }
  
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
// $('#password, #password_confirm').on('keyup', function () {
//   if ($('#password').val() === $('#password_confirm').val()) {
//     $('#message').html('Matching').css('color', 'green');
//   } else 
//     $('#message').html('Not Matching').css('color', 'red');
// });

// var check = function() {
//   if (document.getElementById('password').value ==
//     document.getElementById('password_confirm').value) {
//     document.getElementById('message').style.color = 'green';
//     document.getElementById('message').innerHTML = 'matching';
//   } else {
//     document.getElementById('message').style.color = 'red';
//     document.getElementById('message').innerHTML = 'not matching';
//   }
// }
// function check() {
//   if (document.getElementsByName('password').value === document.getElementById('password_confirm').value) {
//       document.getElementsByName('submit').disabled = false;
//   } else {
//       document.getElementsByName('submit').disabled = true;
//   }
// }


// jQuery.validator.addMethod( 'passwordMatch', function(value, element) {
    
//   // The two password inputs
//   var password = $("#password").val();
//   var confirmPassword = $("#password_confirm").val();

//   // Check for equality with the password inputs
//   if (password != confirmPassword ) {
//       return false;
//   } else {
//       return true;
//   }

// }, "Your Passwords Must Match");

function Validate() {
  var password = document.getElementById("password").value;
  var confirmPassword = document.getElementById("password_confirmPassword").value;
  if (password != confirmPassword) {
      alert("Passwords do not match.");
      return false;
  }
  return true;
}
$('#check1').on('change', function(e) {
  if(e.target.checked){
    $('#set').modal({
      backdrop: 'static',
      keyboard: false
    });
  } else {
    $.ajax({
      url:'/account/check',
      type:'POST',
      data: {check1:false}
    })
  }
})

$('#check2').on('change', function(e) {
  if(e.target.checked){
    $('#set2').modal({
      backdrop: 'static',
      keyboard: false
    });
  } else {
    $.ajax({
      url:'/account/check',
      type:'POST',
      data: {check1:false}
    })
  }
})

function check(){
  var token = $('#token').val();
  console.log("ooooooo",token);
  $.ajax({
    url:'/account/check',
    type:'GET',
    success : function (respon) {
      if(respon === true) {
        $('#submit').attr('disabled' , false);
        $("#p").replaceWith("<p id='p' class= 'mt-2' style='color: green;'><i>true token</i></p>");
      } else {
        $('#submit').attr('disabled' , true);
        $("#p").replaceWith("<p id='p' class= 'mt-2' style='color: red;'><i>wrong token!</i></p>");
      }
    }
  })
}

// function enable(){
//   var id = $('#id').val();
//   $.ajax({
//     url:'/admin/enable/'+id,
//     type:'POST',
//     success : function (respon) {
//       $('#set').modal('hide')
//       $( "#check1" ).prop( "checked", true); 
//     }
//   })
// }  

// function disable(){
//   var id = $('#id').val();
//   $.ajax({
//     url:'/disable/'+id,
//     type:'POST',
//     success : function (respon) {
//       $('#set').modal('hide')
//       $( "#check1" ).prop( "checked", false); 
//     }
//   })
// } 

var password = document.getElementsByName("new_password")
  , confirm_password = document.getElementsByName("confirm_password");
console.log('aslks',password)

function validatePassword(){
  if(password.value != confirm_password.value) {
    confirm_password.setCustomValidity("Passwords Don't Match");
  } else {
    confirm_password.setCustomValidity('');
  }
}

password.onchange = validatePassword;
confirm_password.onkeyup = validatePassword;
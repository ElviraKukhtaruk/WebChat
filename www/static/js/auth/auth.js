$(".submit_button").click(function(){
 let name = $(".form_input.name").val();
 let password = $(".form_input.password").val();

  $.ajax({
    type: 'POST',
    url: '/auth',
    dataType: 'text',
    data: {name: name, password: password},
    success: function(){
        window.location.href = "/auth";
    },
    error: function(err){
        showMessage(err.responseText, 'error');
    }
  });
});
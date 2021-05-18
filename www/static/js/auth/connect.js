let socket = io.connect('http://192.168.0.32:3000');

socket.on('connect', function() {
    $(".input_connect.id").val(socket.id);
});

$(".submit_connect_btn").click(()=>{
    let id = $(".input_connect.id").val();
    let secret_name = $(".input_connect.sec_name").val();
    sentRequest(id, secret_name);
});

function sentRequest(id, secret_name){
$.ajax({
    type: 'POST',
    url: '/auth/connect',
    dataType: 'text',
    data: {id: id, secret_name: secret_name},
    success: function(mess){
      console.log(mess);
      $(".connect").css("display", "none");
    },
    error: function(err){
       console.log(err);
       showMessage(err.responseText, 'error');
    }
 });
}
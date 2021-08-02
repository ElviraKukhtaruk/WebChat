let socket = io.connect('https://192.168.0.66:443');
let room_name;

$(".submit_connect_btn").click(()=>{
    let username = $(".input_connect.sec_name").val();
    sendRequest(username);
});

function sendRequest(username){     
$.ajax({
    type: 'POST',
    url: '/messenger/startChat',
    dataType: 'text',
    data: {username: username},
    success: function(){
        $(".connect").css("display", "none");
    },
    error: function(err){
        showMessage(err.responseText, 'error');
    }
  });
}
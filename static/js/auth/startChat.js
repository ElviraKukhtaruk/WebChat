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
        let script = document.createElement('script');
            script.src = '/static/js/chat/chat.js';
            document.body.appendChild(script);
    },
    error: function(err){
        showMessage(err.responseText, 'error');
    }
  });
}
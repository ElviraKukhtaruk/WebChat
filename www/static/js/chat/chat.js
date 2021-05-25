let setTimeoutId;

function scrollDown(){
  setTimeout(()=> window.scrollTo(0, document.querySelector("body").scrollHeight), 0);
}

$(".input_message").on("keydown", function(){
  socket.emit('writing');
});


$(".submit_button").click(function(){
    let text = $(".input_message").val();
    if(text){
       socket.emit('message', {message: text});
       $(`<div class='message_my'>${text}</div>`).appendTo(".messages_container");
    }
    $(".input_message").val("");
    scrollDown();
});

socket.on('answer', function(answer){
    window.clearTimeout(setTimeoutId);
    $(".lds-facebook").css("display","none");
    $(`<div class='message_user'>${answer}</div>`).appendTo(".messages_container");
    scrollDown();
});

socket.on("user_is_writing", function(){
  window.clearTimeout(setTimeoutId);
  $(".lds-facebook").css("display","inline-block");
  setTimeoutId = window.setTimeout(function(){
    $(".lds-facebook").css("display","none");
  }, 2000);
});


socket.on('disconnect', function(err){
  showMessage('Chyba připojení k serveru. Zkuste restartovat stránku.', 'error');
});
socket.on('error', function(err){
  if(err.mess) showMessage(err.mess, "error");
  else showMessage("Došlo k chybě", "error");
});




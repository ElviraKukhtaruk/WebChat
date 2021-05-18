let messageSetTimeOutId;

function showMessage(text, type){
    window.clearTimeout(messageSetTimeOutId);
    let messageColor = '';
    type === 'error' ?  messageColor='ff4d4d' : messageColor="#4dff52";
    $(".message").css("display", "block");
    $(".message").css("background-color", messageColor);
    $(".message").text(text);
    messageSetTimeOutId = window.setTimeout(function(){
      $(".message").css("display", "none");
    }, 4000);
}
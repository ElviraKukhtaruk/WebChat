function showUserIsWriting(status){
  if(status == 'show') $(".lds-facebook").css("display", "inline-block");
  else $(".lds-facebook").css("display","none");
}

function scrollDown(){
    setTimeout(()=>{
        window.scrollTo(0,document.querySelector("body").scrollHeight);
    }, 0);
}scrollDown();
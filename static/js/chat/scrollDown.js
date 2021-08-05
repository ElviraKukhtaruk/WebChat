function scrollDown(){
    setTimeout(()=>{
        window.scrollTo(0,document.querySelector("body").scrollHeight);
    }, 0);
}scrollDown();
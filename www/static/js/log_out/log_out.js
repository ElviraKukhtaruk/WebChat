$(".log_out").click(function(){
    $.get('/auth/log_out', (data)=> window.location.href = "/");
});
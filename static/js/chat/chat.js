(async function(){
  let setTimeoutId;
  let publicKey = await generateKeys();
  let socket = io.connect('https://192.168.0.66:443', {auth: {publicKey}});
  
  $(".input_message").on("keydown", () => socket.emit('writing'));
  $(".submit_button").click(sendAndEncryptMessage);
  socket.on('answer', getAndDecryptMessage);
  socket.on("user_is_writing", userIsWriting);
  socket.on('disconnect', ()=> showMessage('Chyba připojení k serveru. Zkuste restartovat stránku.', 'error'));
  socket.on('error', err => err.mess ? showMessage(err.mess, "error") : showMessage("Došlo k chybě", "error"));


async function sendAndEncryptMessage(){
  let text = $(".input_message").val();
  if(text){
      socket.emit('getPublicKey', async(publicKey)=>{
        let currentPubKey = await localforage.getItem('publicKeyOfCurrentInterlocutor');
        if(currentPubKey !== null && JSON.stringify(currentPubKey) === JSON.stringify(publicKey)){
          let encryptedData = await encrypt(text);
          let pubKey = await localforage.getItem('myPublicKey');
          socket.emit('message', {message: encryptedData.message, iv: encryptedData.iv.buffer, pubKey: pubKey});
         }else{
          await localforage.setItem('publicKeyOfCurrentInterlocutor', publicKey);
          await generateSecret(publicKey);
          let encryptedData = await encrypt(text);
          let pubKey = await localforage.getItem('myPublicKey');
          socket.emit('message', {message: encryptedData.message, iv: encryptedData.iv.buffer, pubKey: pubKey});
         }
       });
       $(`<div class='message_my'>${valitadeMessage(text)}</div>`).appendTo(".messages_container");
    }
    $(".input_message").val("");
    scrollDown();
}


async function getAndDecryptMessage(answer){
  window.clearTimeout(setTimeoutId);
  showUserIsWriting('hide');
 
  let currentPubKey = await localforage.getItem('publicKeyOfCurrentInterlocutor');
  if(currentPubKey !== null && JSON.stringify(currentPubKey) === JSON.stringify(answer.pubKey)){
      let decryptedData = await decrypt(answer.message, answer.iv);
      $(`<div class='message_user'>${valitadeMessage(decryptedData)}</div>`).appendTo(".messages_container");
  }else{
    await localforage.setItem('publicKeyOfCurrentInterlocutor', answer.pubKey);
    await generateSecret(answer.pubKey);
    let decryptedData = await decrypt(answer.message, answer.iv);
    $(`<div class='message_user'>${valitadeMessage(decryptedData)}</div>`).appendTo(".messages_container");
  
  }
  scrollDown();
}

function userIsWriting(){
  window.clearTimeout(setTimeoutId);
  showUserIsWriting('show');
  setTimeoutId = window.setTimeout(()=> showUserIsWriting('hide'), 2000);
}
  
})();
  
  
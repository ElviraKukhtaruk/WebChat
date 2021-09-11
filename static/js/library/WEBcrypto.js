let currentIV;


async function importKey(format, extractable, key, usages){
  return await window.crypto.subtle.importKey(
    format,
    key,
    { name: "ECDH",
      namedCurve: "P-384" },
    extractable,
    usages
  );
}

 async function encrypt(plainText){
  if(window.TextEncoder === undefined){
    showMessage('Váš prohlížeč nepodporuje TextEcoder, aktualizujte prosím svůj prohlížeč nebo nainstalujte jiný.', 'error');
  }else{
    currentIV = window.crypto.getRandomValues(new Uint8Array(12));
    let messages = new TextEncoder('utf-8').encode(plainText);
    return {message: await window.crypto.subtle.encrypt(
        { name: "AES-GCM",
          iv: currentIV },
        await localforage.getItem('secret'),
        messages
      ), iv: currentIV}
  }
 }

async function decrypt(encryptMessage, iv){
  if(window.TextDecoder === undefined){
    showMessage('Váš prohlížeč nepodporuje TextDecoder, aktualizujte prosím svůj prohlížeč nebo nainstalujte jiný.', 'error');
  }else{
    let decryptMessage = await window.crypto.subtle.decrypt(
        { name: "AES-GCM",
          iv: iv },
          await localforage.getItem('secret'),
        encryptMessage
      );
      console.log('decrypt 2');
    return new TextDecoder().decode(decryptMessage);
  }
}

async function generateKeys(){
let keys = await window.crypto.subtle.generateKey(
    { name: "ECDH",
      namedCurve: "P-384" },
    true,
    ["deriveKey"]
);
let exportPublicKey = await window.crypto.subtle.exportKey('jwk', keys.publicKey); 
let exportPrivateKey = await window.crypto.subtle.exportKey('pkcs8', keys.privateKey); 
let importPrivateKey = await importKey('pkcs8', false, exportPrivateKey, ["deriveKey"]);

await localforage.setItem('myPrivateKey', importPrivateKey);
await localforage.setItem('myPublicKey', exportPublicKey);

let currentPubKey = await localforage.getItem('publicKeyOfCurrentInterlocutor');

if(currentPubKey !== null){
  let sec = await generateSecret(currentPubKey);
  await localforage.setItem('secret', sec);
}
return exportPublicKey;

}

async function generateSecret(publicKey){
 let importPublicKey = await importKey('jwk', true, publicKey, []);
 let secret = window.crypto.subtle.deriveKey(
    { name: "ECDH",
      public: importPublicKey },
      await localforage.getItem('myPrivateKey'),
    { name: "AES-GCM",
      length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
  await localforage.setItem('secret', secret);
  return secret;
}
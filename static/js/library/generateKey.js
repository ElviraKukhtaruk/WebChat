async function importSecretKey(format, key) {
    return await window.crypto.subtle.exportKey(
        format,
        key
    );
  }

function makeKeys() {
	return window.crypto.subtle.generateKey(
    {
        name: "RSA-OAEP",
        modulusLength: 4096, //1024, 2048, 4096
        publicExponent: new Uint8Array([1, 0, 1]),
        hash: {name: "SHA-256"}, //"SHA-1", "SHA-256", "SHA-384", "SHA-512"
    },
    false,
    ["encrypt", "decrypt"] 
   );
}

async function generatePrivateKey(){
  return makeKeys().then(async function(data){
      let dataa = await importSecretKey('pkcs8', data.privateKey);
      let text = String.fromCharCode.apply(null, new Uint8Array(dataa));
      const exportedAsBase64 = window.btoa(text);
      return `-----BEGIN PRIVATE KEY-----\n${exportedAsBase64}\n-----END PRIVATE KEY-----`;
  });
}
async function generatePublicKey(){
    return makeKeys().then(async function(data){
        let dataa = await importSecretKey('spki', data.publicKey);
        let text = String.fromCharCode.apply(null, new Uint8Array(dataa));
        const exportedAsBase64 = window.btoa(text);
        return `-----BEGIN PUBLIC KEY-----\n${exportedAsBase64}\n-----END PUBLIC KEY-----`;
    });
  }


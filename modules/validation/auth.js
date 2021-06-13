module.exports = (id)=>{
    return id.replace(/\&/g, '')
    .replace(/\</g, '')
    .replace(/\>/g, '')
    .replace(/\"/g, '')
    .replace(/\'/g, '')
    .replace(/\`/g, '')
    .replace(/\(/g, '')
    .replace(/\)/g, '')
    .replace(/\{/g, '')
    .replace(/\}/g, '')
    .replace(/\\/g, '')
    .replace(/\//g, ''); 
}
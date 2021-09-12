module.exports = {
  contentSecurityPolicy:{ 
   useDefaults: true,
   directives: {
    "font-src": "'self'",
    "img-src": "'self'",
    "style-src": "'self'"
   }
  }
};
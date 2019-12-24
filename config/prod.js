// prod.js - production keys here!!
module.exports = {
    googleClientID: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    mongoURI: process.env.MONGO_URI,
    cookieKey: process.env.COOKIE_KEY,
    redirectDomain: process.env.REDIRECT_DOMAIN,
    "corsOptions": {
      "credentials": true,
      "origin": [
        "https://financialkeeps.herokuapp.com/",
        "https://financialkeeps.herokuapp.com/bills/new",
        "https://financialkeeps.herokuapp.com/new/profile"
      ],
      "methods": "GET,POST",
      "preflightContinue": true,
      "optionsSuccessStatus": 202
    }
  };
// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : '507842643018483\n', // your App ID
        'clientSecret'  : 'b1e25c320a1909aef7faf3e3508f467a', // your App Secret
        'callbackURL'   : 'https://localhost:8080/auth/facebook/callback',
        'profileURL'    : 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
        'profileFields' : ['id', 'email', 'displayName', 'picture.type(large)'] // For requesting permissions from Facebook API
    },

    'twitterAuth' : {
        'consumerKey'       : 'TyyMEL2vwH5Y1jYUXDE3nJ162',
        'consumerSecret'    : 'k3c1R9ZcbJnwUeq0JAoh3MvJr68mwcG2eky8K6WHOg5ArhT2qK',
        'callbackURL'       : 'https://localhost:8080/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'      : '921636684244-clmbln80diet5ldscqc22f667tmuimfr.apps.googleusercontent.com',
        'clientSecret'  : 'F15XY3ad3_A11DVGHH6K0Pd6',
        'callbackURL'   : 'https://localhost:8080/auth/google/callback'
    },

    'officeAuth' : {
        'clientID'      : '9638e45d-956a-4034-af8e-9368d07871f8',
        'clientSecret'  : 'onvsXM45#gpzOASMZ963:}_',
        'callbackURL'   : 'https://localhost:8080/auth/azure_ad_oauth2/callback'
    }
};
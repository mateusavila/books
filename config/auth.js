// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

	'prod' : {
		'facebookAuth' : {
			'clientID' 		: '1404818779756755', // your App ID
			'clientSecret' 	: 'a639f0625a2c5c220eccecc303264056', // your App Secret
			'callbackURL' 	: 'http://doeumlivro.com.br/api/auth/facebook/callback'
		}
	},
	'dev' : {
		'facebookAuth' : {
			'clientID' 		: '207034022818088', // your App ID
			'clientSecret' 	: '8e14748444e58c9180a1386a588f8b0f', // your App Secret
			'callbackURL' 	: 'http://localhost:8080/api/auth/facebook/callback'
		}
	}
};
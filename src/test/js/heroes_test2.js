test( "should request a list of characters", function() {
	// Arrange
	var marvel = new Marvel();

	// Act
	var promise = marvel.getCharacters();

	// Assert
	ok(promise !== undefined);
});

test( "should cache the characters that are requested", function() {
	// Arrange
	var marvel = new Marvel();

	// Act
	var promise = marvel.getCharacters();

	// Assert
	ok(marvel.characters !== undefined);
});

function Marvel() {
	var self = this;
	jQuery.ajaxSetup({ cache: true });

	self.getCharacters = function() {
		var myCharacters;
		var setCharacters = function( data ) {
			myCharacters = data;
		};
		jQuery.ajax( {
			async: false,
			url: "http://gateway.marvel.com:80/v1/public/characters",
			data: { apikey: "71457a857362cd810c232ada647fde92", ts: 1,
			hash: "afc4073c9315eba5606ead3173a8274f" },
			success: setCharacters,
			dataType: "jsonp"
		} );
		return self.characters = myCharacters;
	}
};
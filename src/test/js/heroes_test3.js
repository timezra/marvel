var fakeJQuery = { ajax: function() { return {}; },
				   ajaxSetup: function() {}
				 };

test( "should request a list of characters", function() {
	// Arrange
	var marvel = new Marvel(fakeJQuery);

	// Act
	var promise = marvel.getCharacters();

	// Assert
	ok(promise !== undefined);
});

test( "should cache the characters that are requested", function() {
	// Arrange
	var marvel = new Marvel(fakeJQuery);
	var expectedCharacters = {};
	fakeJQuery.ajax = function( request ) {
		request.success( expectedCharacters );
	};

	// Act
	var promise = marvel.getCharacters();

	// Assert
	ok(marvel.characters === expectedCharacters);
});

function Marvel($) {
	var self = this;
	$.ajaxSetup({ cache: true });

	self.getCharacters = function() {
		return $.ajax( {
			url: "http://gateway.marvel.com:80/v1/public/characters",
			data: { apikey: "71457a857362cd810c232ada647fde92", ts: 1,
			hash: "afc4073c9315eba5606ead3173a8274f" },
			success: function( data ) { self.characters = data; },
			dataType: "jsonp"
		} );
	}
};
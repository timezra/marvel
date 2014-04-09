test( "should request a list of characters", function() {
	// Arrange
	var marvel = new Marvel();

	// Act
	var promise = marvel.getCharacters();

	// Assert
	ok(promise !== undefined);
});

function Marvel() {
	this.getCharacters = function() {
		return {};
	}
};
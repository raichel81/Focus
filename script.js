var initializeGame = function() {
	var playButton = $('.play');

	playButton.click(showNamesForm);
	playButton.focus();


};

var showNamesForm = function() {
	$('.intro').hide();
	$('.names').show();
};

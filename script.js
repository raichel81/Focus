var player1Name;
var player2Name;

var initializeGame = function() {
	var playButton = $('.play');

	playButton.click(showNamesForm);
	playButton.focus();

	var enterNamesForm = $('.enterNames');
	enterNamesForm.submit(showHowTo);

	var goButton = $('.letsGo');
	goButton.click(showEssay);

	var doneButton = $('.done');
	doneButton.click(showQuestion);


	// var buzzer1 = 

	// var buzzer2 = 

	var answerButton = $('.questionBox button');
	answerButton.click(showNextBox);

	var readyButton = $('.next');
	readyButton.click(showQuestionBox);


};

var showNamesForm = function() {
	$('.intro').hide();
	$('.names').show();
	$('.player1').focus().select();
};

var showHowTo = function(e) {
	e.preventDefault();
	$('.home').hide();
	$('.howTo').show();
	player1Name = $('.player1').val();
	player2Name = $('.player2').val();
	$('.player1Name').text(player1Name);
	$('.player2Name').text(player2Name);
	$('.letsGo').focus();
};

var showEssay = function() {
	$('.howTo').hide();
	$('.reading').show();
	$('.done').focus();
	$('.timer').countdown({ 
		until: "+5", 
		layout: "{mn}:{snn}", 
		onExpiry: showQuestion
		});

};

var showQuestion = function() {
	$('.reading').hide();
	$('.nextBox').hide();
	$('.questions').show();
	
};


var playerBuzzed = function(e) {

};



var showNextBox = function() {
	$('.questionBox').hide();
	$('.nextBox').show();
};

var showQuestionBox = function() {
	$('.nextBox').hide();
	$('.questionBox').show();
};

// $('.timer').countdown('destroy')

// $('.timer').countdown({ 
// 	until: "+3", 
// 	layout: "{snn}", 
// 	onExpiry: function(){ 
// 		$(this).countdown('destroy'); 
// 	} 
// });






















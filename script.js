var player1Name;
var player2Name;
// var questionData;
var currentEssay = 0;
var currentQuestion = 0;
var currentQuestionCorrect = 0;
var buzzedInPlayer;

var initializeGame = function() {
	var playButton = $('.play');

	playButton.click(showNamesForm);
	playButton.focus();

	$('.enterNames').submit(showHowTo);

	$('.letsGo').click(showEssay);

	$('.done').click(showQuestion);

	// var buzzer1 = 

	// var buzzer2 = 

	$('.questionBox button').each(function(i, answerButtonElement) {
	
		$(answerButtonElement).click(function() {
			playerAnswer(i);
		});
	
	});

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
	$('.essay').text(questionData[currentEssay].essay);
	$('.howTo').hide();
	$('.reading').show();
	$('.done').focus();
	$('.readingTimer').countdown({ 
		until: "+300", 
		layout: "{mn}:{snn}", 
		onExpiry: showQuestion
		});

};

var showQuestion = function() {
	// navigate to question page
	$('.reading').hide();
	$('.questions').show();

	// load in the question data from the JSON
	var currentQuestionData = questionData[currentEssay].questions[currentQuestion];
	currentQuestionCorrect = currentQuestionData.correctAnswer; 
	$('.question').text(currentQuestionData.text);
	$('.answer').each(function(index, answerButton) {
		$(answerButton).text(currentQuestionData.answers[index]);
	});
	$('.answer').css("background-color","");
	$('.questionTimer').countdown({ 
		until: "+10", 
		layout: "{mn}:{snn}", 
		onExpiry: correctAnswer
		});

	// // TEMP
	// buzzedInPlayer = 1;
// 	$('.blink-me').on('input', function() { 
//     $(this).val() // get the current value of the input field.
// });
	// $('.questions').keypress(function(e) {
 //   if(e.keyCode == 97){
 //   	$('.blink-me').on(buzzedInPlayer)
 //    alert('key a pressed');
 //   }
 // });
};


// var playerBuzzed = function(e) {

// };



var showNextBox = function() {
	$('.questionBox').hide();
	$('.nextBox').show();
};

var showQuestionBox = function() {
	$('.nextBox').hide();
	$('.questionBox').show();
};

var playerAnswer = function(answerIndex) {
	if(buzzedInPlayer) {
		if(answerIndex == currentQuestionCorrect) {
			correctAnswer();
		} else {
			incorrectAnswer(answerIndex);
		}
	}
};

var correctAnswer = function() {

	$('.answer')[currentQuestionCorrect].style.background = "green";
	loadNextQuestion();
};

var incorrectAnswer = function(answerIndex) {
	// decrement player score
	$('.answer')[answerIndex].style.background = "red";
	$('.answer')[currentQuestionCorrect].style.background = "green";
	loadNextQuestion();
};

var loadNextQuestion = function() {
	currentQuestion++;
	buzzedInPlayer = null;
	setTimeout(showQuestion,3000);
	$('.questionTimer').countdown('destroy'); 
};

var loadNextEssay = function() {
	currentEssay++;
	$('.readingTimer').countdown('destroy'); 
};

// var plusPoint = 


// var minusPoint = 
	// increment the "currentQuestion" counter
	// if there's another question, show the question
	// if not, go to finish page with final score

























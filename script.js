var player1Name;
var player2Name;
// Defined in questionData.json
// var questionData;
var currentEssay;
var currentQuestion = 0;
var currentQuestionCorrect = 0;
var buzzedInPlayer;
var alreadyBuzzed = false;
var player1Score = 0;
var player2Score = 0;
var timedOut;

document.querySelector('.finish').addEventListener('click', function(event){
	window.location.reload(false);
})

var initializeGame = function() {
	currentEssay = Math.floor(Math.random() * questionData.length);

	var playButton = $('.play');

	playButton.click(showNamesForm);
	playButton.focus();

	$('.enterNames').submit(showHowTo);

	$('.letsGo').click(showEssay);

	$('.done').click(showQuestion);

	$('.questionBox button').each(function(i, answerButtonElement) {
		$(answerButtonElement).click(function() {
			playerAnswer(i);
		});
	});

	$(window).keypress(function(e) {
	   if(e.keyCode == 97){
	   	playerBuzzed(1);
	   }
	 });

	$(window).keypress(function(e) {
	   if(e.keyCode == 112){
	   	playerBuzzed(2);
	   }
	 });

};


var playerBuzzed = function(whichPlayer) {
	if(alreadyBuzzed) {
		return;
	}
	$('.player'+ whichPlayer + 'Name').addClass( "blink-me");
	buzzedInPlayer = whichPlayer;
	alreadyBuzzed = true;
};

var showNamesForm = function() {
	$('.intro').hide();
	$('.names').show();
	$('.player1').focus().select();
	alreadyBuzzed = true;
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
	$('.essay').html(questionData[currentEssay].essay);
	// recognises html^
	$('.howTo').hide();
	$('.reading').show();
	$('.final').hide();
	window.scrollTo(0,0);
	$('.done').focus();
	$('.readingTimer').countdown({ 
		until: "+300", 
		layout: "{mn}:{snn}", 
		onExpiry: showQuestion
	});
	window.scrollTo(0,0);
};

var showQuestion = function() {
	// navigate to question page
	alreadyBuzzed = false;
	$('.reading').hide();
	$('.questions').show();

	// load in the question data from the JSON
	var currentQuestionData = questionData[currentEssay].questions[currentQuestion];
	if (!currentQuestionData){
		goToFinish();
		return;
	};
	currentQuestionCorrect = currentQuestionData.correctAnswer; 
	$('.question').text(currentQuestionData.text);
	$('.answer').each(function(index, answerButton) {
		$(answerButton).text(currentQuestionData.answers[index]);
	});



	$('.answer').css("background-color","");
	$('.questionTimer').countdown({ 
		until: "+2", 
		layout: "{snn}", 
		onExpiry: timedOut
		});
	$('.blink-me').removeClass("blink-me");
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

	$('.answer')[currentQuestionCorrect].style.background = "#137834";
	if(buzzedInPlayer == 1) {
		player1Score++
	}else if (buzzedInPlayer == 2) { 
		player2Score++
	} 
	loadNextQuestion();
};

var incorrectAnswer = function(answerIndex) {
	if(buzzedInPlayer == 1) {
		player1Score--
	}else { 
		player2Score--
	}
	$('.answer')[answerIndex].style.background = "#9D240F";
	$('.answer')[currentQuestionCorrect].style.background = "#137834";
	loadNextQuestion();
};

var timedOut = function() {	
	$('.answer')[currentQuestionCorrect].style.background = "#137834";
	loadNextQuestion();
};

var loadNextQuestion = function() {
	currentQuestion++;
	buzzedInPlayer = null;
	setTimeout(showQuestion,3000);
	$('.player1Score').text(player1Score);
	$('.player2Score').text(player2Score);
	$('.questionTimer').countdown('destroy'); 
};

var loadNextEssay = function() {
	currentEssay++;
	$('.readingTimer').countdown('destroy'); 
};

var highestScore = function() {
	if(player1Score > player2Score) {
		return player1Name + " is sooo awesome!";
	}
	else if(player2Score > player1Score) {
		return player2Name + " is like sooo perfect!";
	}
	else {
		return "I love you both the same =/"
	}
};


var goToFinish = function() {
	currentEssay = (currentEssay + 1) % (questionData.length);
	currentQuestion = 0;
	$('.questions').hide();
	$('.final').show();
	$('.continue').focus();
	$('.continue').click(showEssay);
	$('.readingTimer').countdown('destroy'); 
	$('.winner').text(highestScore);
};

// extra break between paragraphs. take out numbers, 
// set lengths of timers as appropriate
// read through essays and Qs, change colors of answer buttons





















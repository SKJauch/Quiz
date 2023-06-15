function generateQuiz(questions, quizContainer, resultsContainer, submitButton){

	function showQuestions(questions, quizContainer){
		// code will go here
	}

	function showResults(questions, quizContainer, resultsContainer){
		// code will go here
	}

	// show the questions
	showQuestions(questions, quizContainer);

	// when user clicks submit, show results
	submitButton.onclick = function(){
		showResults(questions, quizContainer, resultsContainer);
	}
}

var myQuestions = [
	{
		question: "Arrays in JavaScript must be enclosed in:",
		answers: {
			a: 'Curly Braces',
			b: 'Parenthese',
			c: 'Quotations',
            d: 'Ampersands'
		},
		correctAnswer: 'c'
	},
	{
		question: "A boolean is:",
		answers: {
			a: 'true/false',
			b: 'a number',
			c: 'an alien species'
            d: 'an array'
		},
		correctAnswer: 'a'
	}
    {
		question: "To terminate a line of code in JavaSript, you must use:",
		answers: {
			a: '?',
			b: '#',
			c: '*'
            d: ';'
		},
		correctAnswer: 'd'
	}
];
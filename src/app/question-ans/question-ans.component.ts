import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

declare var $:any;
@Component({
  selector: 'app-question-ans',
  templateUrl: './question-ans.component.html',
  styleUrls: ['./question-ans.component.css']
})
export class QuestionAnsComponent implements OnInit {
	question:any =[];
	answerList:any = [];
	quizForm:FormGroup;
	chartOptions = {
		scales: {
        yAxes: [{
	            ticks: {
	                max: 3.5,
	                min: 0,
	                stepSize: 0.5
	            }
	        }]
	    },
	    responsive: true, // THIS WILL MAKE THE CHART RESPONSIVE (VISIBLE IN ANY DEVICE).
	    maintainAspectRatio: true
	        
	  }
    labels =  ['Correct','Incorrect'];

  // STATIC DATA FOR THE CHART IN JSON FORMAT.
  chartData = [
    {
      label: 'Quiz Result',
      data: [0,0] 
    }
  ];

  // CHART COLOR.
  colors = [
    { // Quiz Bar label.
      backgroundColor: 'rgba(133,191,56,0.34)'
    },
    
  ]
  
  // CHART CLICK EVENT.
 
  constructor(
  	private formBuilder: FormBuilder
  	) { }

  ngOnInit() {
  	this.quizForm = this.formBuilder.group({
  		'answer': ['', Validators.required]
      
    });

  	this.question = [
	   {

	     correct_answer: 'A directive is a custom HTML element that is used to extend the power of HTML.',
	     question: 'Which of the following is correct about Angular 2 Directive?',
	     answers: ['A directive is a custom HTML element that is used to extend the power of HTML', 'A directive can be used to import the functionality from other Angular JS modules','Both of the above','None of the above'],
	     id: 0
	   },
	   {
	     correct_answer: 'Both of the above.',
	     question: 'Which of the following is correct about Angular 2 Routing ?',
	     answers: ['Routing helps in directing users to different pages based on the option they choose on the main page.', 'Based on the option they choose, the required Angular Component will be rendered to the user','None of the above','Both of the above'],
	     id: 1
	   },
	   {
	    correct_answer: 'This file contains the system files required for Angular JS application.',
	     question: 'Which of the following is correct about systemjs.config.json?',
	     answers: ['This file contains the system files required for Angular JS application.', 'This file is used to give the options about TypeScript used for the Angular JS project','This file contains information about Angular 2 project','All of the above'],
	     id: 2
	   },
	   {
	    correct_answer: 'Structural directive',
	     question: 'Which of the following filter is used to convert input to all uppercase?',
	     answers: ['upper', 'uppercase','Both of the above.','None of the above.'],
	     id: 3
	   },
	   {
	    correct_answer: 'currency',
	     question: 'Which of the following filter is used to convert an input string to currency format.',
	     answers: ['amount', 'Both of the above.','currency','None of the above.'],
	     id: 4
	   },
	   {
	    correct_answer: 'Angular 2 Module is used to break up the application into logical pieces of code.',
	     question: 'Which of the following is true?',
	     answers: ['Angular 2 Service is used to break up the application into logical pieces of code.', 'Angular 2 Template is used to break up the application into logical pieces of code.','None of the above.','Angular 2 Module is used to break up the application into logical pieces of code.'],
	     id: 5
	   },
	   {
	     correct_answer: 'Angular 2 Component can be used to bring the modules together.',
	     question: 'Which of the following is true?',
	     answers: ['Angular 2 Template can be used to bring the modules together.', 'Angular 2 Service can be used to bring the modules together.','Angular 2 Component can be used to bring the modules together.','None of the above.'],
	     id: 6
	   }


	 ]; 

  }
   onChartClick(event) {
    console.log(event);
  }

  //Method which calls everyTime on choosing an option from the dropdown
  selectedOption(event,questionId){
  	var obj = {
  		'id': questionId,
  		'ans': event.target.value
  	}
  	this.answerList.push(obj);

  }

  correct_ans_count = 0;
  incorrect_ans_count = 0; 

  // Method for submit quiz
  onSubmitQuiz(){
  	if(this.answerList.length != this.question.length){
  		alert("Please Give All The Answers Before Submit");


  	}
  	else{


	  	var total = this.question.length * 0.5;
	  	for(var i=0;i< this.question.length;i++){
	  		if(this.answerList[i].id == this.question[i].id ){
	  			if(this.answerList[i].ans == this.question[i].correct_answer){
	  				this.correct_ans_count += 0.5;

	  			}

	  		}

	  	}
		
		$(".correct-chng").removeClass("d-none");
		this.answerList = [];  	
	  	this.incorrect_ans_count =  total - this.correct_ans_count;
	  	this.callChartJs();
	}
  }
  callChartJs(){
  	this.chartData = [
    {
      label: 'Quiz Result',
      data: [this.correct_ans_count,this.incorrect_ans_count] 
    }
    
  ];
  	


  }
  clearForm(){
  	this.answerList = [];
  	$(".correct-chng").addClass("d-none"); 
  	this.quizForm.reset();
  	this.quizForm.reset({
	  answer: ""
	 });
  	this.chartData = [
    {
      label: 'Quiz Result',
      data: [0,0] 
    }
    
  ];

  }


}

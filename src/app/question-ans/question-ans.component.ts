import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


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
	                max: 3,
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
    { // 1st Year.
      backgroundColor: 'rgba(77,83,96,0.2)'
    },
    { // 2nd Year.
      backgroundColor: 'rgba(30, 169, 224, 0.8)'
    }
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

	     correct_answer: 'front-end',
	     question: 'Angular is a framework made for :',
	     answers: ['front-end', 'back-end'],
	     id: 0
	   },
	   {
	     correct_answer: 'true',
	     question: 'Angular is not the same as AngularJS : ',
	     answers: ['true', 'false'],
	     id: 1
	   },
	   {
	    correct_answer: '@Output()',
	     question: 'In Angular, you can pass data from child component to parent component using : ',
	     answers: ['@Output()', '@Intput()'],
	     id: 2
	   },
	   {
	    correct_answer: 'Structural directive',
	     question: 'A directive which modifies DOM hierarchy is called : ',
	     answers: ['Structural directive', 'Attribute directive'],
	     id: 3
	   },
	   {
	    correct_answer: 'false',
	     question: 'Custom pipe can modify actual value of variable apart from different presention in HTML: ',
	     answers: ['true', 'false'],
	     id: 4
	   },
	   {
	    correct_answer: 'true',
	     question: 'Async Pipe subscribes to observer and update expression whenever there is data sent from observer: ',
	     answers: ['true', 'false'],
	     id: 4
	   },

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
  	var total = this.question.length * 0.5;
  	for(var i=0;i< this.question.length;i++){
  		if(this.answerList[i].id == this.question[i].id ){
  			if(this.answerList[i].ans == this.question[i].correct_answer){
  				this.correct_ans_count += 0.5;

  			}

  		}

  	}
  	this.incorrect_ans_count =  total - this.correct_ans_count;
  	this.callChartJs();
  	debugger




  }
  callChartJs(){
  	this.chartData = [
    {
      label: '1st Year',
      data: [this.correct_ans_count,this.incorrect_ans_count] 
    }
    
  ];
  	


  }
  clearForm(){
  	this.answerList = [];
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

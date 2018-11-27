import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts'
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { AppComponent } from './app.component';
import { QuestionAnsComponent } from './question-ans/question-ans.component';

@NgModule({
  declarations: [
    AppComponent,
    QuestionAnsComponent
  ],
  imports: [
    BrowserModule,
    ChartsModule,
    FormsModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

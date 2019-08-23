import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { FormComponent } from './form/form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports:      [ BrowserModule, FormsModule,NgbModule,ReactiveFormsModule,HttpClientModule],
  entryComponents: [FormComponent],
  declarations: [ AppComponent, HelloComponent, FormComponent ],
  bootstrap:    [ AppComponent ],
  providers: []
})
export class AppModule { }

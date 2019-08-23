import { Component , OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormComponent } from './form/form.component';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
  toggleDiv=[];
  index=0;
  submittedValues = [];

  constructor(private modalService: NgbModal) {}
  ngOnInit(){
    
  }
  clickHandler(){
    const modalRef=this.modalService.open(FormComponent);
    modalRef.componentInstance.id = 10;
    modalRef.result.then((result) => {
      this.submittedValues.push(result);
      this.toggleDiv[this.index++] = 'true';
    }).catch((error) => {
    console.log(error);
    });
  }

  toggleHandler(i) {
    this.toggleDiv[i] = !this.toggleDiv[i];
  }
}

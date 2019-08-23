import { Component, Output, EventEmitter, Input, OnInit , ViewChild, ElementRef} from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  @Input()id: number;
  @ViewChild('updateForm',{static: false})phoneExtension:ElementRef;
  coordinates = {
    latitude: 0,
    longitude: 0
  };
  country;
  countryExtension;
  url;
  ngOnInit(){
    this.fetchLocation();
  }

  fetchLocation(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: Position) => {
        if (position) {
          this.coordinates.latitude = position.coords.latitude;
          this.coordinates.longitude = position.coords.longitude;
          this.url = "https://api.geonames.org/countryCodeJSON?lat="+this.coordinates.latitude+"&lng="+this.coordinates.longitude+"&username=demo";
          //replace the just below json path to this.url to get the results calling api
          this.http.get('../../assets/location.json',{responseType: 'json'}).subscribe((data)=> {
            this.country = data["countryName"];
            this.http.get('../../assets/country_codes.json',{responseType: 'json'}).subscribe((data) => {
              data.forEach((element) => {
                if(element.name === this.country) {
                  this.countryExtension = element.dial_code;
                }
                });
                this.phoneExtension.nativeElement.value = this.countryExtension
            }
            )
          });
        }
      },
        (error: PositionError) => console.log(error));
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }
  myForm: FormGroup;
  constructor(
   public activeModal: NgbActiveModal,
   private formBuilder: FormBuilder,
   private http: HttpClient
  ) {
    this.createForm();
  }
  private createForm() {
    this.myForm = this.formBuilder.group({
      name:['',Validators.required],
      email:['',Validators.required],
      phoneExtension:this.countryExtension,
      phoneNumber:['',Validators.required],
      comapny:'',
      role:'',
      address:'',
      salary:['',Validators.pattern("^[0-9]*$")]
    });
  }
  private submitForm() {
    this.activeModal.close(this.myForm.value);
  }
}
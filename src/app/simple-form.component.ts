import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from './title.model';
import { TitleService } from './title.service';

@Component({
  selector: 'simple-form',
  templateUrl: './simple-form.component.html',
  styleUrls: ['./simple-form.component.css']
})
export class SimpleFormComponent {

  titles: Title[];

  form: FormGroup = new FormGroup({
    title: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    acceptTerms: new FormControl('')
  });

  disabled = true;
  
  submitted = false;

  constructor(private service: TitleService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.getTitles();

    this.form = this.formBuilder.group({
      title: [''],
      firstName: [''],
      lastName: ['', Validators.required],
      acceptTerms: ['']
    });

    this.form.controls['title'].setValue( 
      this.titles.find(title => title.isDefault).name, {onlySelf: true}
    );
  }

  public getTitles() : void {    
      this.service.getTitles()
          .subscribe(titles => this.titles = titles)
  }

  isChecked(){
    const isChecked = this.form.get("acceptTerms").value;
    if (isChecked) {                         
      this.disabled = false;
    } 
    else {
      this.disabled = true;
    }
  }

  onSubmit() {
    this.submitted = true;

    if (!this.form.invalid) {
      console.log(this.form.value);
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { Title } from './title.model';
import { TitleService } from './title.service';

@Component({
  selector: 'simple-form',
  templateUrl: './simple-form.component.html',
  styleUrls: ['./simple-form.component.css']
})
export class SimpleFormComponent implements OnInit {

  public titles: Title[];

  title: string = 'Dr';
  
  firstName: string;
  
  lastName: string;
  
  acceptTerms = false;

  constructor(private service: TitleService) {}

  ngOnInit() {
    this.getTitles();
  }

  public getTitles() : void {    
      this.service.getTitles()
          .subscribe(titles => this.titles = titles);
  }

  onSubmit(data) {
    console.log(data);
  }

}

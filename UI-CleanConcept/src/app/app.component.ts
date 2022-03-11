import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent  {
  @ViewChild('contentPage') contentPage: ElementRef;
  title = 'LearnWithMe';
  public isCollapsed = false;

  constructor(private http: HttpClient,private titleService: Title)
  {
    this.titleService.setTitle(this.title);
  }

  loadPageContent(data)
  {
    this.contentPage.nativeElement.innerHTML=data;
  }
 
  
}

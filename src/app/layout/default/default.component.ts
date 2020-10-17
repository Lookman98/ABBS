import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HostListener } from '@angular/core';


@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {


  sideBarOpen = true;
  constructor(private router: Router) { }

  ngOnInit(): void {

    
  }


  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    console.log('Back button pressed');
  }

  sideBarToggler(){
    this.sideBarOpen  = !this.sideBarOpen;
  }

}

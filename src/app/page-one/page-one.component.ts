import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-page-one',
  templateUrl: './page-one.component.html',
  styleUrls: ['./page-one.component.css']
})
export class PageOneComponent implements OnInit, OnDestroy {

  private firstObsListener: Subscription;

  constructor() { }

  ngOnInit() {
    this.firstObsListener = interval(1000).subscribe((count) => {
      console.log(count);
    })
  }

  ngOnDestroy() {
    this.firstObsListener.unsubscribe();
  }

}


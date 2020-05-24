import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-page-one',
  templateUrl: './page-one.component.html',
  styleUrls: ['./page-one.component.css']
})
export class PageOneComponent implements OnInit, OnDestroy {
  customObservable;
  private firstObsListener: Subscription;

  constructor() { }

  ngOnInit() {
    // this.firstObsListener = interval(1000).subscribe((count) => {
    //   console.log(count);
    // })

    /* Creating a custom Observable */
    this.customObservable = Observable.create(observer=>{
      let count = 0
      setInterval(()=>{
        observer.next(count)
        count++;
      },1000)
    });
    this.firstObsListener = this.customObservable.subscribe(data=>{
      console.log(data);
    })
  }

  ngOnDestroy() {
    this.firstObsListener.unsubscribe();
  }

}


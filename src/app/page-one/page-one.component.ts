import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { AppService } from '../app.service'

@Component({
  selector: 'app-page-one',
  templateUrl: './page-one.component.html',
  styleUrls: ['./page-one.component.css']
})
export class PageOneComponent implements OnInit, OnDestroy {
  customObservable;
  private firstObsListener: Subscription;

  constructor(private user:AppService) { }

  ngOnInit() {
    // this.firstObsListener = interval(1000).subscribe((count) => {
    //   console.log(count);
    // })

    /* Creating a custom Observable */
    this.customObservable = Observable.create(observer=>{
      let count = 0

      setInterval(()=>{
        observer.next(count)
        if(count === 2) observer.complete();
        if (count > 3) {
          observer.error(new Error("Error occured!"));
        }
        count++;
      },1000)
    });

    

    this.firstObsListener = this.customObservable.pipe(filter(data => {
      return data > 0;
    }), map(data => {
      return "round "+ (data);
    }))
    .subscribe(data=>{
      console.log(data);
    },(err)=>{
      console.log(err);
    },()=>{
      console.log("process completed")
    })
  }

  onActivate(){
    this.user.activatedEmitter.next(true)
  }

  ngOnDestroy() {
    this.firstObsListener.unsubscribe();
  }

}


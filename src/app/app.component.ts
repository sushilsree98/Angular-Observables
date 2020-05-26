import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppService } from './app.service';
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'observables';
  _isActivated = false;
  eventObs:Subscription

  constructor(private user:AppService){

  }

  ngOnInit(){
    this.eventObs = this.user.activatedEmitter.subscribe(data=>{
      this._isActivated = data;
    })
  }

  ngOnDestroy(){
    this.eventObs.unsubscribe();
  }

}

import { Component, OnInit } from '@angular/core';
import {interval} from "rxjs";

@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.css']
})
export class StopwatchComponent implements OnInit {

  private tick$ = interval(1000);
  private hour: number | null = null;
  private min: number | null = null;
  private sec: number | null = null;
  private subscribtion: any;

  constructor() {

  }

  ngOnInit(): void {
    this.subscribtion = this.tick$.subscribe(value =>
      this.sec = value);
  }

  startTimer(){
    this.subscribtion = this.tick$.subscribe(value =>
      this.sec = value);
  }

  stopTimer(){
    this.subscribtion.unsubscribe();
  }

  waitTimer(){

  }

}

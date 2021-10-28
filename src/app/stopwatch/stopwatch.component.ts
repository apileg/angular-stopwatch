import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {fromEvent, interval} from "rxjs";
import {buffer, debounceTime, filter} from "rxjs/operators";

@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.css']
})
export class StopwatchComponent implements AfterViewInit {
  public seconds: number = 0;

  private readonly step: number = 1000;

  private tick$ = interval(this.step);
  private subscription: any;

  @ViewChild("waitButton")
  private waitButton!: ElementRef;

  constructor() {
  }

  startTimer() {
    this.subscription = this.tick$.subscribe(() => ++this.seconds);
  }

  stopAndResetTimer() {
    this.subscription.unsubscribe();
    this.seconds = 0;
  }

  onResetClick() {
    this.stopAndResetTimer();
    this.startTimer();
  }

  ngAfterViewInit(): void {
    const clicks$ = fromEvent(this.waitButton.nativeElement, 'click');

    const waitButtonClick$ =
      clicks$
        .pipe(
          buffer(clicks$.pipe(debounceTime(300))),
          filter(clickArray => clickArray.length > 1)
    );

    waitButtonClick$.subscribe(() => this.subscription.unsubscribe());
  }
}

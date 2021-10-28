import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {asyncScheduler, fromEvent, interval, Observable, Subscription} from "rxjs";
import {buffer, debounceTime, filter, throttleTime} from "rxjs/operators";

@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.scss']
})
export class StopwatchComponent implements AfterViewInit {

  @ViewChild("waitButton", {read: ElementRef}) waitButton!: ElementRef;

  private step: number = 1000;
  private tick$: Observable<number> = interval(this.step);
  private subscription!: Subscription;

  public seconds: number = 0;

  constructor() {
  }

  public startTimer(): void {
    this.subscription = this.tick$.subscribe(() => ++this.seconds);
  }

  public stopAndResetTimer(): void {
    this.subscription.unsubscribe();
    this.seconds = 0;
  }

  public onResetClick(): void {
    this.stopAndResetTimer();
    this.startTimer();
  }

  ngAfterViewInit(): void {
    const clicks$ = fromEvent(this.waitButton.nativeElement, 'click');

    const waitButtonClick$ =
      clicks$
        .pipe(
          buffer(clicks$.pipe(throttleTime(300, asyncScheduler, { trailing: true }))),
          filter(clickArray => clickArray.length > 1)
        );

    waitButtonClick$.subscribe(() => this.subscription.unsubscribe());
  }
}

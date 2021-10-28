import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StopwatchComponent} from "./stopwatch.component";
import {RouterModule, Routes} from "@angular/router";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule} from "@angular/forms";

const routes: Routes = [
  {
    path: '',
    component: StopwatchComponent,
  }
]

@NgModule({
  declarations: [StopwatchComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatInputModule,
    MatButtonModule,
    FormsModule,
  ]
})
export class StopwatchModule { }

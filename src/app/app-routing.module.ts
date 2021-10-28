import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {
    path: 'stopwatch',
    loadChildren: () => import('./stopwatch/stopwatch.module').then(m => m.StopwatchModule),
  },
  {
    path: '',
    redirectTo: 'stopwatch',
    pathMatch: 'full',
  },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ]
})
export class AppRoutingModule { }

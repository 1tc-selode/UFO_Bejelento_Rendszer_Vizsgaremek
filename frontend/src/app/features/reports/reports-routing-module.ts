import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReportListComponent } from './report-list/report-list';
import { ReportDetailComponent } from './report-detail/report-detail';
import { ReportFormComponent } from './report-form/report-form';

const routes: Routes = [
  { path: '', component: ReportListComponent },
  { path: 'new', component: ReportFormComponent },
  { path: 'edit/:id', component: ReportFormComponent },
  { path: ':id', component: ReportDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }

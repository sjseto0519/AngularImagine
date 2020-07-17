import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DialogBodyComponent } from './dialog-body/dialog-body.component';
import { DialogJsonComponent } from './dialog-json/dialog-json.component';
import { DialogInfoComponent } from './dialog-info/dialog-info.component';

const routes: Routes = [
  {
    path: 'confirm-component',
    component: DialogBodyComponent,
    data: {}
  },
  {
    path: 'confirm-json-component',
    component: DialogJsonComponent,
    data: {}
  },
  {
    path: 'confirm-info-component',
    component: DialogInfoComponent,
    data: {}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  entryComponents: [DialogBodyComponent, DialogJsonComponent, DialogInfoComponent]
})
export class AppRoutingModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatButtonModule } from "@angular/material";
import { DialogBodyComponent } from './dialog-body/dialog-body.component';
import { DialogJsonComponent } from './dialog-json/dialog-json.component';
import { DialogLoginComponent } from './dialog-login/dialog-login.component';
import { DialogInfoComponent } from './dialog-info/dialog-info.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OpacityHoverDirective } from './Directives/opacity-hover.directive';
import { TooltipDirective } from './Directives/tooltip.directive';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CustomInterceptor } from './Interceptors/CustomInterceptor';

@NgModule({
  declarations: [
    AppComponent,
    DialogBodyComponent,
    DialogJsonComponent,
    DialogLoginComponent,
    DialogInfoComponent,
    OpacityHoverDirective,
    TooltipDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  exports: [ DialogBodyComponent, DialogJsonComponent, DialogLoginComponent, DialogInfoComponent ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomInterceptor,
      multi: true
    }
],
  bootstrap: [AppComponent],
  entryComponents: [DialogBodyComponent, DialogJsonComponent, DialogLoginComponent, DialogInfoComponent]
})
export class AppModule { }

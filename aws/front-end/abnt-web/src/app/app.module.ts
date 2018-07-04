import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { FileUploadComponent } from './file-upload/file-upload.component';

import { FileUploadService } from './file-upload/file-upload.service';
import { RulesComponent } from './rules/rules.component'
import { ROUTES } from './app.routes'

@NgModule({
  declarations: [
    AppComponent,
    FileUploadComponent,
    RulesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [FileUploadService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';

import {CustomInputComponent} from './components/custom-input/custom-input.component';
import {CustomRadioComponent} from './components/custom-radio/custom-radio.component';
import {FormControlErrorMessagePipe} from '../../pipes/form-control-error-message.pipe';

@NgModule({
  declarations: [
    CustomInputComponent,
    CustomRadioComponent,
    FormControlErrorMessagePipe
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    MatButtonModule
  ],
  exports: [
    CustomInputComponent,
    CustomRadioComponent,
    FormControlErrorMessagePipe
  ],
  providers: [],
  bootstrap: []
})
export class SharedModule {
}
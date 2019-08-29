import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material';
import {MatRadioModule} from '@angular/material/radio';
import {MatListModule} from '@angular/material';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material';
import {MatButtonModule} from '@angular/material/button';

import {CustomInputComponent} from './components/custom-input/custom-input.component';
import {CustomRadioComponent} from './components/custom-radio/custom-radio.component';
import {CustomDatepickerComponent} from './components/custom-datepicker/custom-datepicker.component';
import {CustomSelectComponent} from './components/custom-select/custom-select.component';
import {CustomCounterComponent} from './components/custom-counter/custom-counter.component';
import {FormControlErrorMessagePipe} from '../../pipes/form-control-error-message.pipe';

@NgModule({
  declarations: [
    CustomInputComponent,
    CustomRadioComponent,
    CustomDatepickerComponent,
    CustomSelectComponent,
    CustomCounterComponent,
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
    MatListModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [
    CustomInputComponent,
    CustomRadioComponent,
    CustomDatepickerComponent,
    CustomSelectComponent,
    CustomCounterComponent,
    FormControlErrorMessagePipe
  ],
  providers: [],
  bootstrap: []
})
export class SharedModule {
}

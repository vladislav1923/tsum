import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from './modules/shared/shared.module';
import {StoreModule} from '@ngrx/store';

import {reducers, metaReducers} from './store/reducers';

import {AppComponent} from './app.component';
import {FormStepComponent} from './components/form-step/form-step.component';
import {SuccessStepComponent} from './components/success-step/success-step.component';

@NgModule({
  declarations: [
    AppComponent,
    FormStepComponent,
    SuccessStepComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forRoot(reducers, { metaReducers })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

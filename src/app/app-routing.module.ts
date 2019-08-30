import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {StepSuccessActivateGuard} from './guards/step-success-activate.guard';
import {FormStepComponent} from './components/form-step/form-step.component';
import {SuccessStepComponent} from './components/success-step/success-step.component';

const routes: Routes = [
  {path: 'form', component: FormStepComponent},
  {path: 'success', component: SuccessStepComponent, canActivate: [StepSuccessActivateGuard]},
  {path: '**', redirectTo: 'form'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [StepSuccessActivateGuard]
})
export class AppRoutingModule {
}

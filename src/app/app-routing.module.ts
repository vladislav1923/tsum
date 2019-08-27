import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FormStepComponent} from './components/form-step/form-step.component';
import {SuccessStepComponent} from './components/success-step/success-step.component';


const routes: Routes = [
  {path: 'form', component: FormStepComponent},
  {path: 'success', component: SuccessStepComponent},
  {path: '**', redirectTo: 'form'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

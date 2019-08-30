import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import * as fromRoot from '../store/reducers';
import {first} from 'rxjs/operators';


@Injectable({providedIn: 'root'})
export class StepSuccessActivateGuard implements CanActivate {

  private readonly router: Router;
  private readonly userStore: Store<fromRoot.State>;

  constructor(router: Router, userStore: Store<fromRoot.State>) {
    this.router = router;
    this.userStore = userStore;
  }

  public async canActivate(): Promise<boolean> {
    const result = await this.userStore.select(fromRoot.getDataStatus).pipe(first()).toPromise();
    if (!result) {
      this.router.navigate(['form']);

      return false;
    }

    return true;
  }

}

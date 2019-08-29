import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../store/reducers';
import {UserDataModel} from '../../models/user-data.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-success-step',
  templateUrl: './success-step.component.html',
  styleUrls: ['./success-step.component.less']
})
export class SuccessStepComponent implements OnInit, OnDestroy {

  public userData = new UserDataModel();

  private $dataStatus: Subscription;
  private $userData: Subscription;
  private readonly router: Router;
  private readonly userStore: Store<fromRoot.State>;

  constructor(router: Router,
              userStore: Store<fromRoot.State>) {
    this.router = router;
    this.userStore = userStore;
  }

  public ngOnInit(): void {
    this.$dataStatus = this.userStore.select(fromRoot.getDataStatus).subscribe((status: boolean) => {
      if (!status) {
        this.router.navigate(['form']);
      }
    });

    this.$userData = this.userStore.select(fromRoot.getUserData).subscribe((data: UserDataModel) => {
      this.userData = data;
    });
  }

  public ngOnDestroy(): void {
    this.$dataStatus.unsubscribe();
    this.$userData.unsubscribe();
  }

}

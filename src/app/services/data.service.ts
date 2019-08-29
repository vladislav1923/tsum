import {Injectable} from '@angular/core';
import {UserDataModel} from '../models/user-data.model';

@Injectable({providedIn: 'root'})
export class DataService {

  private data: UserDataModel;

  public sendData(data: UserDataModel): void {
    this.data = data;
  }

}

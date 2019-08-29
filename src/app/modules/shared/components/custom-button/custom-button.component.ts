import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'custom-button',
  templateUrl: './custom-button.component.html',
  styleUrls: ['./custom-button.component.less']
})
export class CustomButtonComponent {

  @Output()
  public onClick: EventEmitter<void> = new EventEmitter();

}

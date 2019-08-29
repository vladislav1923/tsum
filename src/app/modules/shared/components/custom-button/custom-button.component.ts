import {Component, EventEmitter, Output, Input} from '@angular/core';

@Component({
  selector: 'custom-button',
  templateUrl: './custom-button.component.html',
  styleUrls: ['./custom-button.component.less']
})
export class CustomButtonComponent {

  @Input()
  public disabled = false;

  @Output()
  public onClick: EventEmitter<void> = new EventEmitter();

}

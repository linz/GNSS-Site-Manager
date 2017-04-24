import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'textarea-input',
  templateUrl: 'textarea-input.component.html',
  styleUrls: ['form-input.component.css']
})
export class TextAreaInputComponent {
  @Input() model: string = '';
  @Input() index: string = '0';
  @Input() name: string = '';
  @Input() public label: string = '';
  @Input() public required: boolean = false;
  @Input() public rows: string = '';
  @Input() public minlength: string = '';
  @Input() public maxlength: string = '';

  configurationObject: any = null;

  /* Output an event when the value in the field changes */
  @Output() modelChange = new EventEmitter();
  change(newValue:string) {
    this.model = newValue;
    this.modelChange.emit(newValue);
  }
}

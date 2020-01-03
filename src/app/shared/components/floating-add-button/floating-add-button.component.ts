import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-floating-add-button',
  templateUrl: './floating-add-button.component.html',
  styleUrls: ['./floating-add-button.component.scss']
})
export class FloatingAddButtonComponent implements OnInit {

  @Input() text: string;
  @Output() onClick = new EventEmitter();

  constructor() { }

  /* Lifecycle Hooks */
  ngOnInit() {
  }

  /* Public Methods */
  add() {
    this.onClick.emit();
  }
}

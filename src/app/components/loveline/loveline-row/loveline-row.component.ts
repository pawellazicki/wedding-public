import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loveline-row',
  templateUrl: './loveline-row.component.html',
  styleUrls: ['./loveline-row.component.scss']
})
export class LovelineRowComponent implements OnInit {

  @Input()
  isRight = false
  @Input()
  isFirst = false

  constructor() { }

  ngOnInit(): void {
  }

}

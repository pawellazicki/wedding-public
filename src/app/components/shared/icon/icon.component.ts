import { Component, Input, OnInit } from '@angular/core';

export enum ICON_TYPE {
  WEDDING_PAIR
}

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit {
  ICON_TYPE: typeof ICON_TYPE = ICON_TYPE

  @Input()
  icon?: ICON_TYPE

  constructor() { }

  ngOnInit(): void {
  }

}

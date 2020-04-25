import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnChanges {
  @Input() noBg: boolean;

  constructor() { }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.noBg) {
      window.onscroll = () => {
        // console.log(window.scrollY);
        if (window.scrollY >= 240) {
          $('#toolbar').removeClass('no-bg');
        } else {
          $('#toolbar').addClass('no-bg');
        }
      };
    }
  }

  toggleMenu(id: string) {
    $(id).slideToggle('fast');
  }

}

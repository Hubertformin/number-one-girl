import { Component, OnInit } from '@angular/core';
import Plyr from 'plyr';
import { DashjsPlyrDriver } from './driver/player.driver';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  options: Plyr.Options = {
    captions: { active: true, update: true, language: 'en' },
  };

  poster = 'https://bitdash-a.akamaihd.net/content/sintel/poster.png';

  sources: Plyr.Source[] = [{
    type: 'video',
    src: 'https://bitmovin-a.akamaihd.net/content/sintel/sintel.mpd',
  }];

  dashjsDriver1 = new DashjsPlyrDriver(true);

  dashjsDriver2 = new DashjsPlyrDriver(false);

  constructor() { }

  ngOnInit() {
  }

  played() {
    this.dashjsDriver2.load('https://bitmovin-a.akamaihd.net/content/sintel/sintel.mpd');
  }

}

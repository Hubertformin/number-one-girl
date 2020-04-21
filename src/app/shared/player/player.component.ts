import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import Plyr from 'plyr';
import { DashjsPlyrDriver } from './driver/player.driver';
import { EpisodesModel } from '../../models/episodes.model';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit, OnChanges {

  constructor() { }
  @Input() video: EpisodesModel;

  options: Plyr.Options = {
    captions: { active: false, update: true, language: 'en' },
  };

  poster = 'https://res.cloudinary.com/thinkinary/image/upload/v1585152691/vdrmtkaxkalke9gesour.jpg';

  sources: Plyr.Source[];

  dashjsDriver1 = new DashjsPlyrDriver(true);

  dashjsDriver2 = new DashjsPlyrDriver(false);

  ngOnChanges(changes: SimpleChanges): void {
    // this.sources = [{
    //   type: 'video',
    //   src: this.video.url
    // }];
    // console.log(this.video.url);
  }

  ngOnInit() {
    this.sources = [{
      type: 'video',
      src: this.video.url
    }];
  }

  played() {
    this.dashjsDriver2.load(this.video.url);
  }

}

import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../providers/seo.service';

@Component({
  selector: 'app-episodes',
  templateUrl: './episodes.component.html',
  styleUrls: ['./episodes.component.scss']
})
export class EpisodesComponent implements OnInit {

  constructor(private seo: SeoService) { }

  ngOnInit(): void {
    this.seo.setSeoTags('Episodes', 'Watch episodes of number one girl');
  }

}

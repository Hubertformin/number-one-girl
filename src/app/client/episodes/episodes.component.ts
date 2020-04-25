import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../providers/seo.service';
import { EpisodesModel } from '../../models/episodes.model';
import { DbService } from '../../providers/db.service';

@Component({
  selector: 'app-episodes',
  templateUrl: './episodes.component.html',
  styleUrls: ['./episodes.component.scss']
})
export class EpisodesComponent implements OnInit {
  episodes: EpisodesModel[];

  constructor(private seo: SeoService, private db: DbService) { }

  ngOnInit(): void {
    this.seo.setSeoTags('Episodes', 'Watch episodes of number one girl');
    // get episodes
    this.db.getEpisodes()
      .subscribe(episodes => this.episodes = episodes);
  }

}

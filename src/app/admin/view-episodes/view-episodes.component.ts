import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../providers/seo.service';
import { DbService } from '../../providers/db.service';
import { EpisodesModel } from '../../models/episodes.model';

@Component({
  selector: 'app-view-episodes',
  templateUrl: './view-episodes.component.html',
  styleUrls: ['./view-episodes.component.scss']
})
export class ViewEpisodesComponent implements OnInit {
  episodes: EpisodesModel[];
  STATIC_THUMB = 'assets/images/icons/icons8_video_96px_1.png';

  constructor(private seo: SeoService, private db: DbService) { }

  ngOnInit(): void {
    this.seo.setAdminTitle('View episodes');
    // get episodes
    this.db.getEpisodes()
      .subscribe(episodes => {
        this.episodes = episodes;
      });
  }

}

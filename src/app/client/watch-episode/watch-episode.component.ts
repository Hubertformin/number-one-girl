import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../providers/seo.service';
import { ActivatedRoute } from '@angular/router';
import { EpisodesModel } from '../../models/episodes.model';

@Component({
  selector: 'app-watch-episode',
  templateUrl: './watch-episode.component.html',
  styleUrls: ['./watch-episode.component.scss']
})
export class WatchEpisodeComponent implements OnInit {
  episode: EpisodesModel;

  constructor(private seo: SeoService, private route: ActivatedRoute) {
    this.route.data
      .subscribe((data: {episode: EpisodesModel}) => {
        this.episode = data.episode;
        console.log(this.episode);
        this.seo.setSeoTags(
          `Watch Season ${this.episode.seasonNumber}: E${this.episode.episodeNumber} - ${this.episode.title}`,
          this.episode.description
          );
      });
  }

  ngOnInit(): void {
  }

}

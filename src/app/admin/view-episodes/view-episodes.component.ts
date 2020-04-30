import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../providers/seo.service';
import { DbService } from '../../providers/db.service';
import { EpisodesModel } from '../../models/episodes.model';
import { ToastService } from '../../providers/toast.service';
import { IsLoadingService } from '@service-work/is-loading';

@Component({
  selector: 'app-view-episodes',
  templateUrl: './view-episodes.component.html',
  styleUrls: ['./view-episodes.component.scss']
})
export class ViewEpisodesComponent implements OnInit {
  episodes: EpisodesModel[];
  STATIC_THUMB = 'assets/images/icons/icons8_video_96px_1.png';

  constructor(private seo: SeoService,
              private db: DbService,
              private toast: ToastService,
              private isLoading: IsLoadingService
  ) { }

  ngOnInit(): void {
    this.seo.setAdminTitle('View episodes');
    // get episodes
    this.db.getEpisodes()
      .subscribe(episodes => {
        this.episodes = episodes;
      });
  }
  /*
  * Delete episodes
  * */
  delete(episode: EpisodesModel) {
    if (confirm('Are you sure to delete?')) {
      this.isLoading.add();
      // delete episode
      this.db.deleteEpisode(episode)
        .then(() => {})
        .catch((err) => {
          console.error(err);
          this.toast.notify('Unable to delete, Try again later');
        })
        .finally(() => {
          this.isLoading.remove();
        });
    }
  }

}

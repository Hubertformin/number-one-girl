import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../providers/seo.service';
import { EpisodesModel } from '../../models/episodes.model';
import { ContestantModel } from '../../models/contestant.model';
import { ActivatedRoute } from '@angular/router';
import { SettingsModel } from '../../models/settings.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  episodes: EpisodesModel[];
  contestants: ContestantModel[] = [];
  settings: SettingsModel;

  constructor(private seoService: SeoService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.seoService.setSeoTags('Home', 'First original 100% cameroonian reality TV show');
    // get settings data
    this.route.data
      .subscribe((data: {settings: SettingsModel}) => {
      this.settings = data.settings;
    });
  }

}

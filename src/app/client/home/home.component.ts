import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../providers/seo.service';
import { EpisodesModel } from '../../models/episodes.model';
import { ContestantModel } from '../../models/contestant.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  episodes: EpisodesModel[];
  contestants: ContestantModel[] = [];

  constructor(private seoService: SeoService) { }

  ngOnInit(): void {
    this.seoService.setSeoTags('Home', 'First original 100% cameroonian reality TV show');
  }

}

import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../providers/seo.service';
import { DbService } from '../../providers/db.service';
import { ContestantModel } from '../../models/contestant.model';

@Component({
  selector: 'app-view-contestants',
  templateUrl: './view-contestants.component.html',
  styleUrls: ['./view-contestants.component.scss']
})
export class ViewContestantsComponent implements OnInit {
  contestants: ContestantModel[];

  constructor(private seo: SeoService, private db: DbService) { }

  ngOnInit(): void {
    this.db.getContestants()
      .subscribe(contestants => {
        this.contestants = contestants;
      });
  }

}

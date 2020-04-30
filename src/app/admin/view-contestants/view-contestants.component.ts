import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../providers/seo.service';
import { DbService } from '../../providers/db.service';
import { ContestantModel } from '../../models/contestant.model';
import { Observable } from 'rxjs';
import { IsLoadingService } from '@service-work/is-loading';
import { ToastService } from '../../providers/toast.service';

@Component({
  selector: 'app-view-contestants',
  templateUrl: './view-contestants.component.html',
  styleUrls: ['./view-contestants.component.scss']
})
export class ViewContestantsComponent implements OnInit {
  contestants: ContestantModel[];
  isLoading$: Observable<boolean>;

  constructor(private seo: SeoService,
              private db: DbService,
              private toast: ToastService,
              private isLoading: IsLoadingService
  ) {
    this.isLoading$ = this.isLoading.isLoading$();
  }

  ngOnInit(): void {
    this.db.getContestants()
      .subscribe(contestants => {
        this.contestants = contestants;
      });
  }
  /*
  * Delete contestant
  * */
  /*delete request*/
  deleteRequest(id: string) {
    if (confirm('Are you sure to delete?')) {
      this.isLoading.add();
      this.db.deleteContestantRequest(id)
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

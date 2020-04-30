import { Component, OnInit } from '@angular/core';
import { ContestantModel } from '../../models/contestant.model';
import { SeoService } from '../../providers/seo.service';
import { DbService } from '../../providers/db.service';
import { IsLoadingService } from '@service-work/is-loading';
import { Observable } from 'rxjs';
import { ToastService } from '../../providers/toast.service';

@Component({
  selector: 'app-contestants-request',
  templateUrl: './contestants-request.component.html',
  styleUrls: ['./contestants-request.component.scss']
})
export class ContestantsRequestComponent implements OnInit {
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
    this.db.getContestantRequest()
      .subscribe(contestants => {
        this.contestants = contestants;
      });
  }
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

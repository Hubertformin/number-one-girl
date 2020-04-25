import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VoteContestantComponent } from '../vote-contestant/vote-contestant.component';
import { SeoService } from '../../providers/seo.service';

@Component({
  selector: 'app-contestants',
  templateUrl: './contestants.component.html',
  styleUrls: ['./contestants.component.scss']
})
export class ContestantsComponent implements OnInit {

  constructor(public dialog: MatDialog, public seo: SeoService) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(VoteContestantComponent, {
      width: '250px',
      data: {name: 'nome'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngOnInit(): void {
    this.seo.setSeoTags('Contestants', 'Number One girl contestants');
  }
}

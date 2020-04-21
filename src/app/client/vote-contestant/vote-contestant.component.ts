import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-vote-contestant',
  templateUrl: './vote-contestant.component.html',
  styleUrls: ['./vote-contestant.component.scss']
})
export class VoteContestantComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<VoteContestantComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {contestant: any}) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

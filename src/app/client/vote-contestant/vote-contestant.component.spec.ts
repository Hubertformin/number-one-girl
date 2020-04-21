import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteContestantComponent } from './vote-contestant.component';

describe('VoteContestantComponent', () => {
  let component: VoteContestantComponent;
  let fixture: ComponentFixture<VoteContestantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoteContestantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoteContestantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

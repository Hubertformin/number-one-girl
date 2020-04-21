import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddContestantComponent } from './add-contestant.component';

describe('AddContestantComponent', () => {
  let component: AddContestantComponent;
  let fixture: ComponentFixture<AddContestantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddContestantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddContestantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

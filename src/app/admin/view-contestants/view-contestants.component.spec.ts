import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewContestantsComponent } from './view-contestants.component';

describe('ViewContestantsComponent', () => {
  let component: ViewContestantsComponent;
  let fixture: ComponentFixture<ViewContestantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewContestantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewContestantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

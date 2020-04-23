import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestantsRequestComponent } from './contestants-request.component';

describe('ContestantsRequestComponent', () => {
  let component: ContestantsRequestComponent;
  let fixture: ComponentFixture<ContestantsRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContestantsRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContestantsRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

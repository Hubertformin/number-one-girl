import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchEpisodeComponent } from './watch-episode.component';

describe('WatchEpisodeComponent', () => {
  let component: WatchEpisodeComponent;
  let fixture: ComponentFixture<WatchEpisodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WatchEpisodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchEpisodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

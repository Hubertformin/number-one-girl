import { Component, Inject, OnInit, Optional, PLATFORM_ID } from '@angular/core';
import { RESPONSE } from '@nguniversal/express-engine/tokens';
import { Response } from 'express';
import { isPlatformServer } from '@angular/common';
import { SeoService } from '../../providers/seo.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  constructor(@Inject(PLATFORM_ID) private readonly platformId: any, @Optional() @Inject(RESPONSE) res: Response,
              private seo: SeoService) {
    // `res` is the express response, only available on the server
    if (isPlatformServer(this.platformId)) {
      res.status(404);
    }
  }

  ngOnInit(): void {
    this.seo.setTitle('Page Not Found');
  }

}

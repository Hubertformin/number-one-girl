import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../providers/seo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private seoService: SeoService) { }

  ngOnInit(): void {
    this.seoService.setSeoTags('Home', 'numberonegirl.tv page');
  }

}

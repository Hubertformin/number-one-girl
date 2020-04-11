import { Injectable } from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(private titleService: Title, private meta: Meta) { }
  /**
   * @method setTitle
   * @description set page's title
   */
  setTitle(title: string) {
    this.titleService.setTitle(`${title} - ${environment.appName}`);
  }
  /**
   * @method setAdminTitle
   * @description set title for admin pages
   */
  setAdminTitle(title: string) {
    this.titleService.setTitle(`(Admin) ${title} - ${environment.appName}`);
  }
  /**
   * @method setSeoTags
   * @description set title and meta data.
   */
  setSeoTags(title, description, keywords = '') {
    this.titleService.setTitle(`${title} - ${environment.appName}`);
    this.meta.updateTag({name: 'keywords', content: keywords}, 'name=\'keywords\'');
    this.meta.updateTag({name: 'description', content: description}, 'name=\'description\'');
  }
}

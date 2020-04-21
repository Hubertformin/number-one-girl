import { Pipe, PipeTransform } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Pipe({
  name: 'objectUrl'
})
export class ObjectUrlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: any): any {
    // console.log(this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(value)));
    return typeof value === 'string' ? value : this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(value));
  }

}

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  loader = new Subject<boolean>();
  private counter = 0;

  constructor(private logger: LoggerService) {}

  public showLoader() {
    if (this.counter === 0) {
      this.loader.next(true);
    }
    this.counter++;
    this.logger.log('show loader');
  }

  public hideLoader() {
    if (this.counter > 0) {
      this.counter--;
    }

    if (this.counter === 0) {
      this.loader.next(false);
    }
    this.logger.log('hide loader');
  }
}

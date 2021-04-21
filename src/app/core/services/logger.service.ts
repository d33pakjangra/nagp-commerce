import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  private isDebugMode = environment.isDebugMode;

  constructor() {}

  public info(...args: any[]) {
    if (this.isDebugMode) {
      return console.info(...args);
    }
  }

  public warn(...args: any[]) {
    if (this.isDebugMode) {
      return console.warn(...args);
    }
  }

  public error(...args: any[]) {
    return console.error(...args);
  }

  public log(...args: any[]) {
    if (this.isDebugMode) {
      return console.log(...args);
    }
  }
}

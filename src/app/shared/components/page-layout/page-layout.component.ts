import { Component, OnInit } from '@angular/core';
import { RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';
import { LoaderService } from 'src/app/core/services/loader.service';

@Component({
  selector: 'app-page-layout',
  templateUrl: './page-layout.component.html',
  styleUrls: ['./page-layout.component.scss'],
})
export class PageLayoutComponent implements OnInit {
  constructor(private readonly router: Router, private readonly loader: LoaderService) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof RouteConfigLoadStart) {
        this.loader.showLoader();
      } else if (event instanceof RouteConfigLoadEnd) {
        this.loader.hideLoader();
      }
    });
  }
}

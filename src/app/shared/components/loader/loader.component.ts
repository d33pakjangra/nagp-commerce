import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { LoaderService } from 'src/app/core/services/loader.service';

@UntilDestroy()
@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
  show = false;

  constructor(private readonly loaderService: LoaderService) {}

  ngOnInit() {
    this.subscribeLoader();
  }

  subscribeLoader(): void {
    this.loaderService.loader.pipe(untilDestroyed(this)).subscribe((state) => {
      this.show = state;
    });
  }
}

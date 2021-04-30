import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { PageLayoutComponent } from './components/page-layout/page-layout.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ElevationDirective } from './directives/elevation.directive';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import { NumberOnlyDirective } from './directives/number-only.directive';
@NgModule({
  declarations: [HeaderComponent, PageLayoutComponent, ElevationDirective, NumberOnlyDirective, ConfirmationModalComponent],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule, RouterModule, TranslateModule],
  entryComponents: [],
  exports: [
    MaterialModule,
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule,
    ElevationDirective,
    NumberOnlyDirective,
    ConfirmationModalComponent,
  ],
})
export class SharedModule {}

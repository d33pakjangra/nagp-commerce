import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PageLayoutComponent } from './components/page-layout/page-layout.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ElevationDirective } from './directives/elevation.directive';
@NgModule({
  declarations: [HeaderComponent, FooterComponent, PageLayoutComponent, ElevationDirective],
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
  ],
})
export class SharedModule {}

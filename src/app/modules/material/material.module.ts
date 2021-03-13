import { NgModule } from '@angular/core';
import { CdkTableModule } from '@angular/cdk/table';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { MatTreeModule } from '@angular/material/tree';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule,} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [],
  imports: [
    CdkTableModule,
    MatTreeModule,
    MatIconModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    DragDropModule
  ],
  exports: [
    CdkTableModule,
    MatTreeModule,
    MatIconModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    DragDropModule
  ]
})
export class MaterialModule { }

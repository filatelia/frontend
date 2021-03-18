import { NgModule } from '@angular/core';
import { CdkTableModule } from '@angular/cdk/table';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { MatTreeModule } from '@angular/material/tree';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule,} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [],
  imports: [
    CdkTableModule,
    MatTreeModule,
    MatIconModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    DragDropModule,
    MatTableModule,
    MatPaginatorModule
  ],
  exports: [
    CdkTableModule,
    MatTreeModule,
    MatIconModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    DragDropModule,
    MatTableModule,
    MatPaginatorModule
  ]
})
export class MaterialModule { }

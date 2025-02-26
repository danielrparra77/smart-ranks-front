import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatChipsModule } from '@angular/material/chips';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        MatCardModule,
        FormsModule,
        MatInputModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatTableModule,
        MatStepperModule,
        MatIconModule,
        MatSelectModule,
        MatListModule,
        MatDividerModule,
        MatProgressSpinnerModule,
        MatGridListModule,
        MatChipsModule,
        MatToolbarModule,
    ],
    exports: [
        CommonModule,
        MatCardModule,
        FormsModule,
        MatInputModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatTableModule,
        MatStepperModule,
        MatIconModule,
        MatSelectModule,
        MatListModule,
        MatDividerModule,
        MatProgressSpinnerModule,
        MatGridListModule,
        MatChipsModule,
        MatToolbarModule,
    ]
  })
  export class CommonFrontModule { }
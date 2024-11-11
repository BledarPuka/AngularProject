import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-emmpty-state',
  standalone: true,
  imports: [ CommonModule,ProgressSpinnerModule],
  templateUrl: './emmpty-state.component.html',
  styleUrl: './emmpty-state.component.css',
})
export class EmmptyStateComponent {
  @Input() message: string = '';

 protected apiService=inject(ApiService)
}

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-emmpty-state',
  standalone: true,
  imports: [],
  templateUrl: './emmpty-state.component.html',
  styleUrl: './emmpty-state.component.css',
})
export class EmmptyStateComponent {
  @Input() message: string = '';
}

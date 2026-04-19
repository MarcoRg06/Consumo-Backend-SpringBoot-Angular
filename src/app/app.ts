import { Component } from '@angular/core';
import { AlumnosPageComponent } from './pages/alumnos-page/alumnos-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AlumnosPageComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}

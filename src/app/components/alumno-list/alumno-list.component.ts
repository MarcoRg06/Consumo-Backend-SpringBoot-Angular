import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Alumno } from '../../models/alumno.model';

@Component({
  selector: 'app-alumno-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alumno-list.component.html',
  styleUrl: './alumno-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlumnoListComponent {
  alumnos = input<Alumno[]>([]);
  alumnoEditado = output<Alumno>();
  alumnoEliminado = output<number>();

  /**
   * Emite evento para editar un alumno
   */
  editar(alumno: Alumno): void {
    this.alumnoEditado.emit(alumno);
  }

  /**
   * Emite evento para eliminar un alumno
   */
  eliminar(id: number | undefined): void {
    if (id !== undefined) {
      if (confirm('¿Estás seguro de que deseas eliminar este alumno?')) {
        this.alumnoEliminado.emit(id);
      }
    }
  }

  /**
   * Obtiene el nombre completo del alumno
   */
  getNombreCompleto(alumno: Alumno): string {
    return `${alumno.nombre} ${alumno.apellido}`;
  }
}

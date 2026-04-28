import { Component, ChangeDetectionStrategy, signal, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlumnoService } from '../../services/alumno.service';
import { AlumnoFormComponent } from '../../components/alumno-form/alumno-form.component';
import { AlumnoListComponent } from '../../components/alumno-list/alumno-list.component';
import { Alumno } from '../../models/alumno.model';

@Component({
  selector: 'app-alumnos-page',
  standalone: true,
  imports: [CommonModule, AlumnoFormComponent, AlumnoListComponent],
  templateUrl: './alumnos-page.component.html',
  styleUrl: './alumnos-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlumnosPageComponent {
  @ViewChild(AlumnoFormComponent) formularioComponent!: AlumnoFormComponent;
  @ViewChild('formularioSection') formularioSection!: ElementRef;
  @ViewChild('listaSection') listaSection!: ElementRef;

  private alumnoService = new AlumnoService();

  alumnos = this.alumnoService.getAlumnos();
  estaEditando = signal(false);
  alumnoEnEdicion = signal<Alumno | null>(null);
  activeTab = signal<'form' | 'list'>('form');

  /**
   * Maneja el envío del formulario (agregar o actualizar)
   */
  onAlumnoGuardado(alumno: Alumno): void {
    if (this.estaEditando()) {
      if (alumno.id) {
        this.alumnoService.actualizarAlumno(alumno.id, alumno);
        this.mostrarNotificacion('Alumno actualizado correctamente');
      }
      this.cancelarEdicion();
    } else {
      this.alumnoService.guardarAlumno(alumno);
      this.mostrarNotificacion('Alumno agregado correctamente');
    }
  }

  /**
   * Inicia la edición de un alumno
   */
  onEditarAlumno(alumno: Alumno): void {
    this.estaEditando.set(true);
    this.alumnoEnEdicion.set(alumno);
    if (this.formularioComponent) {
      this.formularioComponent.cargarAlumno(alumno);
    }
    this.scrollAlFormulario();
  }

  /**
   * Elimina un alumno
   */
  onEliminarAlumno(id: number): void {
    this.alumnoService.eliminarAlumno(id);
    this.mostrarNotificacion('Alumno eliminado correctamente');
  }

  /**
   * Cancela la edición
   */
  cancelarEdicion(): void {
    this.estaEditando.set(false);
    this.alumnoEnEdicion.set(null);
    if (this.formularioComponent) {
      this.formularioComponent.resetearFormulario();
    }
  }

  /**
   * Muestra una notificación (puede reemplazarse con un toast service real)
   */
  private mostrarNotificacion(mensaje: string): void {
    console.log('✓', mensaje);
    // Aquí puedes integrar SweetAlert2 o un servicio de notificaciones
    // this.notificationService.showSuccess(mensaje);
  }

  /**
   * Desplaza la página al formulario
   */
  scrollAlFormulario(): void {
    this.activeTab.set('form');
    setTimeout(() => {
      if (this.formularioSection) {
        this.formularioSection.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }

  /**
   * Desplaza la página a la lista de alumnos
   */
  scrollAlLista(): void {
    this.activeTab.set('list');
    setTimeout(() => {
      if (this.listaSection) {
        this.listaSection.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }
}

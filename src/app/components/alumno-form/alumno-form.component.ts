import { Component, ChangeDetectionStrategy, signal, output, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Alumno } from '../../models/alumno.model';
import { validarTexto, validarTelefono, validarURL } from '../../utils/regex';

@Component({
  selector: 'app-alumno-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './alumno-form.component.html',
  styleUrl: './alumno-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlumnoFormComponent {
  private fb = new FormBuilder();

  formulario: FormGroup;
  estaEditando = input(false);
  alumnoEditado = output<Alumno>();

  errores = signal<{ [key: string]: string }>({});

  constructor() {
    this.formulario = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      carrera: ['', Validators.required],
      telefono: ['', Validators.required],
      imagenURL: ['']
    });
  }

  /**
   * Valida los campos del formulario
   */
  private esFormularioValido(): boolean {
    const erroresTemp: { [key: string]: string } = {};
    const { nombre, apellido, carrera, telefono, imagenURL } = this.formulario.value;

    if (!validarTexto(nombre)) {
      erroresTemp['nombre'] = 'El nombre debe tener entre 3 y 50 letras.';
    }
    if (!validarTexto(apellido)) {
      erroresTemp['apellido'] = 'El apellido debe tener entre 3 y 50 letras.';
    }
    if (!validarTexto(carrera)) {
      erroresTemp['carrera'] = 'La carrera contiene caracteres no válidos.';
    }
    if (!validarTelefono(telefono)) {
      erroresTemp['telefono'] = 'El teléfono debe ser de exactamente 10 dígitos.';
    }
    if (imagenURL && !validarURL(imagenURL)) {
      erroresTemp['imagenURL'] = 'Formato de URL no válido.';
    }

    this.errores.set(erroresTemp);
    return Object.keys(erroresTemp).length === 0;
  }

  /**
   * Maneja el envío del formulario
   */
  onSubmit(): void {
    if (this.esFormularioValido()) {
      const alumno: Alumno = this.formulario.value;
      this.alumnoEditado.emit(alumno);
      this.resetearFormulario();
    }
  }

  /**
   * Resetea el formulario
   */
  resetearFormulario(): void {
    this.formulario.reset();
    this.errores.set({});
  }

  /**
   * Carga un alumno en el formulario para edición
   */
  cargarAlumno(alumno: Alumno): void {
    this.formulario.patchValue(alumno);
  }

  /**
   * Obtiene el texto del botón dinámicamente
   */
  get textoBoton(): string {
    return this.estaEditando() ? 'Actualizar Alumno' : 'Agregar Alumno';
  }

  /**
   * Verifica si hay errores en un campo específico
   */
  tieneError(campo: string): boolean {
    return !!this.errores()[campo];
  }

  /**
   * Obtiene el mensaje de error para un campo
   */
  obtenerError(campo: string): string {
    return this.errores()[campo] || '';
  }
}

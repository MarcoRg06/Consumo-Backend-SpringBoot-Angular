import { Injectable, signal } from '@angular/core';
import { Alumno } from '../models/alumno.model';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {
  private alumnos = signal<Alumno[]>([
    {
      id: 1,
      nombre: 'Juan',
      apellido: 'Pérez García',
      carrera: 'Ingeniería en Sistemas',
      telefono: '1234567890',
      imagenURL: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Juan'
    },
    {
      id: 2,
      nombre: 'María',
      apellido: 'López Martínez',
      carrera: 'Administración de Empresas',
      telefono: '0987654321',
      imagenURL: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria'
    }
  ]);

  private nextId = 3;

  /**
   * Obtiene la lista de alumnos como signal
   */
  getAlumnos() {
    return this.alumnos.asReadonly();
  }

  /**
   * Obtiene un alumno por ID
   */
  obtenerAlumnoPorId(id: number): Alumno | undefined {
    return this.alumnos().find((alumno) => alumno.id === id);
  }

  /**
   * Guarda un nuevo alumno
   */
  guardarAlumno(alumno: Alumno): void {
    const nuevoAlumno: Alumno = {
      ...alumno,
      id: this.nextId++
    };
    this.alumnos.update((alumnos) => [...alumnos, nuevoAlumno]);
  }

  /**
   * Actualiza un alumno existente
   */
  actualizarAlumno(id: number, alumno: Alumno): void {
    this.alumnos.update((alumnos) =>
      alumnos.map((a) => (a.id === id ? { ...alumno, id } : a))
    );
  }

  /**
   * Elimina un alumno por ID
   */
  eliminarAlumno(id: number): void {
    this.alumnos.update((alumnos) => alumnos.filter((a) => a.id !== id));
  }
}

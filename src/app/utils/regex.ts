/**
 * Validación de texto (nombre, apellido, carrera)
 * Debe tener entre 3 y 50 caracteres, solo letras y espacios
 */
export function validarTexto(texto: string): boolean {
  if (!texto || typeof texto !== 'string') {
    return false;
  }
  const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,50}$/;
  return regex.test(texto.trim());
}

/**
 * Validación de teléfono
 * Debe tener exactamente 10 dígitos
 */
export function validarTelefono(telefono: string): boolean {
  if (!telefono || typeof telefono !== 'string') {
    return false;
  }
  const regex = /^\d{10}$/;
  return regex.test(telefono.trim());
}

/**
 * Validación de URL
 * Valida que sea una URL válida
 */
export function validarURL(url: string): boolean {
  if (!url || typeof url !== 'string') {
    return false;
  }
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

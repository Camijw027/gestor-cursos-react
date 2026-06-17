// Aquí definimos la estructura que debe tener cada curso en la app.
// Todo curso necesita obligatoriamente estos tres campos.
export type Curso = {
  id: number;        // identificador único, se genera automáticamente con Date.now()
  nombre: string;    // el nombre del curso que escribe el usuario
  completado: boolean; // indica si el curso está completado (true) o pendiente (false)
};

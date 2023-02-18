Uso de useRef, UseMemo y useCallback

## Enunciado

Crea una aplicación para buscar películas

API a usar:

- https://www.omdbapi.com/
- API_KEY: b9561dd9

// https://www.omdbapi.com/?apikey=b9561dd9&s=Avengers

Requerimientos:

✅ Necesita mostrar un input para buscar la película y un botón para buscar.
✅ Lista las películas y muestra el título, año y poster.
✅ Que el formulario funcione
✅ Haz que las películas se muestren en un grid responsive.
✅ Hacer el fetching de datos a la API

Primera iteración:

✅ Evitar que se haga la misma búsqueda dos veces seguidas.

- Haz que la búsqueda se haga automáticamente al escribir.
- Evita que se haga la búsqueda continuamente al escribir (debounce)


### Comandos de Git para manejo de ramas

1. **Crear una nueva rama (sin cambiar a ella)**
   git branch <nombre-de-la-rama>

   Crea una nueva rama, pero permanece en la rama actual.

2. **Listar ramas locales**
   git branch

   Muestra todas las ramas locales. La rama actual se marca con un asterisco (*).

3. **Listar ramas locales y remotas**
   git branch -a

   Lista tanto ramas locales como las del remoto.

4. **Eliminar una rama local**
   git branch -d <nombre-de-la-rama>

   Borra la rama local especificada, siempre que ya haya sido fusionada.

5. **Cambiar a otra rama**
   git checkout <nombre-de-la-rama>

   Cambia el HEAD y el área de trabajo a la rama indicada.

6. **Regresar a la rama anterior**
   git checkout -

   Vuelve a la rama visitada previamente. Muy útil para alternar entre dos ramas.


### Flujo de trabajo con Git
*Ramificación, Fusión y Sincronización con el Repositorio Principal*

1. **Crear y cambiar a una nueva rama**
   git checkout -b <nombre-de-la-rama>

   Crea y cambia inmediatamente a una nueva rama de desarrollo a partir de la rama actual (típicamente *main* o *master*).

2. **Descargar cambios del repositorio remoto**
   git fetch origin

   Descarga las últimas referencias y objetos del remoto (*origin*), pero sin fusionar automáticamente.

3. **Cambiar a la rama principal**
   git checkout main

   Cambia a la rama principal para prepararla para la actualización.

4. **Actualizar la rama principal**
   git pull origin main

   Actualiza la rama *main* local con la última versión del repositorio remoto. Combina *fetch* y *merge* en un solo paso.

5. **Regresar a la rama de trabajo**
   git checkout <nombre-de-la-rama>

   Vuelve a tu rama de desarrollo después de haber actualizado *main*.

6. **Fusionar cambios recientes de main a tu rama**
   git merge main

   Integra las novedades más recientes de *main* en tu rama de desarrollo.

7. **Cambiar a la rama principal para integrar el trabajo**
   git checkout main

   Vuelve a la rama principal una vez terminado el desarrollo en tu sub-rama.

8. **Fusionar tu rama de desarrollo a main**
   git merge <nombre-de-la-rama>

   Integra el código finalizado de tu rama de desarrollo a la rama principal.

### Flujo de trabajo con Git (Subir cambios y actualizar ramas)

1. **Descargar actualizaciones del remoto**
   git fetch origin

   Descarga las últimas referencias del repositorio remoto para verificar si hay actualizaciones.

2. **Actualizar tu rama de trabajo con la principal remota**
   git merge origin/main

   Integra en tu rama de trabajo los cambios más recientes de la rama principal (*main*) del remoto.
   *(Alternativa: si ya estás en `main`, usar `git pull origin main` y luego `git merge main` en tu sub-rama).*

3. **Preparar los cambios para commit**
   git add . 
   # o
   git add <archivo>

   Añade todos los archivos modificados o un archivo específico al área de staging.

4. **Registrar cambios en tu repositorio local**
   git commit -m "Descripción del cambio"

   Guarda los cambios en el historial local. La descripción debe ser clara y concisa.

5. **Subir cambios al remoto en tu rama**
   git push origin <nombre-de-la-rama>

   Envía tus commits al repositorio remoto en la rama de trabajo.

6. **Cambiar a la rama principal**
   git checkout main

   Pásate a la rama principal una vez que tu trabajo fue aprobado y fusionado en remoto.

7. **Actualizar la rama principal local**
   git pull origin main

   Descarga y fusiona los últimos cambios de la rama *main* remota, que ya contiene tu trabajo aprobado.

8. **(Opcional) Subir main al remoto**
   git push origin main

   Solo si realizaste un merge local en *main*. En la mayoría de los casos, no es necesario tras un `pull`.

**Crear componentes en algula**

ng generate component -nombre-
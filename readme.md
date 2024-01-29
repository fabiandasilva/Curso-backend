# Primera Entrega del Proyecto Final

Este proyecto representa la primera entrega del proyecto final, que se ejecuta en el servidor local en el puerto 8080.

## Endpoints

- **Obtener todos los productos:**
  - Método: GET
  - URL: [http://localhost:8080/api/products/](http://localhost:8080/api/products/)
  - Descripción: Permite obtener todos los productos cargados en la base de datos.

- **Agregar un nuevo producto:**
  - Método: POST
  - URL: [http://localhost:8080/static/index.html](http://localhost:8080/static/index.html) (también puedes probar con [http://localhost:8080/api/products/](http://localhost:8080/api/products/))
  - Descripción: Permite agregar un nuevo producto con los siguientes campos:
    - id: Número/String (generado automáticamente)
    - title: String
    - description: String
    - code: String
    - price: Número
    - status: Boolean (por defecto true)
    - stock: Número
    - category: String
    - thumbnails: Array de Strings (rutas de las imágenes)

- **Editar un producto:**
  - Método: PUT
  - URL: [http://localhost:8080/api/products/:pid](http://localhost:8080/api/products/:pid)
  - Descripción: Permite editar un producto existente utilizando el id proporcionado en la URL.

- **Eliminar un producto:**
  - Método: DELETE
  - URL: [http://localhost:8080/api/products/:pid](http://localhost:8080/api/products/:pid)
  - Descripción: Elimina el producto con el id proporcionado en la URL.

- **Crear un nuevo carrito:**
  - Método: POST
  - URL: [http://localhost:8080/api/carts/](http://localhost:8080/api/carts/)
  - Descripción: Crea un nuevo carrito con un id único y un array vacío para los productos.

- **Listar productos en un carrito:**
  - Método: GET
  - URL: [http://localhost:8080/api/carts/:cid](http://localhost:8080/api/carts/:cid)
  - Descripción: Lista los productos que pertenecen al carrito con el id proporcionado en la URL.

- **Agregar un producto al carrito:**
  - Método: POST
  - URL: [http://localhost:8080/api/carts/:cid/product/:pid](http://localhost:8080/api/carts/:cid/product/:pid)
  - Descripción: Agrega el producto con el id proporcionado al carrito especificado. Si el producto ya está en el carrito, incrementa la cantidad.

## Consignas

<details>
  <summary>Click para desplegar las consignas</summary>

  ### Productos
  - [✅] Desarrollar el servidor basado en Node.JS y express, que escuche en el puerto 8080 y disponga de dos grupos de rutas: /products y /carts. Dichos endpoints estarán implementados con el router de express, con las siguientes especificaciones:

  - [✅] Para el manejo de productos, el cual tendrá su router en /api/products/ , configurar las siguientes rutas:
    - [✅] La ruta raíz GET / deberá listar todos los productos de la base. (Incluyendo la limitación ?limit del desafío)
    - [✅] La ruta GET /:pid deberá traer solo el producto con el id proporcionado.

  - [✅] La ruta raíz POST / deberá agregar un nuevo producto con los campos:
    - id: Number/String (A tu elección, el id NO se manda desde body, se autogenera como lo hemos visto desde los primeros entregables, asegurando que NUNCA se repetirán los ids en el archivo).
    - title: String
    - description: String
    - code: String
    - price: Number
    - status: Boolean        
    - stock: Number
    - category: String
    - thumbnails: Array de Strings que contenga las rutas donde están almacenadas las imágenes referentes a dicho producto
      + Status es true por defecto.
      + Todos los campos son obligatorios, a excepción de thumbnails.

  - [✅] La ruta PUT /:pid deberá tomar un producto y actualizarlo por los campos enviados desde body. NUNCA se debe actualizar o eliminar el id al momento de hacer dicha actualización.

  - [✅] La ruta DELETE /:pid deberá eliminar el producto con el pid indicado.

  ### Carrito

  - [✅] Para el carrito, el cual tendrá su router en /api/carts/, configurar dos rutas:

  - [✅] La ruta raíz POST / deberá crear un nuevo carrito con la siguiente estructura:
    - [✅] Id: Number/String (A tu elección, de igual manera como con los productos, debes asegurar que nunca se dupliquen los ids y que este se autogenere).
    - [✅] products: Array que contendrá objetos que representen cada producto.

  - [✅] La ruta GET /:cid deberá listar los productos que pertenezcan al carrito con el parámetro cid proporcionados.

  - [✅] La ruta POST /:cid/product/:pid deberá agregar el producto al arreglo “products” del carrito seleccionado, agregándose como un objeto bajo el siguiente formato:
    - [✅] product: SÓLO DEBE CONTENER EL ID DEL PRODUCTO (Es crucial que no agregues el producto completo).
    - [✅] quantity: Debe contener el número de ejemplares de dicho producto. El producto, de momento, se agregará de uno en uno.
    - [✅] Además, si un producto ya existente intenta agregarse al producto, incrementar el campo quantity de dicho producto.

  - [✅] La persistencia de la información se implementará utilizando el file system, donde los archivos “productos.json” y “carrito.json” respaldan la información.
</details>

---
# Segunda práctica integradora & Proceso principal del servidor + Global & Child Process

<details>
  <summary>Ver consignas</summary>

### Práctica de integración sobre tu ecommerce

- [] Crear un modelo User el cual contará con los campos:

```
  {
    first_name:String,
    last_name:String,
    email:String (único)
    age:Number,
    password:String(Hash)
    cart:Id con referencia a Carts
    role:String(default:’user’)
    }
```

- [] Desarrollar las estrategias de Passport para que funcionen con este modelo de usuarios

-[] (Sólo para jwt) desarrollar una estrategia “current” para extraer la cookie que contiene el token para obtener el usuario asociado a dicho token, en caso de tener el token, devolver al usuario asociado al token, caso contrario devolver un error de passport, utilizar un extractor de cookie.

-[] Agregar al router /api/sessions/ la ruta /current, la cual utilizará el modelo de sesión que estés utilizando, para poder devolver en una respuesta el usuario actual.

</details>

---

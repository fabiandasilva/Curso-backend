const usersModel = require("../dao/models/users.model");
const { createHash, isValidPassword } = require("../utils/encrypt");

exports.greeting = async (req, res) => {
  const { name } = req.query;
  console.log("🚀 ~ file: session.routes.js:8 ~ router.get ~ name:", name);

  const counter = req.session?.counter;

  if (!counter) {
    req.session.counter = 1;
    req.session.user = name;
    req.session.admin = true;
    return res.send(`Bienvenido a la pagina, ${name} administrador`);
  }

  req.session.counter++;
  req.session.user = name;
  req.session.admin = true;
  return res.send(
    `visita numero ${req.session.counter} por el usuario ${name}`
  );
};

exports.register = async (req, res) => {
  try {
    const { first_name, last_name, email, age, password } = req.body;
    console.log("Contra del body ", password);

    if (!first_name || !last_name || !email || !age || !password) {
      return res.status(400).json({
        message: "Por favor, proporcione todos los campos necesarios.",
      });
    }
    const pswHased = await createHash(password);

    const addUser = {
      first_name,
      last_name,
      email,
      age,
      password: pswHased,
    };
    console.log("Contra encriptada ", pswHased);

    const newUser = await usersModel.create(addUser);

    if (!newUser) {
      return res.status(500).json({ message: "Error al registrar usuario" });
    }

    res.status(201).redirect("/login");
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    return res
      .status(500)
      .json({ message: "Error al registrar usuario", error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    const session = req.session;
    console.log(session);
    const findUser = await usersModel.findOne({ email }).lean();

    if (!findUser) {
      return res.status(401).json({ message: "Usuario no existe" });
    }

    const isValidComparePsw = await isValidPassword(
      password,
      findUser.password
    );

    if (!isValidComparePsw) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    let role = "usuario";
    if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
      role = "admin";
    }

    req.session.user = {
      ...findUser,
      password: undefined,
      role: role,
    };

    return res.redirect("/products");
  } catch (error) {
    console.error("Error al iniciar sesion:", error);
    return res.status(500).json({ message: "Error al iniciar sesion", error });
  }
};
exports.recoverPsw = async (req, res) => {
  try {
    const { email, new_password } = req.body;
    console.log(req.body);

    const newPswHashed = await createHash(new_password);
    const user = await usersModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Credenciales invalidas" });
    }

    const updateUser = await usersModel.findByIdAndUpdate(user._id, {
      password: newPswHashed,
    });

    if (!updateUser) {
      return res.json({ message: "Problemas al actualizar la contraseña" });
    }
    return res.redirect("/login");
  } catch (error) {
    console.error("Error crear la nueva contraseña:", error);
    return res
      .status(500)
      .json({ message: "Error crear la nueva contraseña", error });
  }
};

exports.private = async (req, res) => {
  try {
    return res.send(
      `Bienvenido a la pagina privada, ${req.session.user.username}`
    );
  } catch (error) {
    console.error("Error al acceder a la pagina privada:", error);
    return res
      .status(500)
      .json({ message: "Error al acceder a la pagina privada" });
  }
};
exports.logOut = async (req, res) => {
  const name = req.session.user?.user;
  console.log(name);
  try {
    req.session.destroy((err) => {
      if (!err) {
        return res.redirect("/login");
      }
      return res.send({ message: "Error al cerrar sesion", body: err });
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al cerrar sesion", body: error });
  }
};
 
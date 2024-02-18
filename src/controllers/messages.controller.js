const messagesModel = require("../dao/models/messages.model");

exports.sendMessage = async (req, res) => {
  const { user, message } = req.body;

  try {
    const newMessage = new messagesModel({ user, message });
    await newMessage.save();
    return res.status(201).json({
      message: "Mensaje enviado exitosamente",
    });
  } catch (error) {
    console.error("Error en la ruta POST:", error);
    return res.status(500).json({
      error: error.message,
    });
  }
};

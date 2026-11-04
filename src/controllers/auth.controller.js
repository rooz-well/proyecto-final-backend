import * as authService from "../services/auth.service.js";

// Iniciar sesión
const login = (req, res, next) => {
  try {
    const { email, password } = req.body;

    const token = authService.login({
      email,
      password,
    });

    res.status(200).json({
      mensaje: "Inicio de sesión exitoso.",
      token,
      tokenType: "Bearer",
    });
  } catch (error) {
    next(error);
  }
};

export { login };

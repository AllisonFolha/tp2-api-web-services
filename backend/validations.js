const { body, param } = require("express-validator");

exports.validateCreateUser = [
  body("nome_usuario")
    .notEmpty()
    .withMessage("O nome de usuário é obrigatório"),
  body("email")
    .isEmail()
    .withMessage("O email deve ser válido"),
];

exports.validateUpdateUser = [
  param("id")
    .isInt()
    .withMessage("O ID do usuário deve ser um número inteiro"),
  body("nome_usuario")
    .notEmpty()
    .withMessage("O nome de usuário é obrigatório"),
];
exports.validateCreatePlaylist = [
    body("usuarioId")
      .isInt()
      .withMessage("O ID do usuário deve ser um número inteiro")
      .notEmpty()
      .withMessage("O usuário é obrigatório"),
    body("musicaId")
      .isInt()
      .withMessage("O ID da música deve ser um número inteiro")
      .notEmpty()
      .withMessage("A música é obrigatória"),
  ];
  
  exports.validateCreateMusic = [
    body("artistaId")
      .isInt()
      .withMessage("O ID do artista deve ser um número inteiro")
      .notEmpty()
      .withMessage("O artista é obrigatório"),
  ];

const express = require("express");
const cors = require("cors");
const { validationResult, body, param } = require("express-validator");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 3000;

const {
  validateCreateUser,
  validateUpdateUser,
  // validateCreatePlaylist,
  // validateCreateMusic,
} = require('./validations');


app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Importando as validações

function lerArquivoJson(nomeArquivo) {
  const filePath = path.join(__dirname, nomeArquivo);
  try {
    const rawData = fs.readFileSync(filePath);
    return JSON.parse(rawData);
  } catch (error) {
    console.error(`Erro ao ler o arquivo ${nomeArquivo}:`, error.message);
    return [];
  }
}

// Função para escrever dados em um arquivo JSON
function escreverArquivoJson(nomeArquivo, dados) {
  const filePath = path.join(__dirname, nomeArquivo);
  fs.writeFileSync(filePath, JSON.stringify(dados, null, 2));
}

// Função para manipular erros com try-catch
function manipularErro(mensagem, res, error) {
  console.error(mensagem, error);
  res.status(500).json({ mensagem: "Erro interno do servidor" });
}

// Rota para obter todos os usuários
app.get("/usuarios", (req, res) => {
  try {
    const usuarios = lerArquivoJson("db.json");
    res.json(usuarios);
  } catch (error) {
    manipularErro("Erro ao obter usuários:", res, error);
  }
});

// Rota para obter um usuário específico
app.get("/usuarios/:id", (req, res) => {
  try {
    const usuarios = lerArquivoJson("db.json");
    const usuarioId = parseInt(req.params.id);
    const usuario = usuarios.find((u) => u.id === usuarioId);

    if (usuario) {
      res.json(usuario);
    } else {
      res.status(404).json({ mensagem: "Usuário não encontrado" });
    }
  } catch (error) {
    manipularErro("Erro ao obter usuário:", res, error);
  }
});

// Rota para criar um novo usuário
app.post("/usuarios", (req, res) => {
  try {
    const usuarios = lerArquivoJson("db.json");
    const novoUsuario = {
      id: usuarios.length + 1,
      nome_usuario: req.body.nome_usuario,
      email: req.body.email,
      playlists: [],
    };
    usuarios.push(novoUsuario);
    escreverArquivoJson("db.json", usuarios);
    res.status(201).json(novoUsuario);
  } catch (error) {
    manipularErro("Erro ao criar usuário:", res, error);
  }
});

// Rota para obter todos os usuários
app.get("/usuarios", (req, res) => {
  try {
    const usuarios = lerArquivoJson("db.json");
    res.json(usuarios);
  } catch (error) {
    console.error("Erro ao obter usuários:", error);
    res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
});

// Rota para obter um usuário específico
app.get("/usuarios/:id", (req, res) => {
  try {
    const usuarios = lerArquivoJson("db.json");
    console.log(usuarios);
    const usuarioId = parseInt(req.params.id);
    console.log("parseInt", usuarioId);
    const usuario = usuarios.find((u) => u.id === usuarioId);
    console.log("find", usuario);

    if (usuario) {
      res.json(usuario);
    } else {
      res.status(404).json({ mensagem: "Usuário não encontrado" });
    }
  } catch (error) {
    console.error("Erro ao obter usuário:", error);
    res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
});

// Rota para atualizar usuário
app.post("/usuarios", validateCreateUser, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const usuarios = lerArquivoJson("db.json");
    const novoUsuario = {
      id: usuarios.length + 1,
      nome_usuario: req.body.nome_usuario,
      email: req.body.email,
      playlists: [],
    };
    usuarios.push(novoUsuario);
    escreverArquivoJson("db.json", usuarios);
    res.status(201).json(novoUsuario);
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
});

app.put("/usuarios/:id", validateUpdateUser, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const usuarios = lerArquivoJson("db.json");
    const usuarioId = parseInt(req.params.id);
    const usuarioIndex = usuarios.findIndex((u) => u.id === usuarioId);

    if (usuarioIndex !== -1) {
      usuarios[usuarioIndex].nome_usuario = req.body.nome_usuario;
      escreverArquivoJson("db.json", usuarios);
      res.json({
        mensagem: "Usuário atualizado com sucesso",
        usuario: usuarios[usuarioIndex],
      });
    } else {
      res.status(404).json({ mensagem: "Usuário não encontrado" });
    }
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
});

app.delete("/usuarios/:id", (req, res) => {
  try {
    const usuarios = lerArquivoJson("db.json");
    const usuarioId = parseInt(req.params.id);
    const usuarioIndex = usuarios.findIndex((u) => u.id === usuarioId);

    if (usuarioIndex !== -1) {
      usuarios.splice(usuarioIndex, 1);
      escreverArquivoJson("db.json", usuarios);
      res.status(204).send();
    } else {
      res.status(404).json({ mensagem: "Usuário não encontrado" });
    }
  } catch (error) {
    console.error("Erro ao excluir usuário:", error);
    res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
});

//playlist

// Rota para obter detalhes de uma playlist específica
app.get("/playlists/:playlistId", (req, res) => {
  try {
    const playlists = lerArquivoJson("playlists.json");
    const playlistId = parseInt(req.params.playlistId);
    const playlist = playlists.find((p) => p.id === playlistId);

    if (playlist) {
      res.json(playlist);
    } else {
      res.status(404).json({ mensagem: "Playlist não encontrada" });
    }
  } catch (error) {
    manipularErro("Erro ao obter playlist:", res, error);
  }
});

// Rota para atualizar uma playlist existente
app.put("/playlists/:playlistId", (req, res) => {
  try {
    const playlists = lerArquivoJson("playlists.json");
    const playlistId = parseInt(req.params.playlistId);
    const playlistIndex = playlists.findIndex((p) => p.id === playlistId);

    if (playlistIndex !== -1) {
      // Verifica se o usuário existe antes de atualizar a playlist
      const usuarios = lerArquivoJson("usuarios.json");
      const usuarioId = parseInt(req.body.usuarioId);
      const usuarioExists = usuarios.some((u) => u.id === usuarioId);

      if (!usuarioExists) {
        return res.status(400).json({
          mensagem: "Usuário não encontrado para vincular à playlist",
        });
      }

      playlists[playlistIndex].titulo = req.body.titulo;
      playlists[playlistIndex].usuarioId = usuarioId; // Vincula o usuário à playlist
      escreverArquivoJson("playlists.json", playlists);
      res.json({
        mensagem: "Playlist atualizada com sucesso",
        playlist: playlists[playlistIndex],
      });
    } else {
      // Lógica para criar uma nova playlist, similar à atualização mas incluindo a criação de um novo registro
    }
  } catch (error) {
    manipularErro("Erro ao atualizar/criar playlist:", res, error);
  }
});

// Rota para excluir uma playlist
app.delete("/playlists/:playlistId", (req, res) => {
  try {
    const playlists = lerArquivoJson("playlists.json");
    const playlistId = parseInt(req.params.playlistId);
    const playlistIndex = playlists.findIndex((p) => p.id === playlistId);

    if (playlistIndex !== -1) {
      playlists.splice(playlistIndex, 1);
      escreverArquivoJson("playlists.json", playlists);
      res.status(204).send();
    } else {
      res.status(404).json({ mensagem: "Playlist não encontrada" });
    }
  } catch (error) {
    manipularErro("Erro ao excluir playlist:", res, error);
  }
});


//musicas:

// Rota para obter detalhes de uma música específica
app.get("/musicas/:musicaId", (req, res) => {
  try {
    const musicas = lerArquivoJson("musicas.json");
    const musicaId = parseInt(req.params.musicaId);
    const musica = musicas.find((m) => m.id === musicaId);

    if (musica) {
      res.json(musica);
    } else {
      res.status(404).json({ mensagem: "Música não encontrada" });
    }
  } catch (error) {
    manipularErro("Erro ao obter música:", res, error);
  }
});

// Rota para atualizar uma música existente
app.put("/musicas/:musicaId", (req, res) => {
  try {
    const musicas = lerArquivoJson("musicas.json");
    const musicaId = parseInt(req.params.musicaId);
    const musicaIndex = musicas.findIndex((m) => m.id === musicaId);

    if (musicaIndex !== -1) {
      musicas[musicaIndex].titulo = req.body.titulo;
      escreverArquivoJson("musicas.json", musicas);
      res.json({
        mensagem: "Música atualizada com sucesso",
        musica: musicas[musicaIndex],
      });
    } else {
      res.status(404).json({ mensagem: "Música não encontrada" });
    }
  } catch (error) {
    manipularErro("Erro ao atualizar música:", res, error);
  }
});

// Rota para excluir uma música
app.delete("/musicas/:musicaId", (req, res) => {
  try {
    const musicas = lerArquivoJson("musicas.json");
    const musicaId = parseInt(req.params.musicaId);
    const musicaIndex = musicas.findIndex((m) => m.id === musicaId);

    if (musicaIndex !== -1) {
      musicas.splice(musicaIndex, 1);
      escreverArquivoJson("musicas.json", musicas);
      res.status(204).send();
    } else {
      res.status(404).json({ mensagem: "Música não encontrada" });
    }
  } catch (error) {
    manipularErro("Erro ao excluir música:", res, error);
  }
});


//artistas:

// Rota para obter detalhes de um artista específico
app.get("/artistas/:artistaId", (req, res) => {
  try {
    const artistas = lerArquivoJson("artistas.json");
    const artistaId = parseInt(req.params.artistaId);
    const artista = artistas.find((a) => a.id === artistaId);

    if (artista) {
      res.json(artista);
    } else {
      res.status(404).json({ mensagem: "Artista não encontrado" });
    }
  } catch (error) {
    manipularErro("Erro ao obter artista:", res, error);
  }
});

// Rota para atualizar um artista existente
app.put("/artistas/:artistaId", (req, res) => {
  try {
    const artistas = lerArquivoJson("artistas.json");
    const artistaId = parseInt(req.params.artistaId);
    const artistaIndex = artistas.findIndex((a) => a.id === artistaId);

    if (artistaIndex !== -1) {
      artistas[artistaIndex].nome = req.body.nome;
      escreverArquivoJson("artistas.json", artistas);
      res.json({
        mensagem: "Artista atualizado com sucesso",
        artista: artistas[artistaIndex],
      });
    } else {
      res.status(404).json({ mensagem: "Artista não encontrado" });
    }
  } catch (error) {
    manipularErro("Erro ao atualizar artista:", res, error);
  }
});

// Rota para excluir um artista
app.delete("/artistas/:artistaId", (req, res) => {
  try {
    const artistas = lerArquivoJson("artistas.json");
    const artistaId = parseInt(req.params.artistaId);
    const artistaIndex = artistas.findIndex((a) => a.id === artistaId);

    if (artistaIndex !== -1) {
      artistas.splice(artistaIndex, 1);
      escreverArquivoJson("artistas.json", artistas);
      res.status(204).send();
    } else {
      res.status(404).json({ mensagem: "Artista não encontrado" });
    }
  } catch (error) {
    manipularErro("Erro ao excluir artista:", res, error);
  }
});


//fim

// Configuração swagger
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Plataforma de Streaming de Música API",
      version: "1.0.0",
      description:
        "Uma API para gerenciar músicas, playlists, artistas e usuários.",
    },
  },
  apis: ["openapi.yaml"],
};

const openapiSpecification = swaggerJsdoc(options);

app.use("/api-docs", swaggerUi.serve);
app.get("/api-docs", swaggerUi.setup(openapiSpecification));

// Rota de erro 404
app.use((req, res, next) => {
  res.status(404).json({ mensagem: "Rota não encontrada" });
});
// Tratamento de erros internos do servidor
app.use((err, req, res, next) => {
  console.error("Erro interno do servidor:", err);
  res.status(500).json({ mensagem: "Erro interno do servidor" });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

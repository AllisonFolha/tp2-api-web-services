import React from 'react';
import { Typography, List, ListItem, ListItemText, Divider } from '@mui/material';

const UserList = ({ users }) => {
  if (!users) {
    return <Typography variant="h6">Nenhum usuário encontrado.</Typography>;
  }

  return (
    <div>
      <Typography variant="h4">Detalhes do Usuário</Typography>
      <Typography variant="body1"><strong>ID:</strong> {users.usuario.id}</Typography>
      <Typography variant="body1"><strong>Nome de Usuário:</strong> {users.usuario.nome_usuario}</Typography>
      <Typography variant="body1"><strong>Email:</strong> {users.usuario.email}</Typography>

      <Typography variant="h4">Playlists do Usuário</Typography>
      {users.playlists.map(playlist => (
        <div key={playlist.id}>
          <Typography variant="h6">{playlist.usuario.titulo}</Typography>
          <List>
            {playlist.musicas.map(musica => (
              <div key={musica.id}>
                <ListItem>
                  <ListItemText primary={musica.titulo} secondary={`Artista: ${musica.artista}`} />
                </ListItem>
                <Divider />
              </div>
            ))}
          </List>
        </div>
      ))}
    </div>
  );
};

export default UserList;

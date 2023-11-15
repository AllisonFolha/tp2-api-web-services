import React, { useState, useEffect } from 'react';
import { Typography, List, ListItem, ListItemText, Divider, Paper } from '@mui/material';
import './UserListAll.css';

const UserDetails = ({ user }) => {
    return (
      <Paper elevation={3} className="user-details">
        <ListItem button>
          <ListItemText primary={<Typography className="user-details-item"><strong>ID:</strong> {user.id}</Typography>} />
          <ListItemText primary={<Typography className="user-details-item"><strong>Nome de Usuário:</strong> {user.nome_usuario}</Typography>} />
          <ListItemText primary={<Typography className="user-details-item"><strong>Email:</strong> {user.email}</Typography>} />
        </ListItem>
        <Divider className="user-details-divider" />
      </Paper>
    );
  };
  
  const UserListAll = () => {
    const [allUsers, setAllUsers] = useState([]);
  
    useEffect(() => {
      fetch('/usuarios')
        .then(response => response.json())
        .then(data => setAllUsers(data))
        .catch(error => console.error('Erro ao obter usuários:', error));
    }, []);
  
    return (
      <div className="user-list-container">
        <Typography variant="h4" className="user-list-header">Lista de Usuários</Typography>
        {allUsers.length === 0 ? (
          <Typography variant="h6">Nenhum usuário encontrado.</Typography>
        ) : (
          <List>
            {allUsers.map(user => (
              <UserDetails key={user.id} user={user} />
            ))}
          </List>
        )}
      </div>
    );
  };
export default UserListAll;

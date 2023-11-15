import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserList from './components/Userlist';

const App = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/usuarios');
        setUsers(response.data);
        console.log(response.data.usuarios); // Mostra os dados recebidos da API
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Meu App</h1>
      {users.length > 0 && <UserList users={users} />}
    </div>
  );
};

export default App;

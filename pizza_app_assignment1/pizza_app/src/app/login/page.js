'use client';
import { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper
} from '@mui/material';
import { useRouter } from 'next/navigation';

// adding search params within the brackets to avoid a hydration error
export default function LoginPage({ searchParams }) {

  const [username, setUsername] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    // check fields
    if (!username || !pass) {
      setError('All fields are required');
      return;
    }

    setError('');

    // login api
    const res = await fetch(`/api/getLogin?username=${username}&pass=${pass}`);
    const data = await res.json();

    // no user found
    if (data.length === 0) {
      setError("Username doesn't exist");
      return;
    }

    // save username
    localStorage.setItem("username", username);

    // go home with user param
    router.push(`/?user=${username}`);
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 10 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>

        <p>User Name :</p>
        <TextField
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <p>Password :</p>
        <TextField
          fullWidth
          type="password"
          margin="normal"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />

        {error && (
          <Typography color="error" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 3 }}
          onClick={handleLogin}
        >
          Login
        </Button>
      </Paper>
    </Container>
  );
}

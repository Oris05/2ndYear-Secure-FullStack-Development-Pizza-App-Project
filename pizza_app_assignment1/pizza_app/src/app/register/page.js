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

export default function RegisterPage() {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [pass, setPass] = useState('');
  const [firstname, setFirstname] = useState('');
  const [secondname, setSecondname] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    // Basic validation
    if (!username || !pass || !firstname || !secondname || !address) {
      setError("All fields are required");
      return;
    }

    setError("");

    // Check if username already exists
    const check = await fetch(`/api/getLogin?username=${username}&pass=${pass}`);
    const checkData = await check.json();

    if (checkData.length > 0) {
      setError("Username already exists");
      return;
    }

    // Register user
    const res = await fetch(
      `/api/getRegister?username=${username}
                           &pass=${pass}
                           &firstname=${firstname}
                           &secondname=${secondname}
                           &address=${address}`
    );

    const data = await res.json();

    if (data.data === "ok") {
      router.push("/login");   // redirect to login page
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 10 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Register
        </Typography>

        <p>Username:</p>
        <TextField
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <p>Password:</p>
        <TextField
          fullWidth
          type="password"
          margin="normal"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />

        <p>First Name:</p>
        <TextField
          fullWidth
          margin="normal"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />

        <p>Second Name:</p>
        <TextField
          fullWidth
          margin="normal"
          value={secondname}
          onChange={(e) => setSecondname(e.target.value)}
        />

        <p>Address:</p>
        <TextField
          fullWidth
          margin="normal"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
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
          onClick={handleRegister}
        >
          Register
        </Button>
      </Paper>
    </Container>
  );
}

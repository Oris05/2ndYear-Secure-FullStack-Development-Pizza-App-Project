'use client';
import * as React from 'react';
import {
  Button, Container, Typography, TextField, Box
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { green } from '@mui/material/colors';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const [data, setData] = useState(null);

  const [name, setName] = useState('');
  const [card, setCard] = useState('');
  const [cvv, setCvv] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();

  // load cart
  useEffect(() => {
    fetch('/api/getCart')
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const theme = createTheme({
    palette: {
      secondary: { main: green[500] },
    },
  });

  if (!data) return <p>Loading</p>;

  // total price
  const priceArray = data.map((item) => Number(item.price));
  const total = priceArray.reduce((sum, num) => sum + num, 0);

  const handlePurchase = async () => {
    // check fields
    if (!name || !card || !cvv) {
      setError('All fields are required');
      return;
    }

    setError('');

    const username = localStorage.getItem("username");

    // send cart items to orders
    await fetch("/api/getOrder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    // clear cart
    await fetch(`/api/removeFromCart?username=${username}`);

    router.push('/confirmation');
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <div style={{ fontSize: '40px' }}>Purchase Page</div>

        <div style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '20px' }}>
          Total: €{total}
        </div>

        <Box
          sx={{
            mt: 4,
            p: 3,
            backgroundColor: "#111",
            border: "1px solid #333",
            borderRadius: "8px",
            boxShadow: "0 0 10px rgba(0,0,0,0.4)",
          }}
        >
          <Typography variant="h6" sx={{ color: "#E0E0E0", mb: 2 }}>
            Payment Details
          </Typography>

          <TextField
            fullWidth
            label="Full Name"
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            InputLabelProps={{ style: { color: "#aaa" } }}
            InputProps={{ style: { color: "#fff" } }}
          />

          <TextField
            fullWidth
            label="Card Number"
            margin="normal"
            value={card}
            onChange={(e) => setCard(e.target.value)}
            InputLabelProps={{ style: { color: "#aaa" } }}
            InputProps={{ style: { color: "#fff" } }}
          />

          <TextField
            fullWidth
            label="CVV"
            margin="normal"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            InputLabelProps={{ style: { color: "#aaa" } }}
            InputProps={{ style: { color: "#fff" } }}
          />

          {error && (
            <Typography color="error" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}

          <Button
            variant="contained"
            sx={{ mt: 2, width: "100%" }}
            onClick={handlePurchase}
          >
            PAY NOW
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

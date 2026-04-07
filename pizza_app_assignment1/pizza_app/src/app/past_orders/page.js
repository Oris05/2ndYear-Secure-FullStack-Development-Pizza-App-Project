'use client';
import * as React from 'react';
import { Button, Container, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { green } from '@mui/material/colors';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function Page() {
  const [data, setData] = useState(null);
  const searchParams = useSearchParams();

  // get ?user=
  const username = searchParams.get("user");

  // load past orders
  const fetchOrders = () => {
    let url;

    if (username) {
      url = "/api/showPastOrders?user=" + username;
    } else {
      url = "/api/showPastOrders";
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data));
  };

  useEffect(() => {
    fetchOrders();
  }, [username]);

  if (!data) return <p>Loading</p>;

  // MUI theme
  const theme = createTheme({
    palette: {
      secondary: { main: green[500] },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <div style={{ fontSize: '40px', marginBottom: '20px' }}>
          PAST ORDERS
        </div>

        <div>
          {data.map((item) => (
            <div
              key={item._id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 10px',
                marginBottom: '12px',
                border: '1px solid #ccc',
                borderRadius: '8px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img
                  src={item.img}
                  style={{
                    width: '60px',
                    height: '60px',
                    objectFit: 'cover',
                    borderRadius: '6px'
                  }}
                />

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {item.item} {item.size}
                  </Typography>
                  <Typography variant="body2">€{item.price}</Typography>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </ThemeProvider>
  );
}

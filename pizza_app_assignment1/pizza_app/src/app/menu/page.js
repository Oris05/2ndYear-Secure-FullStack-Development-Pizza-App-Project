'use client';
import * as React from 'react';
import {
  Container, Typography, Link, Button, Card, CardActionArea,
  CardMedia, CardContent, Grid
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { green } from '@mui/material/colors';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function Page() {

  const searchParams = useSearchParams();
  const username = searchParams.get("user"); // fixed

  const [data, setData] = useState(null);

  // load products
  useEffect(() => {
    fetch('/api/getProducts')
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  if (!data) return <p>Loading</p>;

  // MUI theme
  const theme = createTheme({
    palette: {
      secondary: { main: green[500] },
    },
  });

  // product card
  const ProductCard = ({ item }) => (
    <Card sx={{ minWidth: 345, maxWidth: 345, height: 350, marginBottom: 3, backgroundColor: "#ababab" }}>
      <CardActionArea component={Link} href={`/viewSingleProduct?id=${item._id}`}>
        <CardMedia
          component="img"
          height="180"
          image={item.img}
          alt={item.pname}
        />
        <CardContent>
          <Typography gutterBottom variant="h6">
            {item.pname} €{item.basePrice}
          </Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {item.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );

  return (
    <ThemeProvider theme={theme}>

      {/* PIZZA */}
      <Container component="main" maxWidth="lg">
        <div className="banner"><h3>PIZZA</h3></div>

        <Grid container spacing={2}>
          {data.slice(0, 9).map((item, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <ProductCard item={item} />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* DRINKS */}
      <Container component="main" maxWidth="lg">
        <div className="banner"><h3>DRINKS</h3></div>

        <Grid container spacing={2}>
          {data.slice(9, 12).map((item, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <ProductCard item={item} />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* SIDES */}
      <Container component="main" maxWidth="lg">
        <div className="banner"><h3>SIDES</h3></div>

        <Grid container spacing={2}>
          {data.slice(12, 15).map((item, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <ProductCard item={item} />
            </Grid>
          ))}
        </Grid>
      </Container>

    </ThemeProvider>
  );
}

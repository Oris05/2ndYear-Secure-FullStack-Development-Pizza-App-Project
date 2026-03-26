'use client';
import * as React from 'react';
import {Container,Typography,Link,Button,Card,CardActionArea,CardMedia,CardContent} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { green } from '@mui/material/colors';
import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';

export default function Page() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/getProducts')
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  if (!data) return <p>Loading</p>;

  const theme = createTheme({
    palette: {
      secondary: {
        main: green[500],
      },
    },
  });

  

  const ProductCard = ({ item }) => (
    <Card sx={{ minWidth: 345,maxWidth: 345,height: 350, marginBottom: 3,backgroundColor: "#ababab" }}>
      <CardActionArea component={Link} href={`/viewSingleProduct?id=${item._id}`}>
        <CardMedia
        
          component="img"
          height="180"
          image={item.img}
          alt={item.pname}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {item.pname}       €{item.basePrice}
          </Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {item.description}
          </Typography>

          <Typography variant="body1" sx={{ marginTop: 1 }}>
            
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );

  return (


    <ThemeProvider theme={theme}>
<Container component="main" maxWidth="lg">
  <div id="intro"><h4>THE BEST PIZZA PLACE IN NAVAN! DELIVER ANYWHERE ANYTIME!</h4></div>
  <div className="banner"><h3>POPULAR</h3></div>

  <Grid container spacing={2}>
    {data.slice(0,3).map((item, i) => (
      <Grid item xs={12} sm={6} md={4} key={i}>
        <ProductCard item={item} />
      </Grid>
    ))}
  </Grid>
</Container>

<Container component="main" maxWidth="lg">
  <div className="banner"><h3>DEALS</h3></div>

  <Grid container spacing={2}>
    {data.slice(6,9).map((item, i) => (
      <Grid item xs={12} sm={6} md={4} key={i}>
        <ProductCard item={item} />
      </Grid>
    ))}
  </Grid>
</Container>

    </ThemeProvider>
  );
}

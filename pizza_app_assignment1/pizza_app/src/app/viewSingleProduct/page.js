'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box
} from '@mui/material';

export default function Page() {

  async function callTheAPI(url){
    const res = await fetch(url);
    const data = await res.json();
    console.log("API Call finished");
  }

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const storedUsername = typeof window !== "undefined"
    ? localStorage.getItem("username")
    : null;

  const [product, setProduct] = useState(null);
  const [size, setSize] = useState("small");

  const finalPrice = product
    ? product.basePrice + (size === "medium" ? 1 : size === "large" ? 2 : 0)
    : 0;

  const handleClick = () => {
    const url =
      "http://localhost:3000/api/addToCart" +
      "?item=" + product.pname +
      "&des=" + product.description +
      "&size=" + size +
      "&price=" + finalPrice +
      "&img=" + product.img +
      "&username=" + storedUsername;

    callTheAPI(url);
  };

  useEffect(() => {
    if (!id) return;

    fetch(`/api/getSingleProduct?id=${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data.item))
      .catch(console.error);

  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 5, }}>
      <Card className="product-card">

        <CardMedia
          component="img"
          image={product.img}
          alt={product.pname}
          className="product-img"
        />

        <CardContent className="product-content">

          <Typography variant="h4" className="product-title">
            {product.pname}
          </Typography>

          <Typography variant="h6" className="product-description">
            {product.description}
          </Typography>

          <Typography variant="h5" className="product-price">
            Base Price: {product.basePrice}€
          </Typography>

          {/* Size selector */}
          <Box className="size-box">
            <Typography variant="h5" className="size-title">
              Select Size:
            </Typography>

            <div className="size-row">
              <label>
                <input
                  type="radio"
                  value="small"
                  checked={size === "small"}
                  onChange={() => setSize("small")}
                />
                Small (+0€)
              </label>

              <label>
                <input
                  type="radio"
                  value="medium"
                  checked={size === "medium"}
                  onChange={() => setSize("medium")}
                />
                Medium (+1€)
              </label>

              <label>
                <input
                  type="radio"
                  value="large"
                  checked={size === "large"}
                  onChange={() => setSize("large")}
                />
                Large (+2€)
              </label>
            </div>
          </Box>

          <Typography variant="h4" className="final-price">
            Final Price: <strong>{finalPrice}€</strong>
          </Typography>

        </CardContent>

        <Box sx={{ backgroundColor:"#adadad",p: 3}}>
          <Button
            variant="contained"
            fullWidth
            className="order-btn"
            onClick={handleClick}
          >
            Order Now
          </Button>
        </Box>

      </Card>
    </Box>
  );
}

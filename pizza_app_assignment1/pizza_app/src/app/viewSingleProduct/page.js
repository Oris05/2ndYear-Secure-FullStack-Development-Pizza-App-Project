'use client';

import * as React from 'react';
import { useState, useEffect } from 'react'
import { useSearchParams } from "next/navigation";
import { TextField, Button, Box } from '@mui/material';

export default function Page() {
  // this performs the actual call to the back-end API page.
  // the URL variable is passed into this function from the handleClick() function
  async function callTheAPI(url){

      const res = await fetch(url);
      const data = await res.json();
      console.log("API Call finished");

  }
  const handleClick = (item,des,size,price,img) => {

    console.log("Sending to API:", item);

    // this is where we send data to the API back-end page
    // we are sending across the variable "item"
    // callTheAPI(`http://localhost:3000/api/addToCart?item=`+item+des+size+price+img)
    const url = 
      "http://localhost:3000/api/addToCart"+
      "?item="+item+
      "&des="+des+
      "&size="+size+
      "&price="+price+
      "&img="+img;

      callTheAPI(url);

  };
  // catch the ID from the URL

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  // this is where we store the product
  // when it is returned from the API.

  const [product, setProduct] = useState(null);


  // wait until the page is ready

  useEffect(() => {

    if (!id) return;

          // call the API to get the data for the single product
          // based on the ID passed to us.

    fetch(`/api/getSingleProduct?id=${id}`)

      .then((res) => res.json())

      .then((data) => {

        console.log(data);

                    // store the data so we can call it later.

        setProduct(data.item);

      })

      .catch(console.error);

  }, [id]);

  return (

    <div>

      <div>Product ID: {id}</div>

      {product ? (


        <div>
          <img src={product.img} /> 
            
          {product.description}
          
          <br></br>
         <p>Product name: {product.pname} </p>

         <p> Product price: {product.basePrice}</p>

        <Button
          variant="contained"
                            //+item+des+size+price+img
          onClick={() => handleClick(product.pname,
                                    product.description,
                                    product.sizes,
                                    product.basePrice,
                                    product.img
          )}
          sx={{ mt: 2 }}
        >
        Order Now
        </Button>

        </div>

      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
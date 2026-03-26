"use client";

import { useEffect, useState } from "react";

export default function NavClient() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("username");
    if (stored) setUsername(stored);
  }, []);

  return (
    <>
      <header>
        <h1>ORESTO PIZZERIA</h1>
        <nav>
          <ul>
            <li><a href={`/register?user=${username}`}>REGISTER | </a></li>
            <li><a href={`/login?user=${username}`}>LOGIN | </a></li>
            <li><a href={`/cart?user=${username}`}>CART</a></li>
          </ul>
        </nav>
      </header>

      <hr />

      <nav id="under_header_nav">
        <ul>
          <li><a href={`/?user=${username}`}>HOME</a></li>
          <li>|</li>
          <li><a href={`/menu?user=${username}`}>MENU</a></li>
        </ul>
      </nav>

      <hr />
    </>
  );
}

"use client";

import Image from "next/image";
import Card from "./components/Card";
import { fetchBooks } from "@/actions/useractions";
import Hero from "./components/Hero";
import { useEffect } from "react";

export default function Home() {

  useEffect(() => {
    document.title = "Home - RecomBook";
  }, [])
  

//  fetchBooks();
  return (
    <>
      <Hero />
      <Card />
    </>
  );
}
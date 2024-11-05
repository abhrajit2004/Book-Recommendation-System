import Image from "next/image";
import Carousel from "./components/Carousel";
import Card from "./components/Card";
import { fetchBooks } from "@/actions/useractions";
import Hero from "./components/Hero";

export default function Home() {

//  fetchBooks();
  return (
    <>
      <Hero />
      <Card />
    </>
  );
}

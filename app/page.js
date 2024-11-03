import Image from "next/image";
import Carousel from "./components/Carousel";
import Card from "./components/Card";
import { fetchBooks } from "@/actions/useractions";

export default function Home() {

//  fetchBooks();
  return (
    <>
      <Card />
      {/* <Carousel /> */}
    </>
  );
}

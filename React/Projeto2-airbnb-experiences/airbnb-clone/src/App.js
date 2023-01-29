import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Card from "./components/Card";
import Data from "./Data";
import './styles.css'

export default function App() {
  
 const elementData = Data.map ((elemento) => {
  return(
    <Card
    title = {elemento.title}
    price = {elemento.price}
    coverImg = {elemento.coverImg}
    rating = {elemento.stats.rating}
    reviewCount = {elemento.stats.reviewCount} 
    location = {elemento.location}
    />
  )})

  return(
    <div className="App">
      <Navbar />
      <Hero />
      <div className="containerCards">
        {elementData}
      </div>
    </div>
  );
}

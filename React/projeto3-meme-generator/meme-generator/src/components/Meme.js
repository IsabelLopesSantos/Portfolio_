import React from "react";
import memesData from "../memesData.js";
import { useState } from "react";

export default function Meme() {

 const [meme, setMeme] = useState ({
     topText: "",
     bottomText: "",
     randomImage: ""
 })

 const [allMemeImages, setAllMemeImages] = useState(memesData)

function getMemeImage () {

   const memesArray = allMemeImages.data.memes
   
   const randomNumber = Math.floor(Math.random()*memesArray.length)

   const url = memesArray[randomNumber].url

   setMeme( prevMeme => ({
       ...prevMeme,
       randomImage: url,
   }))

}

function handleChange (event) {
  const {name, value} = event.target

   setMeme(prevMeme => ({
        ...prevMeme,
        [name]:value
   }))

}
   

  return (
    <main>
      <div className="form">
        <input
          type="text"
          placeholder="Top text"
          className="form-input"
          name="topText"
          value={meme.topText}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Bottom text"
          className="form-input"
          name="bottomText"
          value={meme.bottomText}
          onChange={handleChange}
        />
        <button onClick={getMemeImage} className="form-button" >
          Get a new meme image 🖼
        </button>
      </div>
      
      <div className="meme">
        <img src={meme.randomImage} className="meme-image" alt="meme-imagem"/>
        <h2 className="meme-text top">{meme.topText}</h2>
        <h2 className="meme-text bottom">{meme.bottomText}</h2>
      </div>

    </main>
  )}
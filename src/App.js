import "./App.css";
import axios from "axios";
import { useState } from "react";

function App() {

  const [prompt,setPrompt] = useState("");
  const [image,setImage] = useState("");
  const [loading,setLoading] = useState(false);

  const generateImage = async () => {

    if(prompt.trim()===""){
      alert("Enter prompt");
      return;
    }

    try{

      setLoading(true);

      const response = await axios.post(
        "http://localhost:8080/api/images/generate",
        {
          prompt
        }
      );

      setImage(response.data.image);

    }
    catch(error){
      alert("Image generation failed");
    }
    finally{
      setLoading(false);
    }
  }

  return (
    <div className="app">

      <div className="glass">

        <h1>VisionForge AI</h1>

        <p className="subtitle">
          Transform ideas into stunning AI generated artwork
        </p>

        <textarea
          placeholder="Example: A futuristic AI robot standing in a neon cyberpunk city with cinematic lighting..."
          value={prompt}
          onChange={(e)=>setPrompt(e.target.value)}
        />

        <button onClick={generateImage}>
          Generate Image
        </button>

        {loading && (
          <div className="loading">
            Generating masterpiece...
          </div>
        )}

        {image && (
          <div className="image-container">
            <img src={image} alt="Generated AI Art"/>
          </div>
        )}

        <div className="footer">
          Powered by OpenAI Image Generation
        </div>

      </div>

    </div>
  );
}

export default App;
import { useEffect, useState } from 'react';
import './App.css';

import Counter from './Counter'

var myWorker = new Worker(new URL('./worker.js', import.meta.url));

async function loadImage(src) {
  // Load image
  const img = document.createElement('img');
  img.src = src;
  await new Promise(resolve => img.onload = resolve);
  // Make canvas same size as image
  const canvas = document.createElement('canvas');
  [canvas.width, canvas.height] = [img.width, img.height];
  // Draw image onto canvas
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);
  return ctx.getImageData(0, 0, img.width, img.height);
}

function App() {
  const [img, setImg] = useState({size: 0, blobURL: ''})
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    myWorker.onmessage = (e) => {
      setLoading(false)
      setImg({...e.data})
    }
  }, [])
  const onClick = async () => {
    setLoading(true)
    const image = await loadImage('PNG_transparency_demonstration_1.png')
    myWorker.postMessage(image);
  }
  return (
    <div className="App">
      <header className="App-header">
        {
          loading && 'loading'
        }
        <img src={img.blobURL} alt='' height={300} />
        <p>image size: {img.size / 1000 / 1000} MB</p>
        <button onClick={onClick}>start</button>
        <Counter />
      </header>
    </div>
  );
}

export default App;

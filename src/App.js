import React, { useState } from 'react'
import "./App.css"

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import useClipboard from "react-use-clipboard";


const App = () => {

  const [lang, setlang] = useState("en-IN");

  const handleLanguage = (event) => {
    setlang(event.target.value);
  }

  const startlisten = () => { SpeechRecognition.startListening({ continuous: true, language: lang }) }
  const stoplisten = () => { SpeechRecognition.stopListening(); }



  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition()

  const [isCopied, setCopied] = useClipboard(transcript);

  if (!browserSupportsSpeechRecognition) {
    return alert("browser not suppoting the app")
  }

  

  return (
    <>
      <div className='container'>
        
          <img className='title' src='./title.png' alt='img'></img>
       
        
        <h4>Speak to convert</h4>



        <div className='main-content' >

          <p>{transcript?transcript:"speak"}{listening?<span> . . .</span>:<span></span>}</p>
       
       
        </div>




        <div className='icons'>
          <p><i>Microphone:</i> {listening ? 'on' : 'off'}</p>
        <p><i>Language:</i> {lang}</p>

        <p><i>Copied:</i> {isCopied ? "Yes!" : "Nope!"}</p>

        </div>
        
        <div className='btn-box'>

          <button onClick={setCopied}>
            copy
          </button>

          <button onClick={startlisten}>start listening</button>
          <button onClick={stoplisten}>stop listening</button>
          <button onClick={resetTranscript}>clear</button>

          <select value={lang} onChange={handleLanguage}>
            <option value={"en-IN"}>English</option>
            <option value={"hi-IN"}>Hindi</option>
            <option value={"fr-FR"}>French</option>
            <option value={"es-ES"}>Spanish</option>
            <option value={"ru-RU"}>Russian</option>

          </select>

        </div>
      </div>
    </>
  )
}

export default App
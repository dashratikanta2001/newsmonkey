import './App.css';
import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App =()=> {
  const pageSize=12
  const apikey = process.env.REACT_APP_NEWS_API3
  const [Mode, setMode] = useState('light')

  const toggleMode = () => {
    if (Mode ==='light') {
      setMode('dark');
      document.body.style.backgroundColor='#202124';
      // showAlert("Dark mode has been enabled","success");
      // document.title="Textutils - Dark Mode";
    }
    else{
      setMode('light');
      document.body.style.backgroundColor='white';
      // showAlert("Light mode has been enabled","success");
      // document.title="Textutils - Light Mode";

    }
  }
  const [progress, setProgress] = useState(0)

    return (
      <div>
        <Router>
        <LoadingBar
        color='#f11946'
        progress={progress}
      />
        <Navbar mode = {Mode} toggleMode= {toggleMode}/>
        <Routes>
          <Route exact path="/" element={<News mode = {Mode} setProgress={setProgress} apiKey={apikey} key="general-home" pageSize={pageSize} country="in" category="general" />} />
          <Route exact path="/business" element={<News mode = {Mode} setProgress={setProgress} apiKey={apikey} key="business" pageSize={pageSize} country="in" category="business" />} />
          <Route exact path="/entertainment" element={<News setProgress={setProgress} apiKey={apikey} key="entertainment" pageSize={pageSize} country="in" category="entertainment" />} />
          <Route exact path="/general" element={<News mode = {Mode} setProgress={setProgress} apiKey={apikey} key="general" pageSize={pageSize} country="in" category="general" />} />
          <Route exact path="/health" element={<News mode = {Mode} setProgress={setProgress} apiKey={apikey} key="health" pageSize={pageSize} country="in" category="health" />} />
          <Route exact path="/science" element={<News mode = {Mode} setProgress={setProgress} apiKey={apikey} key="science" pageSize={pageSize} country="in" category="science" />} />
          <Route exact path="/sports" element={<News mode = {Mode} setProgress={setProgress} apiKey={apikey} key="sports" pageSize={pageSize} country="in" category="sports" />} />
          <Route exact path="/technology" element={<News mode = {Mode} setProgress={setProgress} apiKey={apikey} key="technology" pageSize={pageSize} country="in" category="technology" />} />
        </Routes>
      </Router>
      </div>
    )
}

export default App


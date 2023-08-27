import './App.css';
import React, { useState } from 'react';
import Navbar from './Components/Navbar';
import News from './Components/News';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

export default function App() {

  const [progress, setProgress] = useState(0);
  const pageSize = 6;

  return (
    <React.Fragment>
    <Router> 
    <LoadingBar
      color='#f11946'
      progress={progress}
      height={3}
    />
      <Navbar />
      <Routes>
        <Route path="/" exact element={<News setProgress={setProgress} key="general" pageSize={pageSize} category="general" />} />
        <Route path="/business" element={<News setProgress={setProgress} key="business" pageSize={pageSize} category="business" />} />
        <Route path="/entertainment" element={<News setProgress={setProgress} key="entertainment" pageSize={pageSize} category="entertainment" />} />
        <Route path="/general" element={<News setProgress={setProgress} key="general" pageSize={pageSize} category="general" />} />
        <Route path="/health" element={<News setProgress={setProgress} key="health" pageSize={pageSize} category="health" />} />
        <Route path="/science" element={<News setProgress={setProgress} key="science" pageSize={pageSize} category="science" />} />
        <Route path="/sports" element={<News setProgress={setProgress} key="sports" pageSize={pageSize} category="sports" />} />
        <Route path="/technology" element={<News setProgress={setProgress} key="technology" pageSize={pageSize} category="technology" />} />
    </Routes>
  </Router> 
    </React.Fragment>
  )
}

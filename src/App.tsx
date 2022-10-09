import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styled from 'styled-components';
import Home from './pages/index';

const Wrapper = styled.div`
  width: 90%;
  margin-left: 5%;
  margin-right: 5%;
  margin-bottom: 5%;
  height:90%;
`

function App() {
  return (
    <Wrapper>
        <Router>
              <Routes>
                <Route  path="/" element={<Home/>} />
                <Route path="*" element={<Home/>} />
              </Routes>
        </Router>
      </Wrapper>          
  );
}

export default App;

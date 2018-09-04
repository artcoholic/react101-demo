import React, { Component } from 'react';
import CardGrid from './CardGrid';
import Shots from './shots.json';
import styled from 'styled-components';

const Headline = styled.h1`
  text-align: center;
  padding: 40px 0;
`;

const FooterCopy = styled.p`
  text-align: center;
  padding: 40px 0;
  color: #c3c3c3;
  font-weight: 100;
`

class App extends Component {
  render() {
    return (
      <div>
        <Headline>React 101 Demo</Headline>
        <CardGrid shots={Shots} />
        <FooterCopy>By Arturo Wibawa</FooterCopy>
      </div>
    );
  }
}

export default App;

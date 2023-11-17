import React, { useState } from 'react';
import './App.css';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FlowPage from './pages/flow-page/flow-page';
import TerminalPage from './pages/terminal-page/terminal-page';
import HeaderBar from './components/header-bar/header-bar';
import { Moon, Sun } from 'grommet-icons';
import {
  Box,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Grid,
  grommet,
  Grommet,
  Header,
  Heading,
  Page,
  PageContent,
  PageHeader,
  Paragraph,
  ResponsiveContext,
  Text,
} from 'grommet';
import { deepMerge } from 'grommet/utils';
import theme from './Theme';
function App() {
  const [dark, setDark] = useState(false);

  return (
    <Router>
      <Grommet theme={theme} full themeMode={dark ? 'dark' : 'light'}>
        <div className="App">
          <HeaderBar />

          <Routes>
            <Route path="/" element={<FlowPage />} />
            <Route path="/terminal" element={<TerminalPage />} />
          </Routes>
        </div>
      </Grommet>
    </Router>
  );
}

export default App;

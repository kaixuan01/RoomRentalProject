// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import './styles/sweetalert-overrides.css'

import { CssBaseline, ThemeProvider } from '@mui/material';
import { useRoutes } from 'react-router-dom';
import Router from './routes/Router';

import { LoadingProvider } from "./components/shared/Loading/LoadingContext";
import Loading from "./components/shared/Loading/Loading";
import { baselightTheme } from "./theme/DefaultColors";

function App() {
  
  const routing = useRoutes(Router());
  const theme = baselightTheme;

  return (
    <ThemeProvider theme={theme}>
      <LoadingProvider>
        <Loading /> {/* Global loading indicator */}
        <CssBaseline />
        {routing}
      </LoadingProvider>
    </ThemeProvider>
  );
}

export default App
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import Welcome from './Welcome';
import Forms from './Form';
import Question from './Question';
import End from './End';

const theme = createTheme();

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Welcome/>} />
            <Route path="/form" element={<Forms/>} />
            <Route path="/question" element={<Question/>} />
            <Route path="/end" element={<End/>} />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
};

export default App;

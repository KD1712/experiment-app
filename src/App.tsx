import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import Welcome from './align-Welcome';
import Forms from './align-startForm';
import Question from './align-Question';
import End from './align-End';
import EndForm from './align-endForm';
import Welcome2 from './aesth-Welcome';
import Forms2 from './aesth-startForm';
import Question2 from './aesth-Question';
import End2 from './aesth-End';
import EndForm2 from './aesth-endForm';


const theme = createTheme();

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <Router>
          <Routes>
            <Route path="/alignment/" element={<Welcome/>} />
            <Route path="/alignment/form" element={<Forms/>} />
            <Route path="/alignment/question" element={<Question/>} />
            <Route path="/alignment/endForm" element={<EndForm/>} />
            <Route path="/alignment/end" element={<End/>} />
            <Route path="/aesthetic/" element={<Welcome2/>} />
            <Route path="/aesthetic/form" element={<Forms2/>} />
            <Route path="/aesthetic/question" element={<Question2/>} />
            <Route path="/aesthetic/endForm" element={<EndForm2/>} />
            <Route path="/aesthetic/end" element={<End2/>} />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
};

export default App;

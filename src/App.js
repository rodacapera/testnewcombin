
import {BrowserRouter, Routes, Route,} from 'react-router-dom';
import Dash from "./components/Dash";
import Login from "./components/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dash/>}>
        </Route>
        <Route path='/login' element={<Login/>}>
        </Route>
      </Routes>
    </BrowserRouter>
    )
}

export default App;
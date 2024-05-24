import "./App.css";
import Header from "./Component/Header";
import Hero from "./Component/Hero";
import Signup from "./Component/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/hero" element={<Hero />} ></Route>
          <Route path="/signup" element={<Signup />} ></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

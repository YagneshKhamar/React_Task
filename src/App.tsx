import Home from "./pages/home";
import Favourite from "./pages/favourite";
import Header from "./components/header/Header";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { store } from "./redux/store";
import { Provider } from "react-redux";
function App() {
  
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/favourite" element={<Favourite />} />
          </Routes>
        </Router>
      </Provider>
    </div>
  );
}

export default App;

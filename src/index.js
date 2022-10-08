import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './common/ScrollToTop';
import Home from './pages/Home';
import Error404 from './pages/Error404';
import './assets/css/global.css';
import LoginPage from './pages/Login';
import ArtBook from './pages/ArtBook';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GraphicsPage from './pages/Graphics';

export default function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <ScrollToTop>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage toast={toast} />} />
            <Route path="/Home" element={<ArtBook toast={toast} />} />
            <Route path="/Analitics" element={<GraphicsPage toast={toast} />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </ScrollToTop>
      </BrowserRouter>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

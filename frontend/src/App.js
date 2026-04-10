import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import AshtavinayakPage from "./pages/AshtavinayakPage";

function App() {
  return (
    <div className="min-h-screen bg-[var(--brand-bg)]">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/tours/ashtavinayak" element={<AshtavinayakPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

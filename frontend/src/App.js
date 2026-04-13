import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import AshtavinayakPage from "./pages/AshtavinayakPage";
import KeralaPage from "./pages/KeralaPage";
import RajasthanPage from "./pages/RajasthanPage";
import ShimlaManaliPage from "./pages/ShimlaManaliPage";

function App() {
  return (
    <div className="min-h-screen bg-[var(--brand-bg)]">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/tours/ashtavinayak" element={<AshtavinayakPage />} />
          <Route path="/tours/kerala" element={<KeralaPage />} />
          <Route path="/tours/rajasthan" element={<RajasthanPage />} />
          <Route path="/tours/shimla-manali" element={<ShimlaManaliPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

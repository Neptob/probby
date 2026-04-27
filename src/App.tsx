import { BrowserRouter, Routes, Route } from "react-router-dom";
import BottomNav from "./components/BottomNav";
import Header from "./components/Header";
import Today from "./pages/Today";
import History from "./pages/History";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Today />} />
        <Route path="/history" element={<History />} />
        <Route path="/progress" element={<div>Progress</div>} />
        <Route path="/settings" element={<div>Settings</div>} />
      </Routes>
      <BottomNav />
    </BrowserRouter>
  );
}

export default App;

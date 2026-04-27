import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProfileProvider } from "./context/UserProfileContext";
import BottomNav from "./components/BottomNav";
import Header from "./components/Header";
import Today from "./pages/Today";
import History from "./pages/History";
import Progress from "./pages/Progress";
import Settings from "./pages/Settings";

function App() {
  return (
    <UserProfileProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Today />} />
          <Route path="/history" element={<History />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
        <BottomNav />
      </BrowserRouter>
    </UserProfileProvider>
  );
}

export default App;

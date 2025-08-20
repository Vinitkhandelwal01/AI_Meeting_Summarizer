import { Routes, Route } from "react-router-dom";
import Index from "./pages/index"; 
import NotFound from "./pages/notFound"
import "./App.css";

function App() {
  return (
    <Routes>
      {/* Homepage */}
      <Route path="/" element={<Index />} />

      {/* Future pages ke liye */}
      <Route path="*" element={<NotFound/>} />
    </Routes>
  );
}

export default App;

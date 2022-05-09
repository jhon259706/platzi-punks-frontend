import Home from "./pages/Home";
import Punks from "./pages/Punks";
import Punk from "./pages/Punk"; 
import { Route, Routes } from "react-router-dom";
import MainLayout from "./components/layouts/main";

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/punks" exact element={<Punks />} />
        <Route path="/punks/:tokenId" exact element={<Punk />} />
      </Routes>
    </MainLayout>
  );
}

export default App;

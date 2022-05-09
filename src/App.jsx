import Home from "./pages/Home";
import Punks from "./pages/Punks";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./components/layouts/main";

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/punks" exact element={<Punks />} />
      </Routes>
    </MainLayout>
  );
}

export default App;

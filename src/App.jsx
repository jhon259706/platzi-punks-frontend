import Home from "./pages/home";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./components/layouts/main";

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" exact element={<Home />} />
      </Routes>
    </MainLayout>
  );
}

export default App;

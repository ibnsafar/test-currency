import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import OneCurrency from "./pages/OneCurrency";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="currency/:id" element={<OneCurrency />} />
      </Routes>
    </>
  );
};
export default App;

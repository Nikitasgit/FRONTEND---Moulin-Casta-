import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Contact from "./pages/Contact";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccommodations } from "./feature/accommodationsSlice";
import NavBar from "./components/NavBar";

import Accommodation from "./pages/Accommodation";
const App = () => {
  const dispatch = useDispatch();
  const { accommodations, isLoading } = useSelector(
    (store) => store.accommodations
  );
  useEffect(() => {
    dispatch(fetchAccommodations());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  const navbarData = accommodations.map((accommodation) => {
    const firstPicture =
      accommodation.pictures.length > 0 ? accommodation.pictures[0].url : null;
    return {
      id: accommodation._id,
      name: accommodation.name,
      rate: accommodation.defaultRate,
      picture: firstPicture,
    };
  });

  return (
    <BrowserRouter>
      <NavBar data={navbarData} />
      <Routes>
        <Route path="/" element={<Home />} />
        {accommodations.map((accommodation) => (
          <Route
            key={accommodation._id}
            path={`/${accommodation._id}`}
            element={<Accommodation data={accommodation} />}
          />
        ))}
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import About from "./pages/About";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Header from "./components/Header";

import "./App.css";
import PrivateRoute from "./components/PrivateRoute";
import { useEffect } from "react";
import { getUserApi } from "./api/user.api";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/slices/user.slice";
import CreateListing from "./pages/CreateListing";
import MyListings from "./pages/MyListings";
import EditListing from "./pages/EditListing";
import Listing from "./pages/Listing";

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      const res = await getUserApi();
      if (res.success === true) {
        dispatch(setUser(res.user));
      }
    };
    fetchData();
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/about" element={<About />} />
          <Route path="/listing/:listingId" element={<Listing />}></Route>
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/my-listing" element={<MyListings />} />
            <Route path="/create-listing" element={<CreateListing />} />
            <Route path="/edit-listing" element={<EditListing />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

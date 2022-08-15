import './App.css';
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import NotFound from "../NotFound/NotFound";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { Route, Routes, useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  function navigateToLogin() {
    navigate("/sign-in");
  }
  function navigateToRegister() {
    navigate("/sign-up");
  }
  function navigateToMovies() {
    navigate("/movies");
  }
  function navigateToSavedMovies() {
    navigate("/saved-movies");
  }
  function navigateToProfile() {
    navigate("/profile");
  }
  function navigateToMain() {
    navigate("/");
  }
  return (
    <>      
      <Routes>        
        <Route
          index
          element={
            <>
              <Header 
                isLoggedIn={false}
                isRegisterPage={false}
                isLoginPage={false}
                navigateToLogin={navigateToLogin}
                navigateToRegister={navigateToRegister}
                navigateToMain={navigateToMain}
              />
              <Main /> 
            </>
          }
        />
        <Route
          path="/sign-up"
          element={
            <>
              <Header 
                isLoggedIn={true}
                isRegisterPage={true}
                isLoginPage={false}
                navigateToMain={navigateToMain}
              />
              <Register 
                navigateToLogin={navigateToLogin}
              />
            </>
          }
        />
        <Route
          path="/sign-in"
          element={
            <>
              <Header 
                isLoggedIn={true}
                isRegisterPage={false}
                isLoginPage={true}
                navigateToMain={navigateToMain}
              />
              <Login 
                navigateToRegister={navigateToRegister}
              />
            </>
          }
        />
        <Route
          path="/movies"
          element={
            <>
              <Header 
                isLoggedIn={true}
                isRegisterPage={false}
                isLoginPage={false}
                navigateToMovies={navigateToMovies}
                navigateToSavedMovies={navigateToSavedMovies}
                navigateToProfile={navigateToProfile}
                navigateToMain={navigateToMain}
              />
              <Movies />
            </>
          }
        /> 
        <Route
          path="/saved-movies"
          element={
            <>
              <Header 
                isLoggedIn={true}
                isRegisterPage={false}
                isLoginPage={false}
                navigateToMovies={navigateToMovies}
                navigateToSavedMovies={navigateToSavedMovies}
                navigateToProfile={navigateToProfile}
                navigateToMain={navigateToMain}
              />
              <SavedMovies />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <Header 
                isLoggedIn={true}
                isRegisterPage={false}
                isLoginPage={false}
                navigateToMovies={navigateToMovies}
                navigateToSavedMovies={navigateToSavedMovies}
                navigateToProfile={navigateToProfile}
                navigateToMain={navigateToMain}
              />
              <Profile />
            </>
          }
        /> 
        <Route
          path="/404"
          element={<NotFound />}
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './pages/Layout';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PrivateRoute from './pages/PrivateRoute';
import AccountPage from './pages/AccountPage';
import BookingsPage from './pages/BookingsPage';
import PlacesPage from './pages/PlacesPage';
import PlacesPageForm from './pages/PlacesPageForm';
import PlaceEditForm from './pages/PlaceEditForm';
import PlacePage from './pages/PlacePage';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index path="/" element={<IndexPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/places/:id" element={<PlacePage />} />
            <Route path="" element={<PrivateRoute />}>
              <Route exact path="/account" element={<AccountPage />} />
              <Route path="/account/bookings" element={<BookingsPage />} />
              <Route path="/account/places" element={<PlacesPage />} />
              <Route path="/account/places/new" element={<PlacesPageForm />} />
              <Route path="/account/places/:id" element={<PlaceEditForm />} />
            </Route>
          </Route>
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;

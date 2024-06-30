import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Navigate,Route, Routes } from 'react-router-dom';

import AuthModal from './components/auth/AuthModal';
import Header from './components/Header';
import { userIsLoggedIn } from './state/auth/authSlice';
import BookDetails from './views/BookDetails';
import ErrorPage from './views/ErrorPage';
import FavouriteBooks from './views/FavouriteBooks';
import MainPage from './views/MainPage';
import { Paths } from './constants';

import 'normalize.css/normalize.css';

export default function App() {
  const error = useSelector((state) => state.books.error);
  const isAuthModalOpen = useSelector((state) => state.app.isAuthModalOpen);
  const isLoggedIn = useSelector(userIsLoggedIn);

  return (
    <Router>
      <Header />

      <main>
        <Routes>
          <Route path={Paths.HOME} element={error ? <ErrorPage /> : <MainPage />} />
          <Route path={Paths.BOOK.DETAILS} element={error ? <ErrorPage /> : <BookDetails />} />
          <Route path={Paths.FAVOURITE_BOOKS} element={isLoggedIn ? <FavouriteBooks /> : <Navigate to="/" />} />
        </Routes>
      </main>

      {isAuthModalOpen && <AuthModal />}
    </Router>
  )
}
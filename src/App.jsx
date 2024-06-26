import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import 'normalize.css/normalize.css';


import BookDetails from './views/BookDetails';
import BookList from './views/BookList';
import ErrorPage from './views/ErrorPage';
import AuthenticationModal from './components/AuthenticationModal';
import { Paths } from './constants';
import Header from './components/Header';

export default function App() {
  const error = useSelector((state) => state.books.error);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const toggleAuthModal = () => setIsAuthModalOpen(!isAuthModalOpen);

  return (
    <Router>
      <Header toggleAuthModal={toggleAuthModal} />

      <main>
        <Routes>
          <Route path={Paths.HOME} element={error ? <ErrorPage /> : <BookList />} />
          <Route path={Paths.BOOK.DETAILS} element={error ? <ErrorPage /> : <BookDetails />} />
        </Routes>
      </main>

      {isAuthModalOpen && <AuthenticationModal onClose={toggleAuthModal} />}
    </Router>
  )
}
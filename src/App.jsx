import 'normalize.css/normalize.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Paths } from './constants';
import BookDetails from './views/BookDetails';
import BookList from './views/BookList';
import ErrorPage from './views/ErrorPage';
import AuthModal from './components/auth/AuthModal';
import Header from './components/Header';

export default function App() {
  const error = useSelector((state) => state.books.error);
  const isAuthModalOpen = useSelector((state) => state.app.isAuthModalOpen);

  return (
    <Router>
      <Header />

      <main>
        <Routes>
          <Route path={Paths.HOME} element={error ? <ErrorPage /> : <BookList />} />
          <Route path={Paths.BOOK.DETAILS} element={error ? <ErrorPage /> : <BookDetails />} />
        </Routes>
      </main>

      {isAuthModalOpen && <AuthModal />}
    </Router>
  )
}
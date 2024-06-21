import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import 'normalize.css/normalize.css';

import Search from './components/Search';
import BookDetails from './views/BookDetails';
import BookList from './views/BookList';
import { Paths } from './constants';
import ErrorPage from './views/ErrorPage';
import useErrorBoundary from './hooks/useErrorBoundary';

export default function App() {
  const error = useSelector((state) => state.books.error);

  return (
    <Router>
      <header>
        <h1><Link to={Paths.HOME}>Search for books</Link></h1>
        <Search />
      </header>

      <main>
        <Routes>
          <Route path={Paths.HOME} element={useErrorBoundary(BookList, error)} />
          <Route path={Paths.BOOK.DETAILS} element={useErrorBoundary(BookDetails, error)} />
        </Routes>
      </main>
    </Router>
  )
}
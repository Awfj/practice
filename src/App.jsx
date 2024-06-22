import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import 'normalize.css/normalize.css';

import Search from './components/Search';
import BookDetails from './views/BookDetails';
import BookList from './views/BookList';
import ErrorPage from './views/ErrorPage';
import { Paths } from './constants';

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
          <Route path={Paths.HOME} element={error ? <ErrorPage /> : <BookList />} />
          <Route path={Paths.BOOK.DETAILS} element={error ? <ErrorPage /> : <BookDetails />} />
        </Routes>
      </main>
    </Router>
  )
}
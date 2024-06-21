import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'normalize.css/normalize.css';

import Search from './components/Search';
import BookDetails from './components/BookDetails';
import BookList from './components/BookList';
import { HOME_PATH, BOOK_DETAILS_PATH } from './routes';

export default function App() {
  return (
    <Router>
      <header>
        <h1><Link to={HOME_PATH}>Search for books</Link></h1>
        <Search />
      </header>

      <main>
        <Routes>
          <Route exact path={HOME_PATH} element={<BookList />} />
          <Route path={BOOK_DETAILS_PATH} element={<BookDetails />} />
        </Routes>
      </main>
    </Router>
  )
}
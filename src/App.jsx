import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'normalize.css/normalize.css';

import Search from './components/Search';
import BookDetails from './views/BookDetails';
import BookList from './views/BookList';
import { Paths } from './constants';

export default function App() {
  return (
    <Router>
      <header>
        <h1><Link to={Paths.HOME}>Search for books</Link></h1>
        <Search />
      </header>

      <main>
        <Routes>
          <Route path={Paths.HOME} element={<BookList />} />
          <Route path={Paths.BOOK.DETAILS} element={<BookDetails />} />
        </Routes>
      </main>
    </Router>
  )
}
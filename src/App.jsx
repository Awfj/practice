import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'normalize.css/normalize.css';

import Search from './components/Search';
import BookDetails from './components/BookDetails';
import BookList from './components/BookList';

export default function App() {
  return (
    <Router>
      <header>
        <h1><Link to="/">Search for books</Link></h1>
        <Search />
      </header>

      <main>
        <Routes>
          <Route exact path="/" element={<BookList />} />
          <Route path="/book/:id" element={<BookDetails />} />
        </Routes>
      </main>
    </Router>
  )
}
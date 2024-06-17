import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'normalize.css/normalize.css';

import Search from './components/Search';
import BookDetails from './components/BookDetails';
import BookList from './components/BookList';

export default function App() {
  return (
    <Router>
      <header>
        <h1>Search for books</h1>
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
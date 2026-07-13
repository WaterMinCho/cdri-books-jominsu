import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/layout/Header';
import SearchPage from './pages/SearchPage';
import WishlistPage from './pages/WishlistPage';

const App = () => {
  return (
    <>
      <Header />
      <Main>
        <Routes>
          <Route
            path="/"
            element={<SearchPage />}
          />
          <Route
            path="/wishlist"
            element={<WishlistPage />}
          />
        </Routes>
      </Main>
    </>
  );
};

const Main = styled.main`
  max-width: 960px;
  margin: 0 auto;
  padding: 40px 20px 80px;
`;

export default App;

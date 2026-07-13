import styled from 'styled-components';

const WishlistPage = () => {
  return (
    <section>
      <PageTitle>내가 찜한 책</PageTitle>
    </section>
  );
};

const PageTitle = styled.h2`
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 24px;
`;

export default WishlistPage;

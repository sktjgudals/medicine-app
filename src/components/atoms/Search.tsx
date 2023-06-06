import styled from "styled-components";

const SearchMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  justify-content: center;
  width: 100%;
  padding: 20px;
`;

const SearchLoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px 0px;
`;

const SearchPostCotainer = styled.ul`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  padding: 5px;
  width: 100%;
  height: 100%;
  max-width: 1024px;
`;

const SearchNotFoundContainer = styled.div`
  display: flex;
  justify-content: center;
  font-size: var(--font-size-5);
  padding: 20px;
`;

export {
  SearchMainContainer,
  SearchLoadingContainer,
  SearchPostCotainer,
  SearchNotFoundContainer,
};

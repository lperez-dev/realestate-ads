import styled from 'styled-components'

const CardsContainer = styled.div`
    
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    /* display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); */
    width: 100%;
    background-color: none;
    justify-content: center;
    gap: 10px;
    padding: 10px;

    @media (max-width: 768px) {
      gap: 2px;
      padding: 4px;
      margin: 0;
    }
  `
export default CardsContainer
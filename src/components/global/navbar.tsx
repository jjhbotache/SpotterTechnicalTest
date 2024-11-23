import { useDispatch } from "react-redux";
import styled from "styled-components";
import { toggleTheme } from "../../redux/slices/themeSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  
  return(
    <StyledNavbar>
      <h1 className="navbar__title">Google Flights</h1>
      <button className="navbar__toggle-button" onClick={() => dispatch(toggleTheme())}>
        Toggle Theme
      </button>
    </StyledNavbar>
  )
};


const StyledNavbar = styled.nav`
  text-align: center;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  height: auto;

  .navbar__title {
    /* estilos para el título */
  }

  .navbar__toggle-button {
    /* estilos para el botón de toggle */
  }
`;  
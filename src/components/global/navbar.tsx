import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { toggleTheme } from "../../redux/slices/themeSlice";
import { Menu, Sun, Moon, Plane, Search, Hotel, Home, Luggage, X } from "lucide-react";
import { RootState } from "../../redux/store";
import Button from '../ui/Button';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const dispatch = useDispatch();
  const theme = useSelector((state:RootState) => state.theme);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Define a button configuration array inside the component
  const buttonConfig = [
    { label: 'Travel', icon: Luggage, disabled: true },
    { label: 'Explore', icon: Search, onClick: () => navigate('/explore') },
    { label: 'Flights', icon: Plane },
    { label: 'Hotels', icon: Hotel, disabled: true },
    { label: 'Vacation rentals', icon: Home, disabled: true },
  ];

  // Define the NavButtons component
  const NavButtons = () => (
    <>
      {buttonConfig.map(({ label, icon: Icon, disabled, onClick }) => (
        <Button
          key={label}
          $variation="secondary"
          $disabled={disabled}
          onClick={onClick}
        >
          <Icon className="navbar__icon" />
          {label}
        </Button>
      ))}
    </>
  );

  return (
    <StyledNavbar>
      <div className="navbar__left" >
        <Menu className="navbar__icon" onClick={() => setIsMenuOpen(!isMenuOpen)} />
        <h1 className="navbar__title" onClick={()=>{navigate("/")}}>Google</h1>
      </div>
      
      <div className="navbar__center">
        <NavButtons />
      </div>
      <div className="navbar__right">
        {theme === 'light' ? (
          <Sun className="navbar__icon" onClick={() => dispatch(toggleTheme())} />
        ) : (
          <Moon className="navbar__icon" onClick={() => dispatch(toggleTheme())} />
        )}
      </div>
      {isMenuOpen && (
        <>
          <Overlay onClick={() => setIsMenuOpen(false)} />
          <SideMenu>
            <X className="close-icon" onClick={() => setIsMenuOpen(false)} />
            <NavButtons />
          </SideMenu>
        </>
      )}
    </StyledNavbar>
  );
}

const StyledNavbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  height: 60px;
  min-height: 60px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondary};
  position: sticky;
  top: 0;
  z-index: 1000;

  .navbar__left {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;

    .navbar__title {
      font-size: 20px;
      font-weight: bold;
    }
  }

  .navbar__center {
    display: flex;
    gap: 16px;

  }

  .navbar__right {
    display: flex;
    align-items: center;

    .navbar__icon {
      cursor: pointer;
    }
  }

  @media (max-width: 950px) {
    .navbar__center {
      display: none;
    }
  }
`;

const SideMenu = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 250px;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  z-index: 10000; // Ensure the sidebar is always on top

  .close-icon {
    align-self: flex-end;
    cursor: pointer;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
`;

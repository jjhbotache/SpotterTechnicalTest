import { Outlet } from 'react-router-dom';
import Navbar from '../components/global/Navbar';

export default function root() {
  return <>
    <Navbar />
    <Outlet />
  </>
  ;
};



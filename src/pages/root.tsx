import { Outlet } from 'react-router-dom';
import Navbar from '../components/global/navbar';

export default function root() {
  return <>
    <Navbar />
    <Outlet />
  </>
  ;
};



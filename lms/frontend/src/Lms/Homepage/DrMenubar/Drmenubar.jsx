import { NavLink } from "react-router-dom";
import loginimg from "../../../assets/profile1.png";
import Mainlogo from "../../../assets/image 39.png";

function Drmenubar() {
  return (
    <nav className="navbarcontenttext h-25 py-6 px-2 w-full fixed top-0 left-0 z-50">
      <div className="flex flex-row justify-between items-center">
        
        <NavLink to="/">
          <img src={Mainlogo} alt="Main Logo" className="logoken ms-lg-5" />
        </NavLink>
        
        <div className="flex items-center lg:mr-10 ">
          
          <NavLink to="/lmslogin" className="ms-4">
            <img src={loginimg} alt="Login" />
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Drmenubar;

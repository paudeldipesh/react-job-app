import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa";
import { Logo } from "./Logo";
import { Wrapper } from "../assets/wrappers/Navbar";
import { toggleSidebar, clearStore } from "../features/user/userSlice";

export const Navbar = () => {
  const [showLogout, setShowLogout] = useState(false);
  const { user } = useSelector((state) => state.userState);
  const dispatch = useDispatch();

  function toggle() {
    dispatch(toggleSidebar());
  }

  return (
    <Wrapper>
      <div className="nav-center">
        <button type="button" onClick={toggle} className="toggle-btn">
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h3 className="logo-text">dashboard</h3>
        </div>
        <div className="btn-container">
          <button
            type="button"
            className="btn"
            onClick={() => setShowLogout(!showLogout)}
          >
            <FaUserCircle />
            {user?.name}
            <FaCaretDown />
          </button>
          <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
            <button
              type="button"
              className="dropdown-btn"
              onClick={() => dispatch(clearStore("logout successfully"))}
            >
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

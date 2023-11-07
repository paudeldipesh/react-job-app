import { useSelector } from "react-redux";
import { NavLinks } from "./NavLinks";
import { Logo } from "./Logo";
import { Wrapper } from "../assets/wrappers/BigSidebar";

export const BigSidebar = () => {
  const { isSidebarOpen } = useSelector((state) => state.userState);

  return (
    <Wrapper>
      <div
        className={
          isSidebarOpen ? "sidebar-container" : "sidebar-container show-sidebar"
        }
      >
        <div className="content">
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  );
};

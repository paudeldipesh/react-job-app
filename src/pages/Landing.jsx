import { Link } from "react-router-dom";
import main from "../assets/images/main.svg";
import { Logo } from "../components";
import { Wrapper } from "../assets/wrappers/LandingPage";

export const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
            Introducing Jobster, a cutting-edge React application designed to
            revolutionize the way you manage your job applications. This
            comprehensive CRUD (Create, Read, Update, Delete) app combines the
            power of Redux Toolkit and Axios to simplify job tracking for job
            seekers, recruiters, and anyone seeking a more efficient way to stay
            on top of their job search.
          </p>
          <Link to="/register" className="btn btn-hero">
            login/register
          </Link>
        </div>
        <img src={main} className="img main-img" alt="job icon" />
      </div>
    </Wrapper>
  );
};

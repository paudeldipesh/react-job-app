import { Link } from "react-router-dom";
import error from "../assets/images/not-found.svg";
import { Wrapper } from "../assets/wrappers/ErrorPage";

export const Error = () => {
  return (
    <Wrapper className="full-page">
      <div>
        <img src={error} alt="not found icon" />
        <h3>Page Not Found!</h3>
        <p>We can't seem to find the page you're looking for</p>
        <Link to="/">back to home</Link>
      </div>
    </Wrapper>
  );
};

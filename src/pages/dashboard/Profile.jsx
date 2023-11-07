import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FormRow } from "../../components";
import { Wrapper } from "../../assets/wrappers/DashboardFormPage";
import { updateUser } from "../../features/user/userSlice";

export const Profile = () => {
  const { isLoading, user } = useSelector((state) => state.userState);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    lastName: user?.lastName || "",
    location: user?.location || "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    const { name, email, lastName, location } = userData;
    if (!name || !email || !lastName || !location) {
      toast.error("please fill out all the field!");
      return;
    }
    dispatch(updateUser(userData));
  }

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setUserData({ ...userData, [name]: value });
  }

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>profile</h3>
        <div className="form-center">
          <FormRow
            type="text"
            name="name"
            value={userData.name}
            id="name"
            handleChange={handleChange}
          />

          <FormRow
            type="email"
            name="email"
            id="email"
            value={userData.email}
            handleChange={handleChange}
          />

          <FormRow
            type="text"
            name="lastName"
            id="lastName"
            labelText="last name"
            value={userData.lastName}
            handleChange={handleChange}
          />

          <FormRow
            type="text"
            name="location"
            id="location"
            value={userData.location}
            handleChange={handleChange}
          />

          <button type="submit" className="btn btn-block" disabled={isLoading}>
            {isLoading ? "please wait..." : "save changes"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <div>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/search">Search</NavLink>
    </div>
  );
};

export default Navigation;

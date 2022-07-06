import { Link, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";

const NavigationContainer = styled.div`
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #282c34;
`;
const LinksContainer = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 10px;
`;

export const Navigation = () => {
  const user = useSelector((state) => state.authentication.user);

  return (
    <>
      <NavigationContainer>
        <Link to="/">
          <h1>AExperts</h1>
          {/* <p>You are logged in as: {user.first_name}</p> */}
        </Link>
        <LinksContainer>
          <Link to="/">Jobs</Link>
          <Link to="/customers">Customers</Link>
          <Link to="/users">Users</Link>
          <Link to="/login">Logout</Link>
        </LinksContainer>
      </NavigationContainer>
      <Outlet />
    </>
  );
};

import { Grid } from "@mantine/core";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <Grid justify="left" align="center">
      <Grid.Col span={1}>
        <NavLink to="/">My Books</NavLink>
      </Grid.Col>
      <Grid.Col span={1}>
        <NavLink to="/search">Search Books</NavLink>
      </Grid.Col>
      <Grid.Col span={1}>
        <NavLink to="/library">My Libraries</NavLink>
      </Grid.Col>
    </Grid>
  );
};

export default Navigation;

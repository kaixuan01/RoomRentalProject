import PropTypes from "prop-types";
import { Grid2 } from "@mui/material";

const MyGrid = ({ xs, sm, md, lg, xl, children, ...props }) => (
  <Grid2 size={{xs, sm, md, lg, xl}} {...props}>
    {children}
  </Grid2>
);

MyGrid.propTypes = {
  xs: PropTypes.number, // `xs`, `sm`, etc., are numbers for grid spacing
  sm: PropTypes.number,
  md: PropTypes.number,
  lg: PropTypes.number,
  xl: PropTypes.number,
  children: PropTypes.node, // Allow any renderable content
};

export default MyGrid;

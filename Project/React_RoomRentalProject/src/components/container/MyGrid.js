import PropTypes from "prop-types";
import { Grid2 } from "@mui/material";
import React from "react";

const MyGrid = React.forwardRef(({ xs, sm, md, lg, xl, children, ...props }, ref) => (
  <Grid2 ref={ref} size={{ xs, sm, md, lg, xl }} {...props}>
    {children}
  </Grid2>
));

MyGrid.propTypes = {
  xs: PropTypes.number,
  sm: PropTypes.number,
  md: PropTypes.number,
  lg: PropTypes.number,
  xl: PropTypes.number,
  children: PropTypes.node,
};

MyGrid.displayName = 'MyGrid';

export default MyGrid;

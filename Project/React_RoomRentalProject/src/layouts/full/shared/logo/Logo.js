import { Link } from "react-router-dom";
import LogoDark1 from "../../../../assets/images/logos/SmallLogo.png";
import { styled } from "@mui/material";

const LinkStyled = styled(Link)(() => ({
  height: "70px",
  width: "180px",
  overflow: "hidden",
  display: "block",
}));

const Logo = () => {
  return (
    <LinkStyled
      to="/"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img src={LogoDark1} alt="Logo" style={{ height: "100%", width: "auto" }} />
    </LinkStyled>
  );
};

export default Logo;

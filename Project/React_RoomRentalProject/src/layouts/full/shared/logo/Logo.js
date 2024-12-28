import { Link } from "react-router-dom";
// import PBLogo from "src/assets/images/logos/PBLogo.png"; // Import as a file
import { ReactComponent as LogoDark1 } from "src/assets/images/logos/dark1-logo.svg";
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
      }}
    >
      {/* <img src={PBLogo} alt="Logo" style={{ height: "100%", width: "auto" }} /> */}
      <LogoDark1/>
    </LinkStyled>
  );
};

export default Logo;

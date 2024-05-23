import { Typography, Box, useTheme } from "@mui/material";

const Header = ({ title, subtitle }) => {
  return (
    <Box mb="30px">
      <Typography
        variant="h2"
        color="#040509"
        fontWeight="bold"
        sx={{ m: "0 0 5px 0" }}
      >
        {title}
      </Typography>
      <Typography variant="h5" color="#1F2A40">
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
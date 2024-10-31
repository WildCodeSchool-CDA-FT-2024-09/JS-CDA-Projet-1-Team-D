import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, { tabClasses } from "@mui/joy/Tab";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Sms from "@mui/icons-material/Sms";
import Person from "@mui/icons-material/Person";
import { Link, useLocation } from "react-router-dom";

const iconStyle = {
  width: "30px",
  height: "50px",
};

export default function ManualNavbar() {
  const location = useLocation();

  const activeTab = {
    "/": 0,
    "/matches": 1,
    "/likes": 2,
    "/settings": 3,
  };

  return (
    <Tabs
      aria-label="tabs"
      defaultValue={0}
      value={activeTab[location.pathname as keyof typeof activeTab]}
      sx={{ bgcolor: "transparent" }}
    >
      <TabList
        disableUnderline
        tabFlex={1}
        sx={{
          p: 0.5,
          gap: 0.5,
          borderRadius: "50px",
          bgcolor: `#F6A377`,
          boxShadow: "lg",
          [`& .${tabClasses.root}[aria-selected="true"]`]: {
            bgcolor: "transparent",
            color: "white",
          },
          [`& .${tabClasses.root}:not(.Mui-selected, [aria-selected="true"]):hover`]:
            {
              bgcolor: "transparent",
            },
        }}
      >
        <Tab component={Link} to="/" disableIndicator>
          <HomeRoundedIcon sx={iconStyle} />
        </Tab>
        <Tab component={Link} to="/matches" disableIndicator>
          <Sms sx={iconStyle} />
        </Tab>
        <Tab component={Link} to="/likes" disableIndicator>
          <FavoriteBorder sx={iconStyle} />
        </Tab>
        <Tab component={Link} to="/settings" disableIndicator>
          <Person sx={iconStyle} />
        </Tab>
      </TabList>
    </Tabs>
  );
}

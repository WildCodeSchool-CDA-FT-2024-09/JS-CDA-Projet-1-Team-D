import LogoutIcon from "/logout.svg";
import PrivacyIcon from "/privacy.svg";
import rightArrow from "/rightArrow.svg";
import leftArrow from "/leftArrow.svg";
import { Box, Typography, Drawer, IconButton } from "@mui/joy";
import { useState } from "react";
import PrivacyPolicyContent from "../../components/PrivacyPolicyContent/PrivacyPolicyContent";
import Logout from "../../components/Logout/Logout";

interface MenuItemProps {
  icon: string;
  text: string;
  onClick: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, text, onClick }) => (
  <Box
    display="flex"
    alignItems="center"
    justifyContent="space-between"
    padding="8px"
    onClick={onClick}
    style={{ cursor: "pointer" }}
  >
    <Box display="flex" alignItems="center">
      <img src={icon} alt={text} style={{ marginRight: "8px" }} />
      <Typography>{text}</Typography>
    </Box>
    <img src={rightArrow} alt="ouvrir" style={{ marginLeft: "8px" }} />
  </Box>
);

export const PersonalSettings = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{
    icon: string;
    text: string;
  } | null>(null);

  const handleOpenDrawer = (item: { icon: string; text: string }) => {
    setSelectedItem(item);
    setOpenDrawer(true);
  };
  const handleCloseDrawer = () => setOpenDrawer(false);

  return (
    <>
      <MenuItem
        icon={PrivacyIcon}
        text="Confidentialité"
        onClick={() =>
          handleOpenDrawer({ icon: PrivacyIcon, text: "Confidentialité" })
        }
      />
      <MenuItem
        icon={LogoutIcon}
        text="Se déconnecter"
        onClick={() =>
          handleOpenDrawer({ icon: LogoutIcon, text: "Se déconnecter" })
        }
      />
      <Drawer
        open={openDrawer}
        onClose={handleCloseDrawer}
        anchor="right"
        color="primary"
        size="lg"
        variant="soft"
      >
        <Box display="flex" alignItems="center" padding="16px">
          <IconButton onClick={handleCloseDrawer} sx={{ mr: 2 }}>
            <Box component="img" src={leftArrow} alt="fermer" />
          </IconButton>
          {selectedItem && (
            <>
              <Box
                component="img"
                src={selectedItem.icon}
                alt={selectedItem.text}
                sx={{ ml: 2 }}
              />
              <Typography sx={{ ml: 1 }}>{selectedItem.text}</Typography>
            </>
          )}
        </Box>
        <Box padding="16px">
          {selectedItem?.text === "Confidentialité" && <PrivacyPolicyContent />}
          {selectedItem?.text === "Se déconnecter" && <Logout />}
        </Box>
      </Drawer>
    </>
  );
};

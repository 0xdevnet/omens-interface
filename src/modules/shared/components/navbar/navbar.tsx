import * as React from "react";

import { Grid, AppBar, Box, Toolbar, IconButton, Container, Button } from '@material-ui/core';
import { Menu as MenuIcon } from "@material-ui/icons";

import Style from "./navbar.module.scss";
import logo from "../../../../assets/images/logo.svg";
import { ReactComponent as TwitterIcon } from "../../../../assets/images/Twitter.svg";
import { ReactComponent as DiscordIcon } from "../../../../assets/images/Discord.svg";
// import { ReactComponent as VectorIcon } from "../../../../assets/images/Vector.svg";
import { ReactComponent as CrossIcon } from "../../../../assets/images/cross.svg";

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-material-ui";

const pagesList = [
  { title: "DIGSITES", acitveItem: true, route: "/" },
  { title: "CUSTOMIZATION", acitveItem: false, route: "/customization" },
  { title: "MARKETPLACE", acitveItem: false, route: "/marketplace" },
  { title: "UNDERWORLD", acitveItem: false, route: "/underworld" },
  { title: "JOURNEY", acitveItem: false, route: "/journey" },
];

const Navbar = ({
  handleMobileNavbar,
}: {
  handleMobileNavbar: (value: boolean, pathname: string) => void;
}) => {
  // const Navbar = ({ handleMobileNavbar:(boolean, string) }) => {
  const [isMenueOpen, setIsMenuOpen] = useState(false);
  const [pages, setPages] = useState([...pagesList]);
  const [currentActive, setCurrentActive] = useState(0);
  // const { publicKey } = useWallet();

  let navigate = useNavigate();
  let location = useLocation;
  let pathname = location().pathname;

  useEffect(() => {
    setIsMenuOpen(false);
    handleMobileNavbar(false, pathname);
  }, [pathname]);

  const handleRouting = (index: number) => {
    let _pages = [...pages];
    _pages[currentActive].acitveItem = false;
    _pages[currentActive].acitveItem = true;
    setPages([...pages]);
    setCurrentActive(index);
    navigate(pages[index].route);
  };

  const handleOpenNavMenu = () => {
    setIsMenuOpen((prev) => !prev);
    handleMobileNavbar(!isMenueOpen, pathname);
  };

  return (
    <>
      <AppBar position="static" className={Style.barContainer}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}>
              <img className={Style.logo} src={logo} />
            </Box>

            <Box
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" }, mr: 1 }}
            >
              <img className={Style.logo} src={logo} />
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                {pages.map((page, index) => (
                  <div className="d-flex justify-content-center" key={index}>
                    {index != 0 && <div className={Style.navDot}></div>}
                    <Button
                      onClick={() => handleRouting(index)}
                      className={Style.navItem}
                    >
                      {page.title}
                    </Button>
                  </div>
                ))}
              </Grid>
            </Box>

            <Box className={Style.buttonContainer} sx={{ flexGrow: 0 }}>
              <div
                className="d-flex justify-content-center"
                style={{ alignItems: "center" }}
              >
                <DiscordIcon className={`${Style.socialIcon} `} />
                <TwitterIcon className={`${Style.socialIcon} `} />

                <WalletMultiButton className={`${Style.connectWallet} `} />
                {/* <WalletMultiButton className={`${Style.connectWallet} `}>
                  {publicKey ? (
                    ""
                  ) : (
                    <VectorIcon className={`${Style.socialIcon} `} />
                  )}
                  <span>
                    SELECT
                    <br />
                    WALLET
                  </span>
                </WalletMultiButton> */}
              </div>
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                {isMenueOpen ? <CrossIcon fill={"white"} /> : <MenuIcon />}
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {isMenueOpen && (
        <div className={Style.mobileNavbar}>
          <div className={Style.container}>
            <div>
              {pages.map((item, index) => {
                return (
                  <div>
                    <a
                      onClick={() => handleRouting(index)}
                      className={`d-flex align-items-center ${Style.item} ${
                        item.acitveItem ? Style.selectedItem : ""
                      }`}
                    >
                      {item.title}
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Navbar;

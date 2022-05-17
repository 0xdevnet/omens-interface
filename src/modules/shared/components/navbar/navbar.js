import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Style from './navbar.module.scss';
import logo from '../../../../assets/images/logo.svg';
// import { ReactComponent as Wallet } from '../../../../assets/images/wallet.svg';
import { ReactComponent as MenuIcon } from '../../../../assets/images/menu.svg';
import { ReactComponent as CrossIcon } from '../../../../assets/images/cross.svg';
import { ReactComponent as TwitterIcon } from '../../../../assets/images/Twitter.svg';
import { ReactComponent as DiscordIcon } from '../../../../assets/images/Discord.svg';

import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const pagesList = [
    { title: 'DIGSITES', acitveItem: true, route: '/' },
    { title: 'CUSTOMIZATION', acitveItem: false, route: '/customization' },
    { title: 'MARKETPLACE', acitveItem: false, route: '/marketplace' },
];

const Navbar = ({ handleMobileNavbar }) => {
    const [isMenueOpen, setIsMenuOpen] = useState(false);
    const [pages, setPages] = useState([...pagesList]);
    const [currentActive, setCurrentActive] = useState(0);

    let navigate = useNavigate();
    let location = useLocation;
    let pathname = location().pathname;

    useEffect(() => {
        setIsMenuOpen(false);
        handleMobileNavbar(false);
    }, [pathname]);

    const handleRouting = (index) => {
        let _pages = [...pages];
        _pages[currentActive].acitveItem = false;
        _pages[currentActive].acitveItem = true;
        setPages([...pages]);
        setCurrentActive(index);
        navigate(pages[index].route);
    }

    const handleOpenNavMenu = () => {
        setIsMenuOpen((prev) => !prev);
        handleMobileNavbar(!isMenueOpen);
    }


    return (
        <>
            <AppBar position="static" className={Style.barContainer}>
                <Toolbar className='mx-3' disableGutters>

                    <Box sx={{ flexGrow: 1 }}>
                        <img className={Style.logo} src={logo} />
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            {pages.map((page, index) => (
                                <Button
                                    key={index}
                                    onClick={() => handleRouting(index)}
                                    sx={{ color: '#E38E74', display: 'block' }}
                                    className={Style.navItem}
                                >
                                    {page.title}
                                </Button>
                            ))}

                        </Box>

                        <Box className={Style.buttonContainer}>
                            <div className='d-flex justify-content-center'>
                                <TwitterIcon className={Style.socialIcon} />
                                <DiscordIcon className={Style.socialIcon} />
                            </div>
                            <Button className={`mt-1 ${Style.connectWallet} `} >

                                <span >
                                    Connect
                                </span>
                            </Button>

                        </Box>


                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            {
                                isMenueOpen ?
                                    <CrossIcon fill={"white"} /> :
                                    <MenuIcon />
                            }

                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {
                isMenueOpen &&
                <div className={Style.mobileNavbar}>
                    <div className={Style.container}>
                        <div>

                            {pages.map((item, index) => {
                                return (
                                    <div>
                                        <a
                                            onClick={() => handleRouting(index)}
                                            className={`d-flex align-items-center ${Style.item} ${item.acitveItem ? Style.selectedItem : ''}`}>
                                            {item.title}
                                        </a>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            }
        </>
    );
};
export default Navbar;

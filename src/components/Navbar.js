import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import { AppBar, Button, ListItem, Drawer, IconButton, List, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import VideoLibraryOutlinedIcon from '@mui/icons-material/VideoLibraryOutlined';
import PhotoAlbumOutlinedIcon from '@mui/icons-material/PhotoAlbumOutlined';
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';
import { firebaseAuth } from '../firebase/Config';
import { signOut } from 'firebase/auth';

const Navbar = () => {
    const [activeItem, setActiveItem] = useState(0);
    const [toggle, setToggle] = useState(false);
    const navigate = useNavigate();

    const handleToggleDrawer = (open) => () => {
        setToggle(open);
    };

    return (
        <AppBar position="static" sx={{ bgcolor: '#ff6f61' }}>
            <div className="relative flex justify-between px-6 h-full items-center">
                <Link to="/" className="logo">
                    <img src="Images/logow.png" alt="Logo" className="max-w-32 md:max-w-44 -ml-5" />
                </Link>

                {/* Desktop Links */}
                <ul className="hidden md:flex items-center text-white gap-6 lg:gap-8 xl:gap-10 md:text-[20px]">
                    <ListItem
                        className={`${activeItem === 0 ? 'bg-[white] text-[#ff6f61]' : ''} rounded-md cursor-pointer space-x-1`}
                        onClick={() => { setActiveItem(0); navigate("/"); }}
                    >
                        <PhotoSizeSelectActualIcon />
                        <span>Photos</span>
                    </ListItem>
                    <ListItem
                        className={`${activeItem === 1 ? 'bg-[white] text-[#ff6f61]' : ''} rounded-md cursor-pointer space-x-1`}
                        onClick={() => { setActiveItem(1); navigate('/videoss'); }}
                    >
                        <VideoLibraryOutlinedIcon />
                        <span>Videos</span>
                    </ListItem>
                    <ListItem
                        className={`${activeItem === 2 ? 'bg-[white] text-[#ff6f61]' : ''} rounded-md cursor-pointer space-x-1`}
                        onClick={() => { setActiveItem(2); navigate("/albums"); }}
                    >
                        <PhotoAlbumOutlinedIcon />
                        <span>Albums</span>
                    </ListItem>
                    <Button
                    onClick={() => signOut(firebaseAuth)}
                    sx={{ color: 'white', fontWeight: 800, fontSize: 16 }}
                    className="hidden md:block"
                >
                    Logout
                </Button>
                </ul>

               

                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="end"
                    onClick={handleToggleDrawer(true)}
                    sx={{ display: { xs: 'block', md: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>
                
                <Drawer anchor="bottom" open={toggle} onClose={handleToggleDrawer(false)}>
                    <List sx={{ width: '100%', display:{xs:'block', md:'none'} }}>
                        <ListItem button onClick={() => { setActiveItem(0); navigate("/"); handleToggleDrawer(false)(); }}>
                            <PhotoSizeSelectActualIcon sx={{ mr: 1 }} />
                            <ListItemText primary="Photos" />
                        </ListItem>
                        <ListItem button onClick={() => { setActiveItem(1); navigate("/videoss"); handleToggleDrawer(false)(); }}>
                            <VideoLibraryOutlinedIcon sx={{ mr: 1 }} />
                            <ListItemText primary="Videos" />
                        </ListItem>
                        <ListItem button onClick={() => { setActiveItem(2); navigate("/albums"); handleToggleDrawer(false)(); }}>
                            <PhotoAlbumOutlinedIcon sx={{ mr: 1 }} />
                            <ListItemText primary="Albums" />
                        </ListItem>
                        <Divider/>
                        <ListItem button onClick={() => { signOut(firebaseAuth); handleToggleDrawer(false)(); }}>
                            <ListItemText primary="Logout" />
                        </ListItem>
                    </List>
                </Drawer>
            </div>
        </AppBar>
    );
};

export default Navbar;

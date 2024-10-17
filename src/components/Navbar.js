import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { AppBar } from '@mui/material';
import VideoLibraryOutlinedIcon from '@mui/icons-material/VideoLibraryOutlined';
import PhotoAlbumOutlinedIcon from '@mui/icons-material/PhotoAlbumOutlined';
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';
import {firebaseAuth}  from '../firebase/Config'
import { signOut } from 'firebase/auth';


const ListItem = ({ children, path, Icon, setPosition, isActive, setActiveItem, index }) => {
    const ref = useRef(null);
    const navigate = useNavigate();
    const handleHover = () => {
        if (!ref.current) return;
        const { width, left } = ref.current.getBoundingClientRect();
        setPosition({
            width,
            left,
            opacity: 1,
        });
    };

    const handleClick = () => {
        handleHover();
        setActiveItem(index);
        navigate(path);
    };

    return (
        <motion.li
        whileHover={
            {
               scale:1.1
            }
        }
            ref={ref}
            className={`cursor-pointer relative z-10 flex items-center gap-2 px-2 
        transition-colors duration-300`}
          
            onClick={handleClick}
        >
            <Icon />
            {children}
        </motion.li>
    );
};


 const Navbar = () => {
    const [position, setPosition] = useState({
        opacity: 0,
        left: 0,
        width: 0,
    });
    const [activeItem, setActiveItem] = useState(null);
  
    return (
        <AppBar className="fixed h-16 grid place-content-center  z-0" sx={{ bgcolor: '#ff6f61' }}>
            <ul className="relative flex justify-between px-6 h-full items-center">
                <ListItem
                    path="/"
                    Icon={PhotoSizeSelectActualIcon}
                    setPosition={setPosition}
                    isActive={activeItem === 0}
                    setActiveItem={setActiveItem}
                    index={0}
                >
                    Photos
                </ListItem>
                <ListItem
                    path="/videoss"
                    Icon={VideoLibraryOutlinedIcon}
                    setPosition={setPosition}
                    isActive={activeItem === 1}
                    setActiveItem={setActiveItem}
                    index={1}
                >
                    Videos
                </ListItem>
                <ListItem
                    path="/albums"
                    Icon={PhotoAlbumOutlinedIcon}
                    setPosition={setPosition}
                    isActive={activeItem === 2}
                    setActiveItem={setActiveItem}
                    index={2}
                >
                    Albums
                </ListItem>
               <button onClick={()=> signOut(firebaseAuth)}>
                Logout
               </button>

                <motion.li
                    animate={position}
                    className="absolute bottom-0 h-1 z-0 bg-white rounded-sm"
                    style={{ left: position.left, width: position.width }}
                    transition={{ duration: 0.3 }}
                />
            </ul>
        </AppBar>
    );
};

export default Navbar;

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate ,Link } from 'react-router-dom';
import { AppBar, Button, ListItem } from '@mui/material';
import VideoLibraryOutlinedIcon from '@mui/icons-material/VideoLibraryOutlined';
import PhotoAlbumOutlinedIcon from '@mui/icons-material/PhotoAlbumOutlined';
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';
import { firebaseAuth } from '../firebase/Config'
import { signOut } from 'firebase/auth';

const Navbar = () => {

    const [activeItem, setActiveItem] = useState(0);
    let navigator = useNavigate();
    return (
        <AppBar className="fixed h-16 grid place-content-center pr-6 z-0" sx={{ bgcolor: '#ff6f61' }}>
            <div className="relative flex justify-between px-6 h-full items-center overflow-clip">

                <Link path=''> <img src='Images/logow.png' className='max-w-32 md:max-w-44 -ml-5'></img></Link>

                <ul className="relative flex justify-between px-6 h-full items-center text-white md:gap-6 lg:gap-8 xl:gap-10 md:text-[20px] ">

                    <ListItem
                        className={`${activeItem === 0 ? 'bg-[white] text-[#ff6f61]' : ''} rounded-md cursor-pointer space-x-1`}
                        onClick={() => { setActiveItem(0); navigator("/") }}
                    >
                        <PhotoSizeSelectActualIcon />
                        <span>Photos</span>
                    </ListItem>
                    <ListItem
                        className={`${activeItem === 1 ? 'bg-[white] text-[#ff6f61]' : ''} rounded-md cursor-pointer space-x-1`}
                        onClick={() => { setActiveItem(1); navigator('/videoss') }}
                    >
                        <VideoLibraryOutlinedIcon />
                        <span>Videos</span>
                    </ListItem>
                    <ListItem
                        className={`${activeItem === 2 ? 'bg-[white] text-[#ff6f61]' : ''} rounded-md cursor-pointer space-x-1`}
                        path="/albums"

                        onClick={() => { setActiveItem(2); navigator("/albums") }}

                    >
                        <PhotoAlbumOutlinedIcon />
                        <span>Albums</span>
                    </ListItem>
                </ul>
                <Button onClick={() => signOut(firebaseAuth)} sx={{ color: 'white', fontWeight: 800, fontSize: 16 }} className='italic font-extrabold'>
                    Logout
                </Button>
            </div>
        </AppBar>
    );
};

export default Navbar;

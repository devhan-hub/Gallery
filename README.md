# RikhaGallery
![logow](https://github.com/user-attachments/assets/7b236039-cd87-4318-bab1-2ab98364244d)

## Live
[rikha-gallery.app](url)


## Screenshots
<img width="952" alt="image" src="https://github.com/user-attachments/assets/34c40c06-2be0-441e-a9f4-0fcc7c4eb137">
<img width="949" alt="image" src="https://github.com/user-attachments/assets/19f99111-a3e5-40f5-abc0-ffbf47e970a2">
<img width="472" alt="image" src="https://github.com/user-attachments/assets/cf578561-d764-49d7-880b-0bf94e529d73">

<img width="929" alt="image" src="https://github.com/user-attachments/assets/8ffd4261-d02f-499b-9fb9-71b437633414">
<img width="953" alt="image" src="https://github.com/user-attachments/assets/c003dca9-85ce-49c0-8019-e1b1364b6fdf">
<img width="942" alt="image" src="https://github.com/user-attachments/assets/d5ea059b-6a2e-40e7-8ac8-eee0b313b261">
<img width="950" alt="image" src="https://github.com/user-attachments/assets/15828d43-fe70-4b10-a848-2ca50ff87585">


## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Technology Stack](#technology-stack)
4. [Project Structure](#project-structure)
5. [Setup and Installation](#setup-and-installation)
6. [Database Schema](#database-Schema)
7. [Authors](#authors)
8. [License](#license)

## Introduction

Imagine this: You’ve captured the perfect sunset or a fun night with friends, but those precious memories are scattered across your device. **RikhaGallery!** This web app transforms how you store and share your media. 

With just a few clicks, you can upload photos and videos, create personalized albums, and enjoy a slideshow that brings your memories to life. Plus, managing your media is a breeze—you can move and copy items between albums in seconds. 

Why wait? Join us and keep your memories organized and accessible!

## Features

- **User Authentication**: sign-in , sign-up , logout.
- **Photo and Video Upload**: Upload images and videos with ease.
- **Manage Images and Videos**:
  - Delete unwanted images or videos.
  - Add any image or video to albums.
- **Albums**:
  - Create new albums to organize your media.
  - View album content, delete albums, and manage album items.
  - Move or copy items between albums.
- **Slideshow**: View individual images or videos in slideshow mode for a better experience.

  ## Technology Stack

- **Database**: Firestore (NoSQL Database)
- **Frontend**: React +Tailwind CSS
- **Authentication**: Firebase Authentication
- **Hosting**: Vercel (for frontend deployment)
- **Storage**: Firebase Storage (for images and videos)

## Project Structure
   ```plaintext
 LICENSE
├── README.md
├── package-lock.json
├── package.json
├── public
│   ├── Images
│   │   ├── galery3.png
│   │   ├── gallery.png
│   │   └── logow.png
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── src
│   ├── components
│   │   ├── AlbumView.js
│   │   ├── App.js
│   │   ├── GenericDialog.js
│   │   ├── LoginForm.js
│   │   ├── Main.js
│   │   ├── MoveToAlbumDialog.js
│   │   ├── Navbar.js
│   │   ├── NewAlbum.js
│   │   ├── Notfound.js
│   │   ├── PictureDisplay.js
│   │   ├── Progress.js
│   │   ├── SlideDialog.js
│   │   ├── UploadForm.js
│   │   ├── Validate.js
│   │   └── Video.js
│   ├── firebase
│   │   └── Config.js
│   ├── hooks
│   │   ├── useAuth.js
│   │   ├── useFirestore.js
│   │   ├── useFirestoreAlbum.js
│   │   └── useStorage.js
│   ├── index.css
│   └── index.js
└── tailwind.config.js
```  
## Setup and installation
1.  **clone the repository**

 git clone https://github.com/devhan-hub/Gallery.git
 
3. **Navigate into the Directory**]
 
   cd Gallery

 3. **Install dependencies**
    
      npm install
    or
      yarn install
    
 5. **Run the Appication**

   npm run
    or
    yarn run
    
## Database Schema

### User Collection
- **Collection Name**: `users`
  - **Document ID**: `userId`
    - `_id`: String (User ID)
    - `name`: String (User's name)
    - `email`: String (User's email)
    - `password`: String (Hashed password)
    - `created_at`: Timestamp (Account creation date)

### Media Collections
- **Photos Collection**: `users/{userId}/photos`
  - **Document ID**: `photoId`
    - `url`: String (Download URL for the photo)
    - `createdAt`: Timestamp (Upload date)
    - `type`: String (Type of media, e.g., 'photo')
    - `storagePath`: String (Path in Firebase Storage)

- **Videos Collection**: `users/{userId}/videos`
  - **Document ID**: `videoId`
    - `url`: String (Download URL for the video)
    - `createdAt`: Timestamp (Upload date)
    - `type`: String (Type of media, e.g., 'video')
    - `storagePath`: String (Path in Firebase Storage)

### Albums Collection
- **Collection Path**: `users/{userId}/albums`
  - **Document ID**: `albumId`
    - `name`: String (Album name)
    - `files`: Array of Strings (URLs of media in the album)
    - `ids`: Array of Strings (IDs of media in the album)
    - `createdAt`: Timestamp (Album creation date)

     ## Authors
       Hanan Abdushikur -[GitHub](https://github.com/devhan-hub)/[LinkedIn](https://linkedin.com/in/hanan-abdulshikur)

    ## License
      Copyright (C) Licensed under the MIT License

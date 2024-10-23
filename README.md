# RikhaGallery
![logo6](https://github.com/user-attachments/assets/19e69f13-3de6-4a4d-9d99-72e4eb05f6d7)
## Live
[rikha-gallery.app](url)


## Screenshots
<img src="https://github.com/user-attachments/assets/a56af569-9063-44b0-a141-ae87faf2e58d" alt="Screenshot 1" width="400" />

<img src="https://github.com/user-attachments/assets/87593d19-9c57-40f1-a581-ba34dbd276db" alt="Screenshot 2" width="400" />

<img src="https://github.com/user-attachments/assets/49a0a09b-f908-4117-8240-ba6acec0d4fa" alt="Upload PNG" width="400" />

<img src="https://github.com/user-attachments/assets/0579c61c-3db7-463f-9269-15e99839b5dd" alt="Screenshot 4" width="400" />


<img src="https://github.com/user-attachments/assets/78cd6f2c-21ae-4df2-ad8d-6a11c085e924" alt="Screenshot 5" width="400" />


<img src="https://github.com/user-attachments/assets/bdd02043-23e1-4600-a671-6760137e02e7" alt="Side" width="400" />

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Technology Stack](#technology-stack)
4. [Project Structure](#project-structure)
5. [Setup and Installation](#setup-and-installation)
6. [Database Schema](#Database-Schema)
7. [Authors](#Authors)
8. License

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

##Project Structure
 
## Setup and installation
1.  **clone the repository**

 git clone https://github.com/devhan-hub/Gallery.git
 
3. **Navigate into the Directory**
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
      #Hanan Abdushikur -[GitHub](https://github.com/devhan-hub)/[LinkedIn](linkedin.com/in/hanan-abdulshikur)

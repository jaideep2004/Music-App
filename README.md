# 🎧 Full Stack React Music Platform

A modern, high-fidelity music platform with admin upload capabilities and an animated frontend display.

## 📋 Features

### Backend (Admin Panel)
- **Stack**: Node.js, Express, MongoDB Atlas
- **Authentication**: Secure admin authentication with JWT
- **Uploads**: Single track or album uploads with Multer
- **Metadata**: Auto-detection of audio metadata (bitrate, duration, sample rate)
- **Validation**: Cover image validation (3000x3000px)
- **Storage**: File storage with provision for AWS S3 integration
- **API**: RESTful endpoints for track management

### Frontend (User Side)
- **Stack**: React (Vite), Material-UI, Framer Motion
- **Animations**: Smooth entrance animations for cards
- **Responsive**: Mobile-friendly design
- **UI Components**: 
  - Animated track cards with hover effects
  - Detailed track/album view pages
  - Global audio player with controls
  - Admin dashboard for track management

## 🚀 Getting Started

### Backend Setup
1. Navigate to the Backend directory:
   ```
   cd Backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables in `.env`:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. Start the development server:
   ```
   npm run dev
   ```

### Frontend Setup
1. From the root directory, install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm run dev
   ```

## 🎨 UI/UX Design

- **Animations**: Framer Motion for smooth transitions
- **Layout**: Responsive grid layout for track cards
- **Player**: Global audio player with play/pause, volume, seek controls
- **Hover Effects**: Blur + overlay details on track cards
- **Pagination**: "View More" button for loading additional tracks

## 📁 Project Structure

```
music-app/
├── Backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── config/
│   ├── uploads/
│   └── server.js
├── src/
│   ├── components/
│   │   ├── admin/
│   │   ├── layout/
│   │   ├── player/
│   │   └── tracks/
│   ├── App.jsx
│   └── main.jsx
├── public/
└── README.md
```

## 🔧 Technical Add-ons

- **Audio Metadata**: Auto-detection using music-metadata library
- **Image Validation**: Cover images must be exactly 3000x3000px
- **File Validation**: Audio files restricted to .mp3, .flac, .wav, .aac
- **Security**: Helmet for security headers, CORS enabled
- **Logging**: Morgan for HTTP request logging

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register admin
- `POST /api/auth/login` - Admin login
- `GET /api/auth/me` - Get user info

### Tracks
- `GET /api/tracks` - Get all tracks
- `GET /api/tracks/:id` - Get track details
- `POST /api/tracks` - Upload track (admin)
- `PATCH /api/tracks/:id` - Update track (admin)
- `DELETE /api/tracks/:id` - Delete track (admin)

## 📦 Dependencies

### Backend
- express, mongoose, jsonwebtoken, bcryptjs
- multer, music-metadata, sharp
- cors, helmet, morgan

### Frontend
- react, react-dom
- react-router-dom
- @mui/material, @mui/icons-material
- framer-motion
- axios

## 🎯 Expected Outcome

A modern, high-fidelity music platform where:
- Admins can manage and upload albums/singles with detailed metadata
- Users can browse and play music with beautiful, animated UI
- Technical audio information is clearly displayed
- The interface is responsive and works on all devices
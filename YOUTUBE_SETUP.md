# YouTube Layout Setup Guide

## Overview

A complete YouTube-inspired video platform with a modern, responsive frontend and RESTful API backend.

## What's Been Built

### Frontend (public/youtube/)
- **index.html** - YouTube-style layout with header, sidebar, and video grid
- **style.css** - Modern dark theme with responsive design
- **script.js** - Dynamic video loading and formatting utilities

### Backend
- **video.controller.js** - Video operations (get all, get by ID, create samples)
- **video.routes.js** - API routes for video endpoints
- **Updated app.js** - Integrated video routes and YouTube layout serving

## Quick Start

### 1. Ensure MongoDB is Running

Make sure your MongoDB instance is running and the connection string is set in your `.env` file:

```env
MONGODB_URL=mongodb://localhost:27017
PORT=8000
CORS_ORIGIN=*
```

### 2. Install Dependencies (if not already done)

```bash
npm install
```

### 3. Start the Server

```bash
npm run dev
```

### 4. Create Sample Videos

To populate the database with sample videos, run:

```bash
curl -X POST http://localhost:8000/api/videos/sample
```

Or use any API client (Postman, Insomnia, etc.) to POST to:
```
http://localhost:8000/api/videos/sample
```

### 5. Access the YouTube Layout

Open your browser and navigate to:
```
http://localhost:8000/youtube
```

Or simply:
```
http://localhost:8000
```
(automatically redirects to /youtube)

## API Endpoints

### Videos

| Method | Endpoint | Description | Query Params |
|--------|----------|-------------|--------------|
| GET | `/api/videos` | Get all videos | `page`, `limit`, `sortBy`, `sortOrder` |
| GET | `/api/videos/:videoId` | Get video by ID | - |
| POST | `/api/videos/sample` | Create sample videos | - |

### Example API Calls

**Get all videos:**
```bash
curl http://localhost:8000/api/videos
```

**Get videos with pagination:**
```bash
curl "http://localhost:8000/api/videos?page=1&limit=10"
```

**Get specific video:**
```bash
curl http://localhost:8000/api/videos/VIDEO_ID_HERE
```

## Features

### UI Features
- ✅ YouTube-style header with logo and search bar
- ✅ Responsive sidebar navigation
- ✅ Video grid with automatic layout
- ✅ Video cards with thumbnails and metadata
- ✅ View count formatting (K, M)
- ✅ Duration display (MM:SS or HH:MM:SS)
- ✅ Time ago formatting (e.g., "2 days ago")
- ✅ Channel avatars with fallback
- ✅ Mobile-responsive design
- ✅ Dark theme

### Backend Features
- ✅ RESTful API for videos
- ✅ Pagination support
- ✅ Sorting options
- ✅ Population of owner/channel data
- ✅ View count tracking
- ✅ Published video filtering

## File Structure

```
/vercel/sandbox/
├── public/
│   └── youtube/
│       ├── index.html      # Main layout
│       ├── style.css       # Styling
│       ├── script.js       # Frontend logic
│       └── README.md       # Frontend docs
├── src/
│   ├── app.js              # Express app (updated)
│   ├── controller/
│   │   └── video.controller.js  # Video operations
│   ├── routes/
│   │   └── video.routes.js      # Video routes
│   └── models/
│       └── video.model.js       # Video schema
└── YOUTUBE_SETUP.md        # This file
```

## Customization

### Adding Real Videos

To add real videos to the database, you can:

1. Create a video upload endpoint
2. Use MongoDB Compass or CLI to insert documents
3. Modify the `createSampleVideos` function with your data

### Video Model Schema

```javascript
{
  videoFile: String,      // Video URL
  thumnail: String,       // Thumbnail URL
  title: String,          // Video title
  discreption: String,    // Description
  duration: Number,       // Duration in seconds
  views: Number,          // View count
  isPublished: String,    // "true" or "false"
  owner: ObjectId,        // Reference to User
  createdAt: Date,        // Auto-generated
  updatedAt: Date         // Auto-generated
}
```

## Troubleshooting

### Videos Not Loading

1. Check if MongoDB is running
2. Verify the database has videos (create samples)
3. Check browser console for errors
4. Verify API endpoint is accessible

### Styling Issues

1. Clear browser cache
2. Check if CSS file is loading (Network tab)
3. Verify static file serving is working

### API Errors

1. Check MongoDB connection
2. Verify environment variables
3. Check server logs for errors

## Next Steps

- Add video upload functionality
- Implement user authentication
- Add video player
- Create video detail page
- Add comments and likes
- Implement search functionality
- Add video recommendations

## Support

For issues or questions, check the console logs and network requests in your browser's developer tools.

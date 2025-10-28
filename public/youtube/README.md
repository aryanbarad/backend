# YouTube Layout

A modern YouTube-inspired video platform interface built with vanilla HTML, CSS, and JavaScript.

## Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **YouTube-like UI**: Familiar interface with header, sidebar, and video grid
- **Dynamic Content**: Videos are fetched from the backend API
- **Modern Styling**: Dark theme with smooth transitions and hover effects

## Structure

```
public/youtube/
├── index.html    # Main HTML structure
├── style.css     # Styling and responsive design
├── script.js     # Dynamic video loading and interactions
└── README.md     # This file
```

## API Endpoints

- `GET /api/videos` - Fetch all videos with pagination
- `GET /api/videos/:videoId` - Get specific video by ID
- `POST /api/videos/sample` - Create sample videos for testing

## Usage

1. Start the server (ensure MongoDB is running)
2. Navigate to `http://localhost:8000/youtube`
3. The page will automatically load and display videos from the database

## Creating Sample Data

To populate the database with sample videos, make a POST request:

```bash
curl -X POST http://localhost:8000/api/videos/sample
```

## Features Implemented

- ✅ YouTube-style header with logo and search bar
- ✅ Collapsible sidebar navigation
- ✅ Responsive video grid layout
- ✅ Video cards with thumbnails, titles, and metadata
- ✅ View count and upload time formatting
- ✅ Duration display on thumbnails
- ✅ Channel avatar display
- ✅ Mobile-responsive design
- ✅ Dark theme UI

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

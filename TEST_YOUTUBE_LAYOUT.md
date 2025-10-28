# YouTube Layout Testing Guide

## Pre-Testing Checklist

- [ ] MongoDB is running
- [ ] Environment variables are set (.env file)
- [ ] Dependencies are installed (`npm install`)
- [ ] No syntax errors in code

## Testing Steps

### 1. Verify File Structure

All files should be in place:

```
✓ public/youtube/index.html
✓ public/youtube/style.css
✓ public/youtube/script.js
✓ src/controller/video.controller.js
✓ src/routes/video.routes.js
✓ src/app.js (updated)
```

### 2. Check JavaScript Syntax

Run the following command to verify no syntax errors:

```bash
node --check src/app.js
node --check src/controller/video.controller.js
node --check src/routes/video.routes.js
```

Expected output: No errors

### 3. Test Static Files (Without Server)

You can open the HTML file directly in a browser to test the layout:

```bash
# On Linux/Mac
open public/youtube/index.html

# Or navigate to the file in your browser
file:///path/to/vercel/sandbox/public/youtube/index.html
```

**Expected Result:**
- YouTube-style header displays
- Sidebar navigation is visible
- "Loading videos..." message appears (API won't work without server)
- Layout is responsive

### 4. Start the Server

```bash
npm run dev
```

**Expected Output:**
```
server is runing on PORT 8000
mongoDB connection is succesful!!HOST ON ...
```

### 5. Test API Endpoints

#### Test 1: Create Sample Videos

```bash
curl -X POST http://localhost:8000/api/videos/sample
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Sample videos created successfully",
  "data": [...]
}
```

#### Test 2: Get All Videos

```bash
curl http://localhost:8000/api/videos
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Videos fetched successfully",
  "data": [...],
  "pagination": {
    "totalDocs": 8,
    "totalPages": 1,
    "currentPage": 1,
    "hasNextPage": false,
    "hasPrevPage": false
  }
}
```

#### Test 3: Get Videos with Pagination

```bash
curl "http://localhost:8000/api/videos?page=1&limit=4"
```

**Expected Response:**
Should return 4 videos with pagination info.

### 6. Test YouTube Layout in Browser

Open your browser and navigate to:
```
http://localhost:8000/youtube
```

Or simply:
```
http://localhost:8000
```

### 7. Visual Testing Checklist

#### Header
- [ ] YouTube logo displays correctly
- [ ] Menu button is visible
- [ ] Search bar is functional (UI only)
- [ ] Voice search button displays
- [ ] User avatar displays
- [ ] All icons are properly aligned

#### Sidebar
- [ ] Home, Shorts, Subscriptions links display
- [ ] Library, History, Watch Later, Liked Videos links display
- [ ] Icons are properly aligned with text
- [ ] Active state (Home) is highlighted
- [ ] Hover effects work on navigation items

#### Video Grid
- [ ] Videos load and display in a grid
- [ ] Video thumbnails display (or placeholder images)
- [ ] Video titles are visible and truncated properly
- [ ] Channel names display
- [ ] View counts are formatted (e.g., "125K views")
- [ ] Upload times show (e.g., "2 days ago")
- [ ] Video durations display on thumbnails
- [ ] Channel avatars display (or gradient fallback)

#### Responsive Design
- [ ] Desktop view (>1024px): Full sidebar with text
- [ ] Tablet view (768-1024px): Collapsed sidebar with icons only
- [ ] Mobile view (<768px): No sidebar, full-width content
- [ ] Search bar adapts to screen size
- [ ] Video grid adjusts columns based on screen width

### 8. Interaction Testing

#### Hover Effects
- [ ] Header buttons change background on hover
- [ ] Sidebar items change background on hover
- [ ] Video cards scale slightly on hover
- [ ] Search button changes background on hover

#### Click Testing
- [ ] Menu button toggles sidebar (mobile)
- [ ] Navigation items are clickable
- [ ] Video cards are clickable (no action yet, but cursor changes)

### 9. Browser Console Testing

Open browser DevTools (F12) and check:

#### Console Tab
- [ ] No JavaScript errors
- [ ] "Loading videos..." or video data logs
- [ ] Successful API fetch messages

#### Network Tab
- [ ] `index.html` loads successfully (200)
- [ ] `style.css` loads successfully (200)
- [ ] `script.js` loads successfully (200)
- [ ] `/api/videos` request succeeds (200)
- [ ] Images load (or 404 for placeholders is acceptable)

#### Elements Tab
- [ ] HTML structure is correct
- [ ] CSS styles are applied
- [ ] Video cards are dynamically generated

### 10. Performance Testing

- [ ] Page loads in under 2 seconds
- [ ] No layout shift during loading
- [ ] Smooth scrolling
- [ ] Smooth hover transitions

### 11. Error Handling Testing

#### Test Empty Database
1. Clear all videos from database
2. Refresh the page
3. **Expected:** "No videos available" message displays

#### Test API Failure
1. Stop the server
2. Refresh the page
3. **Expected:** "Failed to load videos" error message displays

#### Test Invalid Image URLs
1. Videos with invalid thumbnail URLs should show placeholder
2. **Expected:** Placeholder image or broken image icon

## Common Issues and Solutions

### Issue: Videos Not Loading

**Symptoms:**
- "Loading videos..." message persists
- No videos display

**Solutions:**
1. Check if server is running
2. Verify MongoDB connection
3. Create sample videos: `curl -X POST http://localhost:8000/api/videos/sample`
4. Check browser console for errors
5. Verify API endpoint: `curl http://localhost:8000/api/videos`

### Issue: Styling Not Applied

**Symptoms:**
- Plain HTML without styling
- Layout looks broken

**Solutions:**
1. Check if `style.css` is loading (Network tab)
2. Verify file path in `index.html`
3. Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
4. Check for CSS syntax errors

### Issue: API 404 Error

**Symptoms:**
- Network tab shows 404 for `/api/videos`

**Solutions:**
1. Verify `video.routes.js` is created
2. Check `app.js` has `app.use("/api/videos", videoRouter)`
3. Restart the server
4. Check route path matches frontend fetch URL

### Issue: CORS Error

**Symptoms:**
- Console shows CORS policy error

**Solutions:**
1. Verify CORS is enabled in `app.js`
2. Check `CORS_ORIGIN` in `.env` file
3. Set `CORS_ORIGIN=*` for development

### Issue: MongoDB Connection Failed

**Symptoms:**
- Server logs show "mongoDB connection faild!!"

**Solutions:**
1. Start MongoDB: `mongod` or `brew services start mongodb-community`
2. Verify `MONGODB_URL` in `.env` file
3. Check MongoDB is running: `mongo` or `mongosh`

## Success Criteria

✅ All files created without errors
✅ No JavaScript syntax errors
✅ Server starts successfully
✅ MongoDB connects successfully
✅ Sample videos created
✅ API endpoints return data
✅ YouTube layout displays correctly
✅ Videos load and display in grid
✅ Responsive design works on all screen sizes
✅ No console errors
✅ All visual elements render properly

## Next Steps After Testing

Once all tests pass:

1. ✅ Layout is ready for use
2. Consider adding video upload functionality
3. Implement video player
4. Add user authentication
5. Create video detail page
6. Add search functionality
7. Implement comments and likes

## Test Report Template

```
Date: ___________
Tester: ___________

Pre-Testing:
[ ] MongoDB running
[ ] Dependencies installed
[ ] Environment configured

File Structure: [ ] PASS [ ] FAIL
Syntax Check: [ ] PASS [ ] FAIL
Static Files: [ ] PASS [ ] FAIL
Server Start: [ ] PASS [ ] FAIL
API Endpoints: [ ] PASS [ ] FAIL
Layout Display: [ ] PASS [ ] FAIL
Visual Elements: [ ] PASS [ ] FAIL
Responsive Design: [ ] PASS [ ] FAIL
Interactions: [ ] PASS [ ] FAIL
Console Errors: [ ] PASS [ ] FAIL

Overall Result: [ ] PASS [ ] FAIL

Notes:
_________________________________
_________________________________
_________________________________
```

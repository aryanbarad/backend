// Format duration from seconds to MM:SS or HH:MM:SS
function formatDuration(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

// Format views count
function formatViews(views) {
    if (views >= 1000000) {
        return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
        return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
}

// Format time ago
function formatTimeAgo(date) {
    const now = new Date();
    const uploadDate = new Date(date);
    const diffInSeconds = Math.floor((now - uploadDate) / 1000);

    const intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60
    };

    for (const [unit, seconds] of Object.entries(intervals)) {
        const interval = Math.floor(diffInSeconds / seconds);
        if (interval >= 1) {
            return `${interval} ${unit}${interval > 1 ? 's' : ''} ago`;
        }
    }
    return 'just now';
}

// Create video card HTML
function createVideoCard(video) {
    const card = document.createElement('div');
    card.className = 'video-card';
    
    // Get owner info (if available)
    const channelName = video.owner?.fullName || video.owner?.user || 'Unknown Channel';
    const channelAvatar = video.owner?.avatar || '';
    
    card.innerHTML = `
        <div class="video-thumbnail">
            <img src="${video.thumnail || 'https://via.placeholder.com/320x180?text=Video+Thumbnail'}" 
                 alt="${video.title}"
                 onerror="this.src='https://via.placeholder.com/320x180?text=Video+Thumbnail'">
            <span class="video-duration">${formatDuration(video.duration)}</span>
        </div>
        <div class="video-info">
            <div class="channel-avatar">
                ${channelAvatar ? 
                    `<img src="${channelAvatar}" alt="${channelName}" onerror="this.style.display='none'">` : 
                    `<div style="width: 100%; height: 100%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; color: white; font-weight: 500; font-size: 14px;">${channelName.charAt(0).toUpperCase()}</div>`
                }
            </div>
            <div class="video-details">
                <div class="video-title">${video.title}</div>
                <div class="channel-name">${channelName}</div>
                <div class="video-metadata">
                    <span>${formatViews(video.views)} views</span>
                    <span>•</span>
                    <span>${formatTimeAgo(video.createdAt)}</span>
                </div>
            </div>
        </div>
    `;
    
    return card;
}

// Fetch and display videos
async function loadVideos() {
    const videoGrid = document.getElementById('videoGrid');
    
    try {
        const response = await fetch('/api/videos');
        
        if (!response.ok) {
            throw new Error('Failed to fetch videos');
        }
        
        const data = await response.json();
        const videos = data.data || [];
        
        // Clear loading message
        videoGrid.innerHTML = '';
        
        if (videos.length === 0) {
            videoGrid.innerHTML = '<div class="loading">No videos available. Upload some videos to get started!</div>';
            return;
        }
        
        // Create and append video cards
        videos.forEach(video => {
            const card = createVideoCard(video);
            videoGrid.appendChild(card);
        });
        
    } catch (error) {
        console.error('Error loading videos:', error);
        videoGrid.innerHTML = `
            <div class="loading">
                Failed to load videos. Please try again later.
                <br><br>
                <small style="color: #666;">Error: ${error.message}</small>
            </div>
        `;
    }
}

// Sidebar toggle for mobile
const menuBtn = document.querySelector('.menu-btn');
const sidebar = document.querySelector('.sidebar');

if (menuBtn && sidebar) {
    menuBtn.addEventListener('click', () => {
        sidebar.style.display = sidebar.style.display === 'none' ? 'block' : 'none';
    });
}

// Load videos when page loads
document.addEventListener('DOMContentLoaded', loadVideos);

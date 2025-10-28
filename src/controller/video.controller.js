import { Video } from "../models/video.model.js";

// Get all videos with pagination
const getAllVideos = async (req, res) => {
    try {
        const { page = 1, limit = 20, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;

        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
            sort: { [sortBy]: sortOrder === 'asc' ? 1 : -1 },
            populate: {
                path: 'owner',
                select: 'user fullName avatar'
            }
        };

        // Only get published videos
        const aggregate = Video.aggregate([
            {
                $match: {
                    isPublished: { $ne: 'false' }
                }
            }
        ]);

        const videos = await Video.aggregatePaginate(aggregate, options);

        return res.status(200).json({
            success: true,
            message: "Videos fetched successfully",
            data: videos.docs,
            pagination: {
                totalDocs: videos.totalDocs,
                totalPages: videos.totalPages,
                currentPage: videos.page,
                hasNextPage: videos.hasNextPage,
                hasPrevPage: videos.hasPrevPage
            }
        });

    } catch (error) {
        console.error("Error fetching videos:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch videos",
            error: error.message
        });
    }
};

// Get video by ID
const getVideoById = async (req, res) => {
    try {
        const { videoId } = req.params;

        const video = await Video.findById(videoId).populate('owner', 'user fullName avatar');

        if (!video) {
            return res.status(404).json({
                success: false,
                message: "Video not found"
            });
        }

        // Increment views
        video.views += 1;
        await video.save();

        return res.status(200).json({
            success: true,
            message: "Video fetched successfully",
            data: video
        });

    } catch (error) {
        console.error("Error fetching video:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch video",
            error: error.message
        });
    }
};

// Create sample videos (for testing)
const createSampleVideos = async (req, res) => {
    try {
        const sampleVideos = [
            {
                videoFile: "https://example.com/video1.mp4",
                thumnail: "https://picsum.photos/seed/video1/320/180",
                title: "Building a Full Stack Application with MERN",
                discreption: "Learn how to build a complete full stack application using MongoDB, Express, React, and Node.js",
                duration: 1245,
                views: 125000,
                isPublished: "true",
                owner: req.body.userId || null
            },
            {
                videoFile: "https://example.com/video2.mp4",
                thumnail: "https://picsum.photos/seed/video2/320/180",
                title: "JavaScript ES6+ Features You Must Know",
                discreption: "Comprehensive guide to modern JavaScript features including arrow functions, destructuring, and more",
                duration: 892,
                views: 89000,
                isPublished: "true",
                owner: req.body.userId || null
            },
            {
                videoFile: "https://example.com/video3.mp4",
                thumnail: "https://picsum.photos/seed/video3/320/180",
                title: "CSS Grid and Flexbox Complete Tutorial",
                discreption: "Master modern CSS layout techniques with Grid and Flexbox",
                duration: 1567,
                views: 234000,
                isPublished: "true",
                owner: req.body.userId || null
            },
            {
                videoFile: "https://example.com/video4.mp4",
                thumnail: "https://picsum.photos/seed/video4/320/180",
                title: "Node.js Best Practices 2024",
                discreption: "Learn the best practices for building scalable Node.js applications",
                duration: 945,
                views: 67000,
                isPublished: "true",
                owner: req.body.userId || null
            },
            {
                videoFile: "https://example.com/video5.mp4",
                thumnail: "https://picsum.photos/seed/video5/320/180",
                title: "React Hooks Deep Dive",
                discreption: "Understanding React Hooks: useState, useEffect, useContext and custom hooks",
                duration: 1123,
                views: 156000,
                isPublished: "true",
                owner: req.body.userId || null
            },
            {
                videoFile: "https://example.com/video6.mp4",
                thumnail: "https://picsum.photos/seed/video6/320/180",
                title: "MongoDB Aggregation Framework Tutorial",
                discreption: "Master MongoDB aggregation pipeline for complex data queries",
                duration: 1834,
                views: 45000,
                isPublished: "true",
                owner: req.body.userId || null
            },
            {
                videoFile: "https://example.com/video7.mp4",
                thumnail: "https://picsum.photos/seed/video7/320/180",
                title: "RESTful API Design Best Practices",
                discreption: "Learn how to design clean and maintainable REST APIs",
                duration: 756,
                views: 98000,
                isPublished: "true",
                owner: req.body.userId || null
            },
            {
                videoFile: "https://example.com/video8.mp4",
                thumnail: "https://picsum.photos/seed/video8/320/180",
                title: "Git and GitHub for Beginners",
                discreption: "Complete guide to version control with Git and GitHub",
                duration: 1456,
                views: 312000,
                isPublished: "true",
                owner: req.body.userId || null
            }
        ];

        const createdVideos = await Video.insertMany(sampleVideos);

        return res.status(201).json({
            success: true,
            message: "Sample videos created successfully",
            data: createdVideos
        });

    } catch (error) {
        console.error("Error creating sample videos:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to create sample videos",
            error: error.message
        });
    }
};

export {
    getAllVideos,
    getVideoById,
    createSampleVideos
};

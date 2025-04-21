import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Stack, Divider } from "@mui/material";
import axios from "axios";

const BACKEND_API_Link = import.meta.env.VITE_BASE_SERVER_URL;

interface Post {
  id: number;
  content: string;
  author: string;
  likes: number;
  dislikes: number;
  user_liked: boolean;
  user_disliked: boolean;
}

const CommunityTab: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState("");
  const authToken = localStorage.getItem("authToken");
  const userId = authToken ? parseInt(JSON.parse(authToken).userId) : null;

  // Fetch posts from the API
  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${BACKEND_API_Link}/community/posts`, {
        params: { userId },
      });
      setPosts(response.data.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  // Add a new post
  const handleAddPost = async () => {
    if (newPost.trim()) {
      try {
        const response = await axios.post(`${BACKEND_API_Link}/community/create`, {
          content: newPost,
          authorId: userId,
        });
        setPosts((prev) => [...prev, response.data.data]);
        setNewPost("");
      } catch (error) {
        console.error("Error creating post:", error);
      }
    }
  };

  // Handle like or dislike interaction
  const handleInteraction = async (id: number, action: "like" | "dislike") => {
    try {
      const post = posts.find((p) => p.id === id);
      if (!post) return;

      const isLike = action === "like";
      const alreadyLiked = post.user_liked;
      const alreadyDisliked = post.user_disliked;

      // Determine the interaction state
      const like = isLike ? !alreadyLiked : false;
      const dislike = !isLike ? !alreadyDisliked : false;

      // Send interaction update to the backend
      await axios.post(`${BACKEND_API_Link}/community/interact`, {
        userId,
        postId: id,
        like,
        dislike,
      });

      // Update the local state
      setPosts((prev) =>
        prev.map((p) =>
          p.id === id
            ? {
                ...p,
                likes: like ? p.likes + 1 : alreadyLiked ? p.likes - 1 : p.likes,
                dislikes: dislike
                  ? p.dislikes + 1
                  : alreadyDisliked
                  ? p.dislikes - 1
                  : p.dislikes,
                user_liked: like,
                user_disliked: dislike,
              }
            : p
        )
      );
    } catch (error) {
      console.error(`Error updating ${action} interaction:`, error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Community Tab
      </Typography>
      <Box sx={{ mb: 4 }}>
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="Write a new post..."
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            resize: "none",
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddPost}
          sx={{ mt: 2 }}
        >
          Add Post
        </Button>
      </Box>
      <Divider sx={{ mb: 4 }} />
      <Stack direction="column-reverse" spacing={2}>
        {posts.map((post) => (
          <Box
            key={post.id}
            sx={{
              p: 2,
              border: "1px solid #ccc",
              borderRadius: "8px",
            }}
          >
            <Typography variant="body1">{post.content}</Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: "block", mt: 1 }}
            >
              Posted by: {post.author}
            </Typography>
            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
              <Button
                size="small"
                variant="outlined"
                onClick={() => handleInteraction(post.id, "like")}
                sx={{
                  color: post.user_liked ? "white" : "inherit",
                  backgroundColor: post.user_liked ? "green" : "inherit",
                  borderColor: post.user_liked ? "green" : "inherit",
                }}
              >
                👍 {post.likes}
              </Button>
              <Button
                size="small"
                variant="outlined"
                onClick={() => handleInteraction(post.id, "dislike")}
                sx={{
                  color: post.user_disliked ? "white" : "inherit",
                  backgroundColor: post.user_disliked ? "red" : "inherit",
                  borderColor: post.user_disliked ? "red" : "inherit",
                }}
              >
                👎 {post.dislikes}
              </Button>
            </Stack>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default CommunityTab;
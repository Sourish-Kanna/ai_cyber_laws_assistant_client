import React, { useState, useEffect } from "react";
import {
  Box, Typography, Button, Stack, Divider, Snackbar, Alert, ToggleButton, ToggleButtonGroup
} from "@mui/material";
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
  const [sortBy, setSortBy] = useState<"recent" | "popular">("recent");
  const [loadingInteraction, setLoadingInteraction] = useState<number | null>(null);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: "success" | "error" }>({ open: false, message: "", severity: "success" });
  const [requestingUser, setRequestingUser] = useState<string>(""); 

  const authToken = localStorage.getItem("authToken");
  const userId = authToken ? parseInt(JSON.parse(authToken)) : 7;

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${BACKEND_API_Link}/community/posts`, {
        params: { userId },
      });
      if (response.data.status !== "success") {
        setSnackbar({ open: true, message: "Error fetching posts", severity: "error" });
        return;
      }

      setRequestingUser(response.data.data.requestingUser);

      let sortedPosts = response.data.data.posts;
      if (sortBy === "popular") {
        sortedPosts = [...sortedPosts].sort((a: Post, b: Post) => (b.likes - b.dislikes) - (a.likes - a.dislikes));
      } else {
        sortedPosts = [...sortedPosts].reverse();
      }
      setPosts(sortedPosts);
    } catch (error) {
      setSnackbar({ open: true, message: "Error fetching posts", severity: "error" });
    }
  };

  const handleAddPost = async () => {
    if (userId === 7) {
      setSnackbar({
        open: true,
        message: "Please log in to add a post.",
        severity: "error",
      });
      // Wait 3 seconds before redirecting to the login page
      setTimeout(() => {
        window.location.href = "/login";
      }, 3000);
      return;
    }

    if (newPost.trim()) {
      try {
        const response = await axios.post(`${BACKEND_API_Link}/community/create`, {
          content: newPost,
          authorId: userId,
        });

        const newPostData = {
          ...response.data.data,
          author: requestingUser,
          likes: 0,
          dislikes: 0,
          user_liked: false,
          user_disliked: false,
        };

        setPosts((prev) => [...prev, newPostData]);
        setNewPost("");
        setSnackbar({ open: true, message: "Post added successfully", severity: "success" });
      } catch (error) {
        setSnackbar({ open: true, message: "Error creating post", severity: "error" });
      }
    }
  };

  const handleInteraction = async (id: number, action: "like" | "dislike") => {
    if (userId === 7) {
      setSnackbar({
        open: true,
        message: "Please log in to interact with posts.",
        severity: "error",
      });
      // Wait 3 seconds before redirecting to the login page
      setTimeout(() => {
        window.location.href = "/login";
      }, 3000);
      return;
    }

    const post = posts.find((p) => p.id === id);
    if (!post || loadingInteraction === id) return;

    const isLike = action === "like";
    const alreadyLiked = post.user_liked;
    const alreadyDisliked = post.user_disliked;

    // Prevent liking and disliking at the same time
    if ((isLike && alreadyDisliked) || (!isLike && alreadyLiked)) {
      setSnackbar({
        open: true,
        message: "You can't like and dislike a post simultaneously.",
        severity: "error",
      });
      return;
    }

    const like = isLike ? !alreadyLiked : false;
    const dislike = !isLike ? !alreadyDisliked : false;

    try {
      setLoadingInteraction(id);
      await axios.post(`${BACKEND_API_Link}/community/interact`, {
        userId,
        postId: id,
        like,
        dislike,
      });

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
      setSnackbar({ open: true, message: "Interaction updated", severity: "success" });
    } catch (error) {
      setSnackbar({ open: true, message: "Error updating interaction", severity: "error" });
    } finally {
      setLoadingInteraction(null);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [sortBy]);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>Community Tab</Typography>

      {/* Toggle Buttons */}
      <ToggleButtonGroup
        color="primary"
        value={sortBy}
        exclusive
        onChange={(_, value) => value && setSortBy(value)}
        sx={{ mb: 2 }}
      >
        <ToggleButton value="recent">Oldest</ToggleButton>
        <ToggleButton value="popular">Recent</ToggleButton>
      </ToggleButtonGroup>

      {/* Post input */}
      <Box sx={{ mb: 4 }}>
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="Write a new post..."
          style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ccc", resize: "none" }}
          // disabled={userId === 7} // Disable input for anonymous users
        />
        <Button variant="contained" onClick={handleAddPost} sx={{ mt: 2 }}> {/*disabled={userId === 7}>*/}
          Add Post
        </Button>
      </Box>

      <Divider sx={{ mb: 4 }} />
      <Stack direction="column-reverse" spacing={2}>
        {posts.map((post) => (
          <Box key={post.id} sx={{ p: 2, border: "1px solid #ccc", borderRadius: "8px" }}>
            <Typography>{post.content}</Typography>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
              Posted by: {post.author}
            </Typography>
            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
              <Button
                size="small"
                disabled={loadingInteraction === post.id} // || userId === 7} // Disable for anonymous users
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
                disabled={loadingInteraction === post.id } //|| userId === 7} // Disable for anonymous users
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

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CommunityTab;

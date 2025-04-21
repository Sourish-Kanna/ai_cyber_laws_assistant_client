import React, { useState } from "react";
import { Box, Typography, Button, Stack, Divider } from "@mui/material";

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
  const [posts, setPosts] = useState<Post[]>([
    { id: 1, content: "Welcome to the community!", author: "Admin", likes: 10, dislikes: 2, user_liked: false, user_disliked: false },
  ]);
  const [newPost, setNewPost] = useState("");

  const handleAddPost = () => {
    if (newPost.trim()) {
      setPosts([
        ...posts,
        { id: posts.length + 1, content: newPost, author: "You", likes: 0, dislikes: 0, user_liked: false, user_disliked: false },
      ]);
      setNewPost("");
    }
  };

  const handleLike = (id: number) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id
          ? {
              ...post,
              likes: post.user_liked ? post.likes - 1 : post.likes + 1,
              user_liked: !post.user_liked,
            }
          : post
      )
    );
  };

  const handleDislike = (id: number) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id
          ? {
              ...post,
              dislikes: post.user_disliked ? post.dislikes - 1 : post.dislikes + 1,
              user_disliked: !post.user_disliked,
            }
          : post
      )
    );
  };

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
              onClick={() => {
              if (!post.user_liked) {
                handleLike(post.id);
                if (post.user_disliked) {
                handleDislike(post.id);
                }
              } else {
                handleLike(post.id);
              }
              }}
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
              onClick={() => {
              if (!post.user_disliked) {
                handleDislike(post.id);
                if (post.user_liked) {
                handleLike(post.id);
                }
              } else {
                handleDislike(post.id);
              }
              }}
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
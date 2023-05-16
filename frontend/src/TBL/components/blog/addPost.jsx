import React, { useState } from "react";
import axios from "axios";

const AddPostPage = ({ history }) => {
  const [title, setTitle] = useState("");
  const [intro, setIntro] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [description, setDescription] = useState("");
  const [publishedCommunity, setPublishedCommunity] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTitleChange = (event) => setTitle(event.target.value);
  const handleIntroChange = (event) => setIntro(event.target.value);
  const handleCoverImageChange = (event) =>
    setCoverImage(event.target.files[0]);
  const handleDescriptionChange = (event) => setDescription(event.target.value);
  const handlePublishedCommunityChange = (event) =>
    setPublishedCommunity(event.target.value);
  const handleAuthorChange = (event) => setAuthor(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      // Create FormData object to send form data as multipart/form-data
      const formData = new FormData();
      await formData.append("title", title);
      await formData.append("intro", intro);
      await formData.append("coverImage", coverImage);
      await formData.append("description", description);
      await formData.append("publishedCommunity", publishedCommunity);
      await formData.append("author", author);

      // Make POST request to API to create new post
      await axios.post(
        "/api/post/posts/",
        {
          title,
          intro,
          coverImage,
          description,
          publishedCommunity,
          author,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Redirect to homepage
      // history.push('/');
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Add Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          <label htmlFor="intro">Intro:</label>
          <textarea id="intro" value={intro} onChange={handleIntroChange} />
        </div>
        <div>
          <label htmlFor="coverImage">Cover Image:</label>
          <input
            type="file"
            id="coverImage"
            onChange={handleCoverImageChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>
        <div>
          <label htmlFor="publishedCommunity">Published Community:</label>
          <input
            type="text"
            id="publishedCommunity"
            value={publishedCommunity}
            onChange={handlePublishedCommunityChange}
          />
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={handleAuthorChange}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Post"}
        </button>
      </form>
    </div>
  );
};

export default AddPostPage;

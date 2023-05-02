import React, { useState } from 'react';
import axios from 'axios';

const AddPost = () => {
  const [title, setTitle] = useState('');
  const [intro, setIntro] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const [description, setDescription] = useState('');
  const [publishedCommunity, setPublishedCommunity] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTitleChange = (event) => setTitle(event.target.value);
  const handleIntroChange = (event) => setIntro(event.target.value);
  const handleCoverImageChange = (event) => setCoverImage(event.target.files[0]);
  const handleDescriptionChange = (event) => setDescription(event.target.value);
  const handlePublishedCommunityChange = (event) => setPublishedCommunity(event.target.value);
  const handleAuthorChange = (event) => setAuthor(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      // Create FormData object to send form data as multipart/form-data
      const formData = new FormData();
      formData.append('title', title);
      formData.append('intro', intro);
      formData.append('coverImage', coverImage);
      formData.append('description', description);
      formData.append('publishedCommunity', publishedCommunity);
      formData.append('author', author);

      // Make POST request to API to create post
      await axios.post('/api/posts', formData);

      // Reset form
      setTitle('');
      setIntro('');
      setCoverImage(null);
      setDescription('');
      setPublishedCommunity('');
      setAuthor('');
      setLoading(false);
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
          <input type="text" id="title" value={title} onChange={handleTitleChange} />
        </div>
        <div>
          <label htmlFor="intro">Intro:</label>
          <textarea id="intro" value={intro} onChange={handleIntroChange} />
        </div>
        <div>
          <label htmlFor="coverImage">Cover Image:</label>
          <input type="file" id="coverImage" onChange={handleCoverImageChange} />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea id="description" value={description} onChange={handleDescriptionChange} />
        </div>
        <div>
          <label htmlFor="publishedCommunity">Published Community:</label>
          <input type="text" id="publishedCommunity" value={publishedCommunity} onChange={handlePublishedCommunityChange} />
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input type="text" id="author" value={author} onChange={handleAuthorChange} />
        </div>
        <button type="submit" disabled={loading}>Submit</button>
      </form>
    </div>
  );
};

export default AddPost;

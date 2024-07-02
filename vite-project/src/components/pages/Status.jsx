import React, { useState } from 'react';
import axios from 'axios';

const VideoUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    // Create a preview URL for the selected video
    if (file) {
      const preview = URL.createObjectURL(file);
      console.log(preview);
      setPreviewUrl(preview);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus('No file selected.');
      return;
    }

    // const formData = new FormData();
    // formData.append('video', selectedFile);

    // try {
    //   const response = await axios.post('/upload', formData, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   });
    //   setUploadStatus(response.data.message);
    // } catch (error) {
    //   setUploadStatus('Error uploading file.');
    //   console.error('Error uploading file:', error);
    // }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {previewUrl && (
        <div>
          <h3>Video Preview:</h3>
          <video width="400" controls>
            <source src={previewUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
      <button onClick={handleUpload}>Upload Video</button>
      <p>{uploadStatus}</p>
    </div>
  );
};

export default VideoUpload;

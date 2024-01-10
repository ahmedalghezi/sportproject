import React, { useState, useRef, useEffect } from 'react';
import AvatarEditor from 'react-avatar-editor';
import PostSignup from '../../DB/postSignup';

const ProfilePictureUpload = ({ onRedirect, onFileName }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  // const [editorWidth, setEditorWidth] = useState(null);
  // const [editorHeight, setEditorHeight] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [loggedIn, setLoggedIn] = useState(false);
  const [fileName, setFileName] = useState(null);
  const fileInputRef = useRef(null);
  const editorRef = useRef(null);
  // const [editor, setEditor] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const editorWidth = 160; 
  const editorHeight = 160;

  useEffect(() => {
    checkLoginStatus();
  }, []);

const checkLoginStatus = () => {
    PostSignup.isLogin()
      .then((response) => {
        if (response.data.res === 'ok') {
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
        }
      })
      .catch((error) => {
        console.error('Error checking login status:', error);
      });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleCrop = () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImage();
      setAvatar(canvas.toDataURL());
    }
  };

  const handleSubmit = async () => {
    if (loggedIn) {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
  
        img.crossOrigin = 'Anonymous'; 
        img.src = avatar; 
  
        img.onload = () => {
          const canvasSize = 150; // Size of the circular image
          canvas.width = canvasSize;
          canvas.height = canvasSize;
  
          ctx.beginPath();
          ctx.arc(canvasSize / 2, canvasSize / 2, canvasSize / 2, 0, Math.PI * 2, true);
          ctx.closePath();
          ctx.clip();
  
          ctx.drawImage(img, 0, 0, canvasSize, canvasSize);
  
          const circularImageURL = canvas.toDataURL();
  
          const image = circularImageURL.split(',')[1];
          const byteCharacters = atob(image);
          const byteNumbers = new Array(byteCharacters.length);
  
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
  
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], { type: 'image/png' });
  
          const formData = new FormData();
          formData.append('image', blob, 'image.png');
  
          uploadFormData(formData);
        };
        
        img.onerror = (error) => {
          console.error('Error loading image:', error);
          
        };
      } catch (error) {
        console.error('Error processing image:', error);
        
      }
    } else {
      console.log("Open login page");
      window.open(window.location.origin + "/reg", '_blank').focus();
    }
  };
  
  const uploadFormData = async (formData) => {
    try {
      const response = await fetch('https://inprove-sport.info/files/jYdncTzQdkdPzxnTanxBst/sendProfileImage', {
        method: 'POST',
        body: formData
      });
  
      if (response.ok) {
        const data = await response.json();
        // console.log('Image name:', data.fileName);
        setFileName(data.fileName);
        onFileName(data.fileName);
        setSuccessMessage('Image uploaded successfully!');
      } else {
        console.error('Failed to upload image');
        console.log('Response:', await response.json());
        onFileName(null);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      
      onFileName(null);
    }
  };

  const handleRedirect = () => {
    // console.log("fileName set is : ", fileName)
    window.location.href = `${window.location.origin}/reg/chaithra/Avatar`;
    onRedirect();
  };
  
  return (
    <div >
      
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        ref={fileInputRef}
        style={{ display: 'none' }}
      />
      <button onClick={() => fileInputRef.current.click()}>Choose Picture</button>
      <button onClick={handleRedirect}>Go back</button>
      {selectedFile && (
        <div>
          <div style={{ position: 'relative', backgroundColor: 'grey',overflow: 'hidden' }}>
          
          <AvatarEditor
            ref={editorRef}
            image={selectedFile}
            width={editorWidth}
            height={editorHeight}
            borderRadius={75}
            color={[255, 255, 255, 0.6]}
            scale={zoom}
          />
          </div>
          <div>
            <button onClick={() => setZoom(zoom + 0.1)}>Zoom In</button>
            <button onClick={() => setZoom(zoom - 0.1)}>Zoom Out</button>
          </div>
          <button onClick={handleCrop}>Crop Picture</button>
          
          {avatar && (
            <div>
              <p>Preview:</p>
              <div style={{ width: editorWidth, height: editorHeight, overflow: 'hidden', borderRadius: '50%', border: '2px solid black' }}>
                <img src={avatar} alt="Avatar" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
              </div>
              {<button onClick={handleSubmit}>Upload Profile</button>}
            </div>
          )}

        
        </div>
      )}
    </div>
  );
};

export default ProfilePictureUpload;




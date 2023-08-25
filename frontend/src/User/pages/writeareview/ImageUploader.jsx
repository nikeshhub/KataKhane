import React, { useState } from 'react';
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { CloudinaryContext, Image } from 'cloudinary-react';
import { Cloudinary } from 'cloudinary-core';

const cloudinary = new Cloudinary({
  cloud_name: 'djbvrandg',
  api_key: '433572294491575',
  api_secret: '23PeWfynIws9jrfZ1bn_xvbzXsI',
});

const ImageUploader = ({ images, onImagesChange }) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');

  const handleCancel = () => setPreviewVisible(false);

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'katakhane');

    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudinary.config().djbvrandg}/image/upload`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    const uploadedImage = {
      uid: file.uid,
      name: data.original_filename,
      status: 'done',
      url: data.secure_url,
    };
    onImagesChange([...images, uploadedImage]);
  };
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  const handleChange = ({ file, fileList }) => {
    if (file.status === 'done') {
      handleUpload(file.originFileObj);
    } else if (file.status === 'removed') {
      onImagesChange(fileList);
    }
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <div className="image-uploader-container">
      <Upload
        listType="picture-card"
        fileList={images}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {images.length >= 3 ? null : uploadButton}
      </Upload>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="Preview" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </div>
  );
};

export default ImageUploader;

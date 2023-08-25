import ColumnGroup from 'antd/es/table/ColumnGroup';
import React, { useState } from 'react';


const UploadImageForm = () => {
  const [image, setImage] = useState(null);

  const handleSubmit =()=>{
    const data = new FormData()
    data.append("file", image)
    data.append("upload_preset", "yrj7xcif")
    data.append("cloud_name", "djbvrandg")

    fetch("https://api.cloudinary.com/v1_1/djbvrandg/image/upload", {
      method: "post",
      body: data
    })
    .then((res)=>res.json())
    .then((data)=>{
      console.log(data)
    }).catch((err)=>{
      console.log(err)
    })
  }

 

  
  return (
    <form onClick={handleSubmit} >
      <label>
        Select an image:
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      </label>
      <br />
      <button type="submit">Upload Image</button>
    </form>
  );
};

export default UploadImageForm;

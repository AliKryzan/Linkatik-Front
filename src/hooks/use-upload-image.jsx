import React, { useState } from "react";
import Dropzone from "react-dropzone";
import Loader from "../components/common/loader";
import { setBioImage,setImage_type,setUploadedImage } from '../store/General-variables/General-variables';
import { useDispatch } from "react-redux"

const MyDropzone = ({setImg,setModalOneOpen}) => {
  const [isLoading, setIsLoading] = useState(false); 
  const [uploadedImage_1, setUploadedImage_1] = useState(null); 

  const dispatch = useDispatch()

  const handleDrop = async (acceptedFiles) => {

    setIsLoading(true);
    if (acceptedFiles.length === 0) {
      alert("Only image files are allowed!");
      return;
    }

    const file = acceptedFiles[0]; 
    const validImageTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];

    

    try {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage_1(reader.result); 
        setImg(reader.result)
        dispatch(setImage_type('custom'))
        dispatch(setUploadedImage(file))
      };
      reader.readAsDataURL(file); 
      setModalOneOpen(false)
      console.log("Accepted file:", file);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload the image.");
    } finally {
      setIsLoading(false); 
    }
  };

  

  const handleRemoveImage = () => {
    setUploadedImage_1(null); 
     dispatch(setBioImage([]))
  };

  return (
    <div className="">
      {
        !uploadedImage_1 && (
          <Dropzone
          onDrop={handleDrop}
          accept={{ "image/*": [] }} // قبول الصور فقط
          multiple={false} // منع رفع أكثر من صورة في نفس الوقت
        >
          {({ getRootProps, getInputProps }) => (
            <section
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                position: "relative",
                marginBottom: "16px",
                position:"absolute",
                top:"0",
                left:"0",
              }}
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              {isLoading ? ( 
                <div style={{ position: "absolute",opacity:"1" }}>
                  <Loader size="sm" />
                </div>
              ) : null 
              }
            </section>
          )}
        </Dropzone>
        )
      }


      {uploadedImage_1 && (
        <div 
        style={{
          width: "100%",
          height: "100%",
          border: "2px dashed #007bff",
          borderRadius: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          position: "relative",
          marginBottom: "16px",
          position:"absolute",
          top:"0",
          left:"0",
        }}
        >
          <img
            src={uploadedImage_1}
            alt="Uploaded"
            style={{
              maxWidth: "100%",
              height: "100%",
              borderRadius: "8px",
            }}
          />
          <button
            onClick={handleRemoveImage}
            style={{
              width:"20px",
              height:"20px",
              borderRadius: "50%",
              cursor: "pointer",
              display:"flex",
              alignItems:"center",
              justifyContent:"center",
              position:"absolute",
              left:"-7px",
              top:"-7px",
              background:"red",
              color:"#fff"
            }}
          >
            X
          </button>
        </div>
      )}
    </div>
  );
};

export default MyDropzone;

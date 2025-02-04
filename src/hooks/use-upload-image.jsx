// import React, { useState } from "react";
// import Dropzone from "react-dropzone";
// import Loader from "../components/common/loader";
// import { setBioImage,setImage_type,setUploadedImage } from '../store/General-variables/General-variables';
// import { useDispatch } from "react-redux"
// import { Controller, useForm } from "react-hook-form"
// import { useQueryClient } from "@tanstack/react-query"
// import { useUploadFile } from "../hooks/use-upload-file"




// const MyDropzone = ({setImg,setModalOneOpen}) => {

//   const [isLoading, setIsLoading] = useState(false); 
//   const [uploadedImage_1, setUploadedImage_1] = useState(null); 

//   const dispatch = useDispatch()

//   const handleDrop = async (acceptedFiles) => {

//     setIsLoading(true);
//     if (acceptedFiles.length === 0) {
//       alert("Only image files are allowed!");
//       return;
//     }

//     const file = acceptedFiles[0]; 
//     const validImageTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];

    

//     try {
//       const reader = new FileReader();
//       reader.onload = () => {
//         setUploadedImage_1(reader.result); 
//         setImg(reader.result)
//         dispatch(setImage_type('custom'))
//         dispatch(setUploadedImage(file))
//       };
//       reader.readAsDataURL(file); 
//       setModalOneOpen(false)
//       console.log("Accepted file:", file);
//     } catch (error) {
//       console.error("Error uploading file:", error);
//       alert("Failed to upload the image.");
//     } finally {
//       setIsLoading(false); 
//     }
//   };

  

//   const handleRemoveImage = () => {
//     setUploadedImage_1(null); 
//      dispatch(setBioImage([]))
//   };



  
//       const form = useForm({
//           defaultValues: {
//             image:  "", 
//           },
//         });
  
//         const { handleSubmit, setError, watch, setValue, formState, control } = form
//         const queryClient = useQueryClient()
//         const onSubmit = handleSubmit(async (data) => {
//           if (!data.image) {
//             data = {
//               ...data,
//               image_path: null,
//             }
//           }
//           try {
//             await PutUpdateBioPage({
//               id,
//               data,
//             })
//             queryClient.invalidateQueries({ queryKey: ["bio-page-preview"] })
//             queryClient.invalidateQueries({ queryKey: ["bio-page-info", id] })
//           } catch (error) {
//             console.log("🚀 ~ onSubmit ~ error:", error)
//             toast.error(error.response?.data?.message || error.response?.message || error.message)
//             setError("root", { message: error.response?.data?.message || error.response?.message || error.message })
//           }
//         })
  
//         const { mutate, isPending } = useUploadFile({
//           onSuccess: (data) => {
//             setValue("image", data.file_url)
//           },
//           onError: (error) => {
//             toast.error(error.response?.data?.message || error.response?.message || error.message)
//             setError("image", {
//               message: error.response?.data?.message || error.response?.message || error.message,
//             })
//           },
//         })
      
//         const handleRemoveImage_ = () => {
//           setValue("image", null)
//         }
      
  


//   return (
//     <div className="">
//       {
//         !uploadedImage_1 && (
//           <Dropzone
//           onDrop={handleDrop}
//           accept={{ "image/*": [] }} // قبول الصور فقط
//           multiple={false} // منع رفع أكثر من صورة في نفس الوقت
//         >
//           {({ getRootProps, getInputProps }) => (
//             <section
//               style={{
//                 width: "100%",
//                 height: "100%",
//                 borderRadius: "10px",
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 cursor: "pointer",
//                 position: "relative",
//                 marginBottom: "16px",
//                 position:"absolute",
//                 top:"0",
//                 left:"0",
//               }}
//               {...getRootProps()}
//             >
//               <input {...getInputProps()} />
//               {isLoading ? ( 
//                 <div style={{ position: "absolute",opacity:"1" }}>
//                   <Loader size="sm" />
//                 </div>
//               ) : null 
//               }
//             </section>
//           )}
//         </Dropzone>
//         )
//       }


//       {uploadedImage_1 && (
//         <div 
//         style={{
//           width: "100%",
//           height: "100%",
//           border: "2px dashed #007bff",
//           borderRadius: "10px",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           cursor: "pointer",
//           position: "relative",
//           marginBottom: "16px",
//           position:"absolute",
//           top:"0",
//           left:"0",
//         }}
//         >
//           <img
//             src={uploadedImage_1}
//             alt="Uploaded"
//             style={{
//               maxWidth: "100%",
//               height: "100%",
//               borderRadius: "8px",
//             }}
//           />
//           <button
//             onClick={handleRemoveImage}
//             style={{
//               width:"20px",
//               height:"20px",
//               borderRadius: "50%",
//               cursor: "pointer",
//               display:"flex",
//               alignItems:"center",
//               justifyContent:"center",
//               position:"absolute",
//               left:"-7px",
//               top:"-7px",
//               background:"red",
//               color:"#fff"
//             }}
//           >
//             X
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyDropzone;











import React, { useState } from "react";
import Dropzone from "react-dropzone";
import Loader from "../components/common/loader";
import { setBioImage, setImage_type, setUploadedImage } from '../store/General-variables/General-variables';
import { useDispatch } from "react-redux"
import { useForm } from "react-hook-form"
import { useQueryClient } from "@tanstack/react-query"
import { useUploadFile } from "../hooks/use-upload-file"
import { Stack } from "@mantine/core"

const MyDropzone = ({ setImg, setModalOneOpen }) => {
  const [uploadedImage_1, setUploadedImage_1] = useState(null); 

  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { handleSubmit, setError, setValue } = useForm({
    defaultValues: {
      image: "", 
    },
  });

  // استخدام useUploadFile
  const { mutate, isPending } = useUploadFile({
    onSuccess: (data) => {
      setValue("image", data.file_url);
      setUploadedImage_1(data.file_url); // تحديث الصورة عند نجاح الرفع
      setImg(data.file_url);
      dispatch(setImage_type('custom'));
      dispatch(setUploadedImage(data.file_url));
      setModalOneOpen(false);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || error.response?.message || error.message);
      setError("image", {
        message: error.response?.data?.message || error.response?.message || error.message,
      });
    },
  });

  // رفع الصورة عند السحب والإفلات
  const handleDrop = (acceptedFiles) => {
    if (acceptedFiles.length === 0) {
      alert("Only image files are allowed!");
      return;
    }

    const file = acceptedFiles[0]; 
    mutate({ files: file, collection_name: "image" }); // رفع الصورة عبر useUploadFile
  };

  // حذف الصورة
  const handleRemoveImage = () => {
    setUploadedImage_1(null);
    dispatch(setBioImage([]));
  };

  return (
    <Stack className="" component={"form"} onSubmit={handleSubmit}>
      {!uploadedImage_1 && (
        <Dropzone onDrop={handleDrop} accept={{ "image/*": [] }} multiple={false}>
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
                position: "absolute",
                top: "0",
                left: "0",
              }}
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              {isPending && ( 
                <div style={{ position: "absolute", opacity: "1" }}>
                  <Loader size="sm" />
                </div>
              )}
            </section>
          )}
        </Dropzone>
      )}

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
            position: "absolute",
            top: "0",
            left: "0",
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
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "absolute",
              left: "-7px",
              top: "-7px",
              background: "red",
              color: "#fff",
            }}
          >
            X
          </button>
        </div>
      )}
    </Stack>
  );
};

export default MyDropzone;

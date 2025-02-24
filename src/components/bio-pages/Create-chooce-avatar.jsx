import React from 'react';
import { Box, Image, Group } from "@mantine/core";
import { groupAvatar } from '@/assets';
import Loader from '../common/loader';
import { setBioImage , setImage_type } from '../../store/General-variables/General-variables';
import { useDispatch , useSelector} from "react-redux"


function CreateChooceAvatar({setActiveAvatar,setModalOneOpen}) {

  const {image_type } = useSelector((state) => state.GeneralSlice)

  const dispatch = useDispatch()

  const handleClick = async (index) => {
    const selectedImage = groupAvatar[index];
    console.log(`Selected image: ${selectedImage}`);
    setActiveAvatar(index)
    dispatch(setBioImage(groupAvatar[index]))
     dispatch(setImage_type('avatar'))
    setModalOneOpen(false)
  };

  return (
    <Group style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "16px" }}>
      {groupAvatar.map((item, index) => (
        <Box
          key={index}
          onClick={() => handleClick(index)} 
          style={{
            width: "100px",
            height: "100px",
            border: "2px solid #8938b2",
            overflow: "hidden",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <Image
            src={item.image}
            alt={`Avatar ${index + 1}`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>
      ))}
    </Group>
  );
}

export default CreateChooceAvatar;

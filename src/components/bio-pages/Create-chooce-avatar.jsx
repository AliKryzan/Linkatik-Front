import React from "react"
import { groupAvatar } from "@/assets"
import { Box, Group, Image } from "@mantine/core"
import { useDispatch, useSelector } from "react-redux"

import { setBioImage, setImage_type } from "../../store/General-variables/General-variables"
import Loader from "../common/loader"

function CreateChooseAvatar({ setActiveAvatar, setModalOneOpen }) {
  const { image_type } = useSelector((state) => state.GeneralSlice)

  const dispatch = useDispatch()

  const handleClick = async (index) => {
    const selectedImage = groupAvatar[index]
    console.log(`Selected image: ${selectedImage}`)
    setActiveAvatar(index)
    dispatch(setBioImage(groupAvatar[index]))
    dispatch(setImage_type("avatar"))
    setModalOneOpen(false)
  }

  return (
    <Group style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "16px" }}>
      {groupAvatar.map((item, index) => (
        <Box
          key={index}
          onClick={() => handleClick(index)}
          className="flex h-[100px] w-[100px] cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-[#8938b2] transition-shadow hover:shadow-lg">
          <img
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
  )
}

export default CreateChooseAvatar

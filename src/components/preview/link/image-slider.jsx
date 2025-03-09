// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"

import { Box, Text } from "@mantine/core"

import { cn } from "@/lib/utils"

const ImageSliderPreview = ({ block, className }) => {
  return (
    <Swiper className={(cn("image-slider link-preview"), className)} spaceBetween={15} slidesPerView={2}>
      {block.settings.images.map((image, index) => (
        <SwiperSlide key={index}>
          <Box className="slide">
            <div className="image-wrapper">
              <img className="slide-image" src={image.image_url} alt={image.image_name} />
            </div>
            <Text ta={"center"} py={"sm"} size="sm" fw={700}>
              {image.image_name}
            </Text>
          </Box>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default ImageSliderPreview

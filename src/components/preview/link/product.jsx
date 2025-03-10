// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"

import { Box, Text } from "@mantine/core"

import { cn } from "@/lib/utils"

const Product = ({ block, className, style, onClick }) => {
  console.log("🚀 ~ Product ~ block:", block)
  console.log("block=====>", block)

  return (
    <Swiper
      className={cn("image-slider link-preview", className)}
      spaceBetween={15}
      slidesPerView={2}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}>
      {block.settings.map((product, index) => (
        <SwiperSlide key={index}>
          <a href={product.url || `/preview/product/${product.slug}`} onClick={onClick}>
            <Box className="slide">
              <div className="image-wrapper">
                <img className="slide-image" src={product.image || product.thumbnail} alt={product.title} />
              </div>
              <Text ta={"center"} py={"sm"} size="sm" fw={700}>
                {product?.title || product?.name || ""}
              </Text>
            </Box>
          </a>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default Product

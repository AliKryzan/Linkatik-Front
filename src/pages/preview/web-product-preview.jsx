import {
  Box,
  Button,
  Drawer,
  Group,
  Image,
  Modal,
  Stack,
  Text,
  Title,
  TypographyStylesProvider,
} from "@mantine/core"
import { useDisclosure, useMediaQuery } from "@mantine/hooks"
import { useSuspenseQuery } from "@tanstack/react-query"
import { X } from "lucide-react"
import { useTranslation } from "react-i18next"
import { useParams, useSearchParams } from "react-router-dom"

import { imagePlaceholder, logo, secondaryImagePlaceholder } from "@/assets"
import BuyForm from "@/components/preview/product/buy-form"
import Success from "@/components/preview/product/success"
import { GetProductPreview } from "@/services/utils"

const WebProductPreview = () => {
  const { t } = useTranslation()
  const params = useParams()
  const { data: product } = useSuspenseQuery({
    queryKey: ["product", params.slug],
    queryFn: async () => {
      return GetProductPreview(params.slug)
    },
  })
  const [imageModalOpened, { open: openImageModal, close: closeImageModal }] = useDisclosure(false)
  const [opened, { open, close }] = useDisclosure(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const successOpen = searchParams.get("success")
  const closeSuccess = () => {
    setSearchParams("success", null)
  }
  const sm = useMediaQuery("(max-width: 786px)")
  return (
    <>
     <div className="h-dvh flex flex-col justify-between">
        <div className="flex-1">
          <div className="relative">
            <div className="h-[30vh] bg-gradient-to-b from-gray-100 to-white" />
            <div className="relative px-4 -mt-[60px]">
              <div className="flex flex-col items-center">
                <div className="mb-6">
                <Image 
    className="border-4 border-white shadow-lg transition-transform hover:scale-105 cursor-pointer"
    mx="auto"
    h={120}
    w={120}
    radius="50%"
    fallbackSrc={imagePlaceholder}
    src={product.image}
    onClick={openImageModal}
  />
                </div>
                <Modal
  opened={imageModalOpened}
  onClose={closeImageModal}
  size="xl"
  padding={0}
  radius="md"
  centered
>
  <Image
    src={product.image}
    fallbackSrc={imagePlaceholder}
    fit="contain"
    h="80vh"
    className="w-full"
  />
</Modal>
                <div className="space-y-4 w-full max-w-2xl mx-auto">
                  <Title 
                    order={1} 
                    className="text-center text-2xl md:text-3xl font-bold"
                  >
                    {product.title}
                  </Title>
                  
                  <Text className="text-center text-gray-600 text-sm md:text-base">
                    {product.description}
                  </Text>

                  <div className="flex justify-center gap-4 mt-6">
                    <Button
                      onClick={open}
                      className="transition-all hover:-translate-y-1 hover:shadow-lg"
                      size="md"
                    >
                      {t("products.general.buyProduct")}
                    </Button>
                    <Button
                      component="p"
                      variant="light"
                      size="md"
                      className="bg-gray-50"
                    >
                      {product.pricing_type === "free"
                        ? t("products.general.free")
                        : `${product.price || product.max_price || "00"} ${product.currency}`}
                    </Button>
                  </div>

                  { product?.long_description&&<div className="mt-8 bg-gray-50 rounded-xl p-6">
                    <TypographyStylesProvider>
                      <div
                        className="prose prose-sm md:prose-base mx-auto"
                        dangerouslySetInnerHTML={{ __html: product?.long_description }}
                      />
                    </TypographyStylesProvider>
                  </div>}
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className="flex justify-center pt-5 border-t border-t-gray-300">
          <img 
            src={logo} 
            alt="linkatik" 
            className="h-6 opacity-70 hover:opacity-100 transition-opacity"
          />
        </footer>
      </div>
      {sm ? (
        <Modal.Root xOffset={"2vh"} yOffset={"2vh"} opened={opened} onClose={close} size="100vw">
          <Modal.Overlay />
          <Modal.Content radius={"lg"} h={"100%"}>
            <Modal.Header>
              <Modal.Title>
                <Text fw={600} size="lg">
                  {t("product-preview.title")}
                </Text>
              </Modal.Title>
              <Modal.CloseButton />
            </Modal.Header>
            <Modal.Body>
              <BuyForm product={product} />
            </Modal.Body>
          </Modal.Content>
        </Modal.Root>
      ) : (
        <Drawer size={"md"} opened={opened} onClose={close} title={t("product-preview.title")}>
          <BuyForm product={product} />
        </Drawer>
      )}
      {sm ? (
        <Modal.Root xOffset={"2vh"} yOffset={"2vh"} opened={successOpen} onClose={closeSuccess} size="100vw">
          <Modal.Overlay />
          <Modal.Content radius={"lg"} h={"100%"}>
            <Modal.Body p="0">
              <Modal.CloseButton
                variant="transparent"
                icon={<X color="white" />}
                style={{
                  position: "absolute",
                  left: "10px",
                  top: "10px",
                  zIndex: 10,
                }}
              />
              <Success product={product} />
            </Modal.Body>
          </Modal.Content>
        </Modal.Root>
      ) : (
        <Drawer.Root size={"md"} opened={successOpen} onClose={closeSuccess}>
          <Drawer.Overlay />
          <Drawer.Content>
            <Drawer.Body p="0">
              <Drawer.CloseButton
                variant="transparent"
                icon={<X color="white" />}
                style={{
                  position: "absolute",
                  left: "10px",
                  top: "10px",
                  zIndex: 10,
                }}
              />
              <Success product={product} />
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Root>
      )}
    </>
  )
}

export default WebProductPreview

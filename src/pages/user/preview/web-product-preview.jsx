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
import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom"

import { imagePlaceholder, logo, secondaryImagePlaceholder } from "../../../assets"
import BuyForm from "../../../components/preview/product/buy-form"
import { GetProductPreview } from "../../../services/utils"

const WebProductPreview = () => {
  const { t } = useTranslation()
  const params = useParams()
  const { data: product } = useSuspenseQuery({
    queryKey: ["product", params.slug],
    queryFn: async () => {
      return GetProductPreview(params.slug)
    },
  })

  const [opened, { open, close }] = useDisclosure(false)
  const sm = useMediaQuery("(max-width: 786px)")
  return (
    <>
      <Stack className="preview-page product-preview" gap={"xl"} justify="space-between" pb={"md"}>
        <Stack gap={0}>
          <Box pt={{ base: 0, md: "md" }} px={{ base: 0, md: "md" }}>
            <Image
              src={product.image}
              fallbackSrc={secondaryImagePlaceholder}
              h={"30vh"}
              alt="product image"
            />
          </Box>
          <Stack
            style={{
              marginTop: `-60px`,
            }}>
            <div>
              <Image mx={"auto"} h={120} w={120} radius={"50%"} fallbackSrc={imagePlaceholder} src={null} />
            </div>
            <Title order={1} fz={22} align={"center"}>
              {product.title}
            </Title>
            <Text fz={14} align={"center"}>
              {product.description}
            </Text>
            <Group justify="center">
              <Button onClick={open}>{t("products.general.buyProduct")}</Button>
              <Button component="p" variant="light">
                {product.pricing_type === "free"
                  ? t("products.general.free")
                  : `${product.price || product.max_price || "00"} ${product.currency}`}
              </Button>
            </Group>

            <TypographyStylesProvider>
              <Box p="md" dangerouslySetInnerHTML={{ __html: product?.long_description }} />
            </TypographyStylesProvider>
          </Stack>
        </Stack>
        <Group justify="center" mt={"lg"}>
          <img src={logo} alt="linkatik" />
        </Group>
      </Stack>
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
    </>
  )
}

export default WebProductPreview

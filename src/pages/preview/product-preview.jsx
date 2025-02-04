import { Box, Button, Group, Image, Stack, Text, Title, TypographyStylesProvider } from "@mantine/core"
import { useWatch } from "react-hook-form"
import { useTranslation } from "react-i18next"

import { imagePlaceholder, logo, secondaryImagePlaceholder } from "../../assets"

const ProductPreview = () => {
  const product = useWatch()
  const { t } = useTranslation()
  return (
    <Stack className="preview-page product-preview"  gap={"xl"} justify="space-between" pb={"md"}>
      <Stack gap={0}>
        <Box pt={"md"} px={"md"}>
          <Image
            src={
              product?.image
                ? typeof product.image === "string"
                  ? product.image
                  : URL.createObjectURL(product.image)
                : ""
            }
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
            {product?.title || t("products.addProduct.titleInput")}
          </Title>
          <Text fz={14} align={"center"}>
            {product?.description || t("products.addProduct.description")}
          </Text>
          <Group justify="center">
            <Button>{t("products.general.buyProduct")}</Button>
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
  )
}

export default ProductPreview

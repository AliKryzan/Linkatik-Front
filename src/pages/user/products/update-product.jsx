import { useEffect } from "react"
import { GetProduct } from "@/services/utils"
import { updateProductSchema } from "@/validation/product"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Box,
  Button,
  Flex,
  Group,
  Modal,
  ScrollArea,
  Stack,
  Title,
  useDirection,
  useMantineColorScheme,
} from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { useQuery, useSuspenseQuery } from "@tanstack/react-query"
import { Eye } from "lucide-react"
import { Controller, FormProvider, useForm, useFormContext } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom"

import CopyPath from "@/components/common/copy-path"
import UpdateProductForm from "@/components/products/update-product-form"

import ProductPreview from "../../preview/product-preview"

const UpdateProduct = () => {
  const { productId } = useParams()
  const {
    t,
    i18n: { language },
  } = useTranslation()
  const [opened, { open, close }] = useDisclosure(false)

  const { dir } = useDirection()
  const { data: product } = useSuspenseQuery({
    queryKey: ["product", productId],
    queryFn: () => GetProduct(productId),
  })

  const form = useForm({
    resolver: zodResolver(updateProductSchema),
    defaultValues: {
      title: product.title || "",
      description: product.description || "",
      long_description: product.long_description || "",
      image: product.image,
      pricing_type: product.pricing_type,
      price: product.price,
      max_price: product.max_price,
      currency: product.currency,
      image_path: product.image_path || "",
      time_slots: product.time_slots || [],
      duration: product.duration || "30",
    },
  })

  // useQuery({
  //   queryKey: ["product", productId],
  //   queryFn: () => {
  //     return GetProduct(productId)
  //   },
  // })

  const { setValue } = form

  const { data, isLoading, error } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => GetProduct(productId),
  })

  useEffect(() => {
    if (data) {
      setValue("time_slots", data.time_slots || [])
      setValue("duration", `${data.duration}` || "30")
    }
  }, [data, setValue])

  const { colorScheme } = useMantineColorScheme()

  return (
    <FormProvider {...form}>
      <Flex position="relative" direction={{ base: "column", lg: "row" }} align={"start"} gap={"xs"}>
        <Box w="100%" flex={1} style={{ zIndex: 1, position: "relative" }}>
          <Stack gap={"xl"}>
            <Stack>
              <Title order={2}>{t("products.addProduct.title")}</Title>
            </Stack>
            <UpdateProductForm type={product.type || "digital"} />
          </Stack>
        </Box>
        <Stack
          style={{
            position: "sticky",
            top: "100px",
            overflowY: "auto",
          }}
          p="sm"
          display={{ base: "none", lg: "flex" }}
          ms={-110}>
          <CopyPath pathname={`/preview/product/${product.slug}`} />
          <Group
            justify="end"
            style={{
              scale: "0.78",
              transformOrigin: language == "rtl" ? "top left" : "top right",
            }}>
            <ScrollArea
              h={770}
              miw={600}
              style={{
                borderRadius: "20px",
                boxShadow: `0 0 12px ${colorScheme == "dark" ? "#121212d1" : "#ccc"}`,
              }}>
              <ProductPreview />
            </ScrollArea>
          </Group>
        </Stack>
        {!opened && (
          <Button
            hiddenFrom="lg"
            radius={"xl"}
            size="sm"
            style={{
              position: "fixed",
              bottom: "20px",
              zIndex: 10,
              boxShadow: `0 0 4px ${colorScheme == "dark" ? "#121212d1" : "#ccc"}`,
              ...(language === "ar" ? { left: "20px" } : { right: "20px" }),
            }}
            variant="white"
            leftSection={<Eye />}
            onClick={open}>
            {t("bioPages.createPage.preview")}
          </Button>
        )}
      </Flex>
      <Modal
        opened={opened}
        onClose={close}
        fullScreen
        radius={0}
        transitionProps={{ transition: "fade", duration: 200 }}>
        <Group justify="center">
          <ProductPreview />
        </Group>
      </Modal>
    </FormProvider>
  )
}

export default UpdateProduct

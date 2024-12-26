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
import { Eye } from "lucide-react"
import { FormProvider, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useSearchParams } from "react-router-dom"

import CopyPath from "../../../components/common/copy-path"
import ProductForm from "../../../components/products/product-form"
import { bookingProductSchema, digitalProductSchema, productSchema } from "../../../validation/product"
import ProductPreview from "../../preview/product-preview"

const productTypeDefaults = {
  digital: {
    digital_product_file: undefined,
  },
  booking: {
    duration: "30",
    next_days: "7",
    time_slots: [],
  },
}
const CreateProduct = () => {
  const { t } = useTranslation()
  const [opened, { open, close }] = useDisclosure(false)

  const { dir } = useDirection()

  const [searchParams] = useSearchParams()
  const type = searchParams.get("type") ?? "digital"

  const form = useForm({
    resolver: zodResolver(
      productSchema.merge(type === "digital" ? digitalProductSchema : bookingProductSchema).refine(
        (obj) => {
          return Number(obj.max_price) > Number(obj.sales_price)
        },
    
        {
          path: ["max_price"],
          message: "invalidPrice",
        },
      ),
    ),
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      long_description: "",
      image: undefined,
      pricing_type: "free",
      price: 0,
      sales_price: 0,
      max_price: 0,
      currency: "SAR",
      ...productTypeDefaults[type],
    },
  })

  console.log(form.formState.errors)
  const { colorScheme } = useMantineColorScheme()

  return (
    <FormProvider {...form}>
      <Flex position="relative" direction={{ base: "column", lg: "row" }} align={"start"} gap={"xs"}>
        <Box w="100%" flex={1} style={{ zIndex: 1, position: "relative" }}>
          <Stack gap={"xl"}>
            <Stack>
              <Title order={2}>{t("products.addProduct.title")}</Title>
            </Stack>
            <ProductForm />
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
          <CopyPath pathname={`product/${form.watch("slug")}`} />
          <Group
            justify="end"
            style={{
              scale: "0.78",
              transformOrigin: dir == "rtl" ? "top left" : "top right",
            }}>
            <ScrollArea
              h={770}
              miw={600}
              style={{
                borderRadius: "20px",
                boxShadow: `0 0 12px ${colorScheme === "dark" ? "#121212d1" : "#ccc"}`,
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
              ...(dir === "rtl" ? { left: "20px" } : { right: "20px" }),
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

export default CreateProduct

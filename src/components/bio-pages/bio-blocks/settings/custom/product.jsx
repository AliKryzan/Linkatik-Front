import { ActionIcon, Button, Group, Modal, Stack, useMantineTheme } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { useQueryClient } from "@tanstack/react-query"
import { X } from "lucide-react"
import { FormProvider } from "react-hook-form"
import { useTranslation } from "react-i18next"

import { getLocalstorageUser } from "@/utils/get-localstorage-user"
import AddProductBlock from "../../../create-block/product"

const UpdateProducts = () => {
  const { t } = useTranslation()
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <>
      <Modal size={"lg"} opened={opened} onClose={close}>
        <AddProductBlock />
      </Modal>
      <Button onClick={open}>{t("products.addButton")}</Button>
    </>
  )
}

const Product = ({ form, block }) => {
  const theme = useMantineTheme()
  const productData = block.products_data
  const products = form.watch("products")
  console.log("🚀 ~ Product ~ products:", products)

  const queryClient = useQueryClient()

  const handleRemove = (id) => {
    console.log("🚀 ~ handleRemove ~ id:", id)
    form.setValue(
      "products",
      products.filter((productId) => productId != id),
    )
  }

  return (
    <>
      <Stack gap={"lg"}>
        <FormProvider {...form}>
          <UpdateProducts />
        </FormProvider>
        {products.map((productId) => {
          const queryCache = queryClient.getQueryData(["products", "infinite", getLocalstorageUser()?.token])
          const fetchedProducts = queryCache ? queryCache.pages?.flatMap((page) => page.data) : []

          const product = [...fetchedProducts, ...productData].find((e) => e.id == productId)

          if (!product) return
          return (
            <Group
              key={product.id}
              wrap="nowrap"
              bg={theme.colors.primary[1]}
              style={{ borderRadius: theme.radius.md }}
              p={"sm"}
              gap={"xl"}
              align="center"
              justify="space-between">
              <Group gap={"lg"}>
                <img width={50} src={product.image} alt={product.title} />
                <span>{product.title}</span>
              </Group>
              <ActionIcon
                onClick={() => {
                  handleRemove(product.id)
                }}
                variant="transparent">
                <X strokeWidth={1.3} size={16} />
              </ActionIcon>
            </Group>
          )
        })}
      </Stack>
    </>
  )
}

export default Product

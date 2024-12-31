import { Checkbox, Group, Image, Loader, ScrollArea, SimpleGrid, Stack, Text } from "@mantine/core"
import { useInfiniteQuery } from "@tanstack/react-query"
import { Controller, useFormContext } from "react-hook-form"

import { imagePlaceholder } from "../../../assets"
import { GetProducts, GetSallaProducts } from "../../../services/utils"
import { getLocalstorageUser } from "../../../utils/get-localstorage-user"
import Error from "../../common/error"
import InfiniteScrollContainer from "../../common/infinite-scroll-container"

const Product = ({ name }) => {
  const { control } = useFormContext()

  const queryFunctionMap = {
    salla: GetSallaProducts,
    zid: GetProducts,
    product: GetProducts,
  }
  const queryFunction = queryFunctionMap[name]
  //   fetching products
  const { data, fetchNextPage, hasNextPage, status, isFetching, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["products", "block", name, getLocalstorageUser()?.token],
    queryFn: async ({ pageParam: page }) => {
      return await queryFunction({ page })
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => {
      return lastPage.pagination?.last_page === lastPage.pagination?.current_page
        ? null
        : lastPage.pagination?.current_page + 1
    },
  })

  if (status === "pending")
    return (
      <Group justify="center" p="lg">
        <Loader />
      </Group>
    )
  if (status === "error") return <Error />

  const products = data.pages?.flatMap((page) => page.data) || []
  return (
    <Stack gap={"lg"}>
      <ScrollArea h="350">
        <InfiniteScrollContainer
          onBottomReached={() => {
            if (!hasNextPage || isFetching || isFetchingNextPage) return
            fetchNextPage()
          }}>
          <Controller
            control={control}
            name="products"
            render={({ field }) => {
              return (
                <Checkbox.Group {...field}>
                  <SimpleGrid
                    cols={{ base: 2, sm: 3, lg: 4 }}
                    spacing={{ base: 10, sm: "xl" }}
                    verticalSpacing={{ base: "md", sm: "xl" }}>
                    {products.map((product) => {
                      return (
                        <Checkbox.Card
                          className={"products-checkbox-root"}
                          value={product.id + ""}
                          key={product.id}>
                          <Stack gap={"xs"}>
                            <Checkbox.Indicator radius={"xl"} className="indicator" />
                            <div className="image-wrapper">
                              <Image
                                w={"100%"}
                                h={"100%"}
                                fit="cover"
                                src={product.image}
                                alt="linkatik"
                                fallbackSrc={imagePlaceholder}
                              />
                            </div>
                            <Text className={"label"} lineClamp={1}>
                              {product.title}
                            </Text>
                          </Stack>
                        </Checkbox.Card>
                      )
                    })}
                  </SimpleGrid>
                </Checkbox.Group>
              )
            }}
          />
          {isFetchingNextPage ? (
            <Group justify="center" p="lg">
              <Loader />
            </Group>
          ) : null}
        </InfiniteScrollContainer>
      </ScrollArea>
    </Stack>
  )
}

export default Product

import { Checkbox, Group, Image, Loader, ScrollArea, SimpleGrid, Stack, Text } from "@mantine/core"
import { useInfiniteQuery } from "@tanstack/react-query"
import { Controller, useFormContext } from "react-hook-form"

import { imagePlaceholder } from "../../../assets"
import { GetProducts } from "../../../services/utils"
import { getLocalstorageUser } from "../../../utils/get-localstorage-user"
import Error from "../../common/error"
import InfiniteScrollContainer from "../../common/infinite-scroll-container"

const Product = () => {
  // const { t } = useTranslation()
  // form state
  const { control } = useFormContext()

  //   fetching products
  // const [searchValue, setSearchValue] = useDebouncedState("", 300)
  const { data, fetchNextPage, hasNextPage, status, isFetching, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["products", "infinite", getLocalstorageUser()?.token],
    queryFn: async ({ pageParam: page }) => {
      return await GetProducts({ page })
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => {
      return lastPage.pagination.last_page === lastPage.pagination.current_page
        ? null
        : lastPage.pagination.current_page + 1
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
      {/* <TextInput
        placeholder={t("products.searchPlaceholder")}
        defaultValue={searchValue}
        onChange={(event) => setSearchValue(event.currentTarget.value)}
        size="sm"
        leftSection={<Search size={16} />}
      /> */}

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

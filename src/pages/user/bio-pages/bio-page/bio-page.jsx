/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { GetBioPage, PutUpdateBlock } from "@/services/utils"
import { closestCenter, DndContext, PointerSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core"
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { Stack } from "@mantine/core"
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query"
import { useParams } from "react-router-dom"

import useDebouncedMutation from "@/hooks/use-debounced-mutation"
import BioBlock from "@/components/bio-pages/bio-blocks/bio-block"
import CreateLinkButton from "@/components/bio-pages/create-link-button"
import Error from "@/components/common/error"
import InfiniteScrollContainer from "@/components/common/infinte-scroll-container"
import Loader from "@/components/common/loader"

const BioPage = () => {
  const { id, path } = useParams()
  const { data, fetchNextPage, hasNextPage, status, isFetching, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["bio-page", id, path],
    queryFn: async ({ pageParam }) => {
      return await GetBioPage(id, { params: { page: pageParam, per_page: 10 } })
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.pagination.current_page === lastPage.pagination.last_page) return null
      return lastPage.pagination.current_page + 1
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  })
  const [blocks, setBlocks] = useState([])

  // we have to subscribe to query cache changes and update the blocks state
  const queryClient = useQueryClient()
  useEffect(() => {
    // Subscribe to query cache data changes
    const unsubscribe = queryClient.getQueryCache().subscribe((event) => {
      if (
        event?.query?.queryKey[0] === "bio-page" &&
        event?.query?.queryKey[1] == id &&
        event.type === "updated"
      ) {
        setBlocks(event.query.state.data?.pages?.flatMap((page) => page.data) || [])
      }
    })

    // Cleanup subscription on component unmount
    return () => {
      unsubscribe()
    }
  }, [queryClient])

  useEffect(() => {
    setBlocks(data?.pages?.flatMap((page) => page.data) || [])
  }, [status, isFetchingNextPage])

  const { mutate } = useDebouncedMutation({
    mutateFn: PutUpdateBlock,
  })

  const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor))

  function handleDragEnd(event) {
    const { active, over } = event
    if (active.id !== over.id) {
      setBlocks((items) => {
        const oldIndex = items.findIndex((item) => item.id == active.id)
        const newIndex = items.findIndex((item) => item.id == over.id)

        // Create the reordered array
        const newItems = arrayMove(items, oldIndex, newIndex)

        // Update the moved item
        mutate({
          pageId: id,
          blockId: items[oldIndex].id,
          data: {
            image: items[oldIndex].image,
            type: items[oldIndex].type,
            order: newIndex + 1,
          },
        })

        // You might need to update all affected items if your backend requires
        // consistent ordering with no gaps

        return newItems
      })
    }
  }

  if (status === "pending") return <Loader />
  if (status === "error") return <Error />
  return (
    <InfiniteScrollContainer
      onBottomReached={() => {
        if (!hasNextPage || isFetching || isFetchingNextPage) return
        fetchNextPage()
      }}>
      <Stack className="bio-page" gap={"xl"}>
        <CreateLinkButton />
        <DndContext
          modifiers={[restrictToVerticalAxis]}
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}>
          <SortableContext strategy={verticalListSortingStrategy} items={blocks}>
            {blocks.map((block) => (
              <BioBlock key={block.id + block.type} block={block} />
            ))}
          </SortableContext>
        </DndContext>
        {isFetchingNextPage ? <Loader /> : null}
      </Stack>
    </InfiniteScrollContainer>
  )
}

export default BioPage

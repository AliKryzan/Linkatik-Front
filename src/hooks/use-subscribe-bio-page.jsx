import { modals } from "@mantine/modals"

import SubscribeForm from "../components/common/subscribe-form"

const useSubscribeBioPage = (block) => {
  const open = () =>
    modals.open({
      title: "Subscribe to newsletter",
      children: (
        <>
          <SubscribeForm block={block} />
        </>
      ),
    })

  return { open }
}

export default useSubscribeBioPage

import { useEffect } from "react"
import { Flex, Group, Radio, Text } from "@mantine/core"
import { useQuery } from "@tanstack/react-query"
import { Star } from "lucide-react"
import { Controller } from "react-hook-form"
import { useTranslation } from "react-i18next"

import { GetInterests } from "@/services/utils"
import Error from "../common/error"
import Loader from "../common/loader"

const Interests = ({ control, selected, errors, translationKey, setValue }) => {
  translationKey ??= "userInfo"
  const { t } = useTranslation()
  // fetching interests
  const { data, status } = useQuery({
    queryKey: ["interests"],
    queryFn: () => GetInterests(),
    refetchInterval: Infinity,
  })

  useEffect(() => {
    setValue("sub_interest_id", "")
  }, [selected])

  if (status === "pending") return <Loader />
  if (status === "error") return <Error />

  return (
    <>
      <Controller
        control={control}
        name="interest_id"
        render={({ field }) => (
          <Radio.Group
            error={
              errors.interest_id?.message && t(`${translationKey}.errors.${errors.interest_id?.message}`)
            }
            labelProps={{ className: "interests-label" }}
            {...field}
            label={t(`${translationKey}.interestsLabel`)}>
            <Flex gap={"sm"} wrap={"wrap"}>
              {data.data?.data?.map((element) => {
                return <RadioComponent key={element.id} {...element} />
              })}
            </Flex>
          </Radio.Group>
        )}
      />
      {selected ? (
        <Controller
          control={control}
          name="sub_interest_id"
          render={({ field }) => (
            <Radio.Group
              labelProps={{ className: "interests-label" }}
              {...field}
              label={t(`${translationKey}.subInterestsLabel`)}>
              <Flex gap={"sm"} wrap={"wrap"}>
                {data.data?.data
                  ?.filter((element) => element.id == selected)[0]
                  .sub_interests.map((element) => {
                    return <RadioComponent key={element.id} {...element} />
                  })}
              </Flex>
            </Radio.Group>
          )}
        />
      ) : null}
    </>
  )
}

export default Interests

function RadioComponent(props) {
  return (
    <Radio.Card
      className={"interests-radio-root"}
      radius="lg"
      w={"fit-content"}
      px={"md"}
      py={"4"}
      value={props.id + ""}
      key={props.title}>
      <Group wrap="nowrap" align="flex-start" gap="xs">
        <Star />
        <Text>{props.title}</Text>
      </Group>
    </Radio.Card>
  )
}

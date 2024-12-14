import { DevTool } from "@hookform/devtools"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Stack, Text, TextInput } from "@mantine/core"
import { useQueryClient } from "@tanstack/react-query"
import { Controller, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"

import { PutUpdateProfile } from "../../services/utils"
import { getLocalstorageUser } from "../../utils/get-localstorage-user"
import { updateProfileSchema } from "../../validation/update-profile"
import Interests from "../sign-up/interests"

const UpdateProfile = () => {
  const { t } = useTranslation()
  const user = getLocalstorageUser()
  const { formState, handleSubmit, control, setError, watch, setValue } = useForm({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      username: user.username,
      name: user.name,
      email: user.email,
      interest_id: user.interest.id + "",
      sub_interest_id: "2",
    },
  })

  const queryClient = useQueryClient()
  const onSubmit = handleSubmit(async (data) => {
    try {
      await PutUpdateProfile(data)
      const queryFilter = {
        queryKey: ["user", user.token],
      }
      await queryClient.invalidateQueries(queryFilter)
      toast.success(t("profile.updateSuccess"))
    } catch (error) {
      console.log("🚀 ~ onSubmit ~ error:", error)
      setError("root", { message: error.response.data.message })
    }
  })

  return (
    <Stack component={"form"} gap={"lg"} noValidate onSubmit={onSubmit}>
      <Controller
        control={control}
        name="name"
        render={({ field }) => (
          <TextInput
            label={t("profile.nameInput")}
            error={formState.errors.name?.message && t(`profile.errors.${formState.errors.name?.message}`)}
            placeholder={t("profile.nameInput")}
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="email"
        render={({ field }) => (
          <TextInput
            type="email"
            label={t("profile.emailInput")}
            error={formState.errors.email?.message && t(`profile.errors.${formState.errors.email?.message}`)}
            placeholder={t("profile.emailInput")}
            {...field}
          />
        )}
      />
      <Interests
        translationKey={"profile"}
        control={control}
        selected={watch("interest_id")}
        errors={formState.errors}
        setValue={setValue}
      />

      <Button loading={formState.isSubmitting} type="submit">
        {t("profile.updateButton")}
      </Button>
      {formState.errors.root?.message ? (
        <Text c={"red"} size="xs" ta={"center"}>
          {formState.errors.root.message}
        </Text>
      ) : null}
      <DevTool control={control} />
    </Stack>
  )
}

export default UpdateProfile

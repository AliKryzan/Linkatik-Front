import { useEffect } from "react"
import { DevTool } from "@hookform/devtools"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Stack, Text, TextInput, Title } from "@mantine/core"
import axios from "axios"
import { Controller, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"

import Interests from "@/components/sign-up/interests"
import { useNavigate } from "@/lib/i18n/navigation"
import { LinkatikApi } from "@/services"
import { setErrorMessage, setFormData, setStep } from "@/store/sign-up/sign-up-slice"
import { updateUser } from "@/utils/update-user"
import { signUpSchema, userInfoSchema } from "@/validation/sign-up"

const SecondStep = () => {
  const { t } = useTranslation()

  const dispatch = useDispatch()

  const { formData } = useSelector((state) => state.signUp)
  const navigate = useNavigate()
  useEffect(() => {
    if (!signUpSchema.safeParse(formData).success) {
      dispatch(setStep(0))
    }
  }, [formData])

  // manage form state
  const { handleSubmit, control, formState, watch, setError, setValue } = useForm({
    resolver: zodResolver(userInfoSchema),
    defaultValues: formData,
  })

  const onSubmit = handleSubmit(async (data) => {
    try {
      dispatch(setFormData(data))
      if (!data.sub_interest_id) delete data.sub_interest_id
      const response = await LinkatikApi.post("/user/register", { ...formData, ...data })
      updateUser(response.data.data)
      navigate("/plans")
    } catch (error) {
      if (axios.isAxiosError(error) && error.status !== 500) {
        dispatch(setStep(0))
        dispatch(setErrorMessage(error.response.data.message))
      }
      setError("root", { message: "invalidResponse" })
    }
  })

  return (
    <Stack component={"form"} noValidate onSubmit={onSubmit} w={500} gap={"xl"} py={"xl"}>
      <div>
        <Title>{t("userInfo.title")}</Title>
        <Text fw={400} mt={9}>
          {t("userInfo.description")}
        </Text>
      </div>
      <Stack gap={"xl"}>
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <TextInput
              variant="filled"
              error={formState.errors.name?.message && t(`userInfo.errors.${formState.errors.name?.message}`)}
              placeholder={t("userInfo.nameInput")}
              {...field}
            />
          )}
        />

        <div>
          <Interests
            setValue={setValue}
            control={control}
            selected={watch("interest_id")}
            errors={formState.errors}
          />
        </div>

        <Button loading={formState.isSubmitting} type="submit" fullWidth>
          {t("userInfo.continueButton")}
        </Button>
        {/* {formState.errors.root?.message && (
          <Text c={"red"} size="xs" ta={"center"}>
            {t(`signup.errors.${formState.errors.root?.message}`)}
          </Text>
        )} */}
        {formState.errors.root?.message && (
          <Text c={"red"} size="sm" ta={"center"}>
            {t(`userInfo.errors.${formState.errors.root?.message}`)}
          </Text>
        )}
      </Stack>
      {/* <DevTool control={control} /> */}
    </Stack>
  )
}

export default SecondStep

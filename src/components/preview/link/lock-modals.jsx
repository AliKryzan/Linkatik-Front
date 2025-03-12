import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Checkbox, Group, Modal, Stack, Text, TextInput } from "@mantine/core"
import Cookies from "js-cookie"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { z } from "zod"

// Schema for code verification
const codeSchema = z.object({
  code: z.string().min(1, "Code is required"),
})

// Schema for birthday verification
const birthdaySchema = z.object({
  year: z
    .string()
    .min(4, "Please enter a valid year")
    .max(4, "Please enter a valid year")
    .regex(/^\d+$/, "Year must be a number"),
})

// Schema for email subscription
const subscribeSchema = z.object({
  email: z.string().email("Please enter a valid email"),
})

/**
 * Component to handle different types of lock modals
 * - Code verification
 * - Age verification
 * - Sensitive content warning
 * - Email subscription
 */
const LockModals = ({ isOpen, onClose, lockOptions, blockId, onVerified }) => {
  const { t } = useTranslation()
  const [modalType, setModalType] = useState(null)

  // Set up forms for different lock types
  const codeForm = useForm({
    resolver: zodResolver(codeSchema),
    defaultValues: { code: "" },
  })

  const birthdayForm = useForm({
    resolver: zodResolver(birthdaySchema),
    defaultValues: { year: "" },
  })

  const subscribeForm = useForm({
    resolver: zodResolver(subscribeSchema),
    defaultValues: { email: "" },
  })

  // Cookie management
  const setCookieForBlock = (lockType) => {
    const cookieName = `block_${blockId}_${lockType}`
    Cookies.set(cookieName, "verified", { expires: 30 }) // 30 days expiration
  }

  const checkCookieForBlock = (lockType) => {
    const cookieName = `block_${blockId}_${lockType}`
    return Cookies.get(cookieName) === "verified"
  }

  // Determine which modal to show based on lock options
  useEffect(() => {
    if (!isOpen || !lockOptions) return

    // Check cookies first to see if user already verified
    if (lockOptions.show_with_code && !checkCookieForBlock("code")) {
      setModalType("code")
    } else if (lockOptions.show_with_birthday && !checkCookieForBlock("birthday")) {
      setModalType("birthday")
    } else if (lockOptions.show_with_sensitive_content && !checkCookieForBlock("sensitive")) {
      setModalType("sensitive")
    } else if (lockOptions.show_with_subscribe && !checkCookieForBlock("subscribe")) {
      setModalType("subscribe")
    } else {
      // All verifications passed or no locks enabled
      onVerified()
      onClose()
    }
  }, [isOpen, lockOptions, blockId])

  // Handle code verification
  const handleCodeSubmit = codeForm.handleSubmit((data) => {
    if (data.code === lockOptions.code_confirmation) {
      setCookieForBlock("code")
      // Check if there are other locks to verify
      if (lockOptions.show_with_birthday && !checkCookieForBlock("birthday")) {
        setModalType("birthday")
      } else if (lockOptions.show_with_sensitive_content && !checkCookieForBlock("sensitive")) {
        setModalType("sensitive")
      } else if (lockOptions.show_with_subscribe && !checkCookieForBlock("subscribe")) {
        setModalType("subscribe")
      } else {
        onVerified()
        onClose()
      }
    } else {
      codeForm.setError("code", { message: "Invalid code" })
    }
  })

  // Handle birthday verification
  const handleBirthdaySubmit = birthdayForm.handleSubmit((data) => {
    const currentYear = new Date().getFullYear()
    const age = currentYear - parseInt(data.year)
    const requiredAge = currentYear - lockOptions.birthday_year

    if (age >= requiredAge) {
      setCookieForBlock("birthday")
      // Check if there are other locks to verify
      if (lockOptions.show_with_sensitive_content && !checkCookieForBlock("sensitive")) {
        setModalType("sensitive")
      } else if (lockOptions.show_with_subscribe && !checkCookieForBlock("subscribe")) {
        setModalType("subscribe")
      } else {
        onVerified()
        onClose()
      }
    } else {
      birthdayForm.setError("year", { message: "You must be at least " + requiredAge + " years old" })
    }
  })

  // Handle sensitive content confirmation
  const handleSensitiveConfirm = () => {
    setCookieForBlock("sensitive")
    // Check if there are other locks to verify
    if (lockOptions.show_with_subscribe && !checkCookieForBlock("subscribe")) {
      setModalType("subscribe")
    } else {
      onVerified()
      onClose()
    }
  }

  // Handle email subscription
  const handleSubscribeSubmit = subscribeForm.handleSubmit((data) => {
    // Here you would typically send the email to your backend
    // For now, we'll just set the cookie
    setCookieForBlock("subscribe")
    onVerified()
    onClose()
  })

  // Render code verification modal
  const renderCodeModal = () => (
    <Modal
      opened={modalType === "code" && isOpen}
      onClose={onClose}
      title={t("lockModals.code.title", "Enter Passcode")}
      centered>
      <form onSubmit={handleCodeSubmit}>
        <Stack>
          <TextInput
            label={t("lockModals.code.label", "Enter the passcode to access this content")}
            placeholder="0000"
            {...codeForm.register("code")}
            error={codeForm.formState.errors.code?.message}
          />
          <Group position="right">
            <Button type="submit" loading={codeForm.formState.isSubmitting}>
              {t("lockModals.code.submit", "Submit")}
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  )

  // Render birthday verification modal
  const renderBirthdayModal = () => (
    <Modal
      opened={modalType === "birthday"&& isOpen}
      onClose={onClose}
      title={t("lockModals.birthday.title", "Age Verification")}
      centered>
      <form onSubmit={handleBirthdaySubmit}>
        <Stack>
          <Text size="sm">
            {t(
              "lockModals.birthday.description",
              "This content is age-restricted. Please enter your birth year to continue.",
            )}
          </Text>
          <TextInput
            label={t("lockModals.birthday.label", "Birth Year")}
            placeholder="YYYY"
            {...birthdayForm.register("year")}
            error={birthdayForm.formState.errors.year?.message}
          />
          <Group position="right">
            <Button type="submit" loading={birthdayForm.formState.isSubmitting}>
              {t("lockModals.birthday.submit", "Verify")}
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  )

  // Render sensitive content warning modal
  const renderSensitiveModal = () => (
    <Modal
      opened={modalType === "sensitive" && isOpen}
      onClose={onClose}
      title={t("lockModals.sensitive.title", "Content Warning")}
      centered>
      <Stack>
        <Text>
          {t(
            "lockModals.sensitive.description",
            "This content may be sensitive for some users. Are you sure you want to continue?",
          )}
        </Text>
        <Group position="right">
          <Button variant="outline" onClick={onClose}>
            {t("lockModals.sensitive.cancel", "Cancel")}
          </Button>
          <Button onClick={handleSensitiveConfirm}>{t("lockModals.sensitive.confirm", "Continue")}</Button>
        </Group>
      </Stack>
    </Modal>
  )

  // Render email subscription modal
  const renderSubscribeModal = () => (
    <Modal
      opened={modalType === "subscribe"}
      onClose={onClose}
      title={t("lockModals.subscribe.title", "Subscribe to Continue")}
      centered>
      <form onSubmit={handleSubscribeSubmit}>
        <Stack>
          <Text size="sm">
            {t(
              "lockModals.subscribe.description",
              "Please subscribe with your email to access this content.",
            )}
          </Text>
          <TextInput
            label={t("lockModals.subscribe.label", "Email")}
            placeholder="your@email.com"
            {...subscribeForm.register("email")}
            error={subscribeForm.formState.errors.email?.message}
          />
          <Checkbox
            label={t("lockModals.subscribe.consent", "I agree to receive emails from this creator")}
            defaultChecked
          />
          <Group position="right">
            <Button type="submit" loading={subscribeForm.formState.isSubmitting}>
              {t("lockModals.subscribe.submit", "Subscribe")}
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  )

  return (
    <>
      {renderCodeModal()}
      {renderBirthdayModal()}
      {renderSensitiveModal()}
      {renderSubscribeModal()}
    </>
  )
}

export default LockModals

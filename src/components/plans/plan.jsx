import { Badge, Group, Stack, Text, Title } from "@mantine/core"
import { Check } from "lucide-react"
import { useTranslation } from "react-i18next"

import GetPlanButton from "./get-plan-button"

const Plan = ({ plan, type }) => {
  const { t } = useTranslation()
  return (
    <Stack className="plan" gap={"xl"} justify="space-between">
      {plan.is_featured && (
        <Badge size="xl" className="featured-badge">
          {t("plans.featured")}
        </Badge>
      )}
      <Stack gap={"xl"}>
        <Stack gap={"lg"} align="center">
          <Title order={3}>{t(`plans.names.${plan.name.toLowerCase()}`)}</Title>
          <Text>{t(`plans.plansDescription.${plan.name.toLowerCase()}`)}</Text>
          <div>
            <div className="flex items-center justify-center gap-2">
              <Text ta={"center"} fz="xl" fw={700}>
                {plan.monthly_price === 0 ? t("general.Free") : `${plan[type]}`}
              </Text>
              {plan.monthly_price !== 0 && (
                <img src="/riyal.svg" alt="riyal" className="w-5 object-contain" />
              )}
            </div>
            <Text fz={"sm"} ta={"center"}>
              {plan.annual_price === 0 ? t("plans.billed.free") : t("plans.billed." + type)}
            </Text>
          </div>
        </Stack>
        <Stack>
          <Text>{t(`plans.planContains.${plan.name.toLowerCase()}`)}</Text>
          <Stack gap={"md"}>
            {Object.entries(plan.settings).map(([key, value]) => {
              if (typeof value === "boolean" && value === true)
                return (
                  <Group gap={"xs"} key={key} wrap="nowrap">
                    <Check width={20} />
                    <Text fz={"sm"} key={key}>
                      {t(`plans.settings.${key}`)}
                    </Text>
                  </Group>
                )
              if (typeof value === "number")
                return (
                  <Group gap={"xs"} key={key} wrap="nowrap">
                    <Check width={20} />
                    <Text fz={"sm"} key={key}>
                      {t(`plans.settings.${key}`, { value })}
                    </Text>
                  </Group>
                )
              return null
            })}
          </Stack>
        </Stack>
      </Stack>
      {/* <Button variant="outline" component={"a"} href="https://google.com" radius={"xl"} mt={"auto"}>
        {t("plans.getStarted")}
      </Button> */}
      <GetPlanButton plan_id={plan.id} plan_period={type === "monthly_price" ? "monthly" : "annual"} />
    </Stack>
  )
}

export default Plan

/*
 * {
 *           "id": 2,
 *           "name": "Pro",
 *           "description": "Grow, know and own your following",
 *           "monthly_price": 9,
 *           "annual_price": 100,
 *           "is_featured": true,
 *           "settings": {
 *               "seo": true,
 *               "fonts": false,
 *               "pdf_size": 100,
 *               "file_size": 100,
 *               "subscribe": true,
 *               "image_size": 100,
 *               "video_size": 100,
 *               "ai_bio_link": true,
 *               "products_limit": 10,
 *               "qr_codes_limit": 100,
 *               "bio_pages_limit": 15,
 *               "bio_blocks_limit": 15,
 *               "sensitive_content": true,
 *               "custom_backgrounds": true,
 *               "removable_branding": true,
 *               "advanced_statistics": true,
 *               "password_protection": true,
 *               "prioritize_schedule": false,
 *               "analytics_integrations": true,
 *               "custom_footer_branding": true,
 *               "customer_domains_limit": 1,
 *               "links_statistics_limit": 1000,
 *               "enabled_bio_link_blocks": {
 *                   "faq": true,
 *                   "zid": true,
 *                   "link": true,
 *                   "text": true,
 *                   "audio": true,
 *                   "image": true,
 *                   "salla": true,
 *                   "vimeo": true,
 *                   "paypal": true,
 *                   "twitch": true,
 *                   "discord": true,
 *                   "divider": true,
 *                   "product": true,
 *                   "socials": true,
 *                   "spotify": true,
 *                   "threads": true,
 *                   "x_tweet": true,
 *                   "youtube": true,
 *                   "donation": true,
 *                   "facebook": true,
 *                   "snapchat": true,
 *                   "countdown": true,
 *                   "instagram": true,
 *                   "x_profile": true,
 *                   "google_map": true,
 *                   "apple_music": true,
 *                   "link_folder": true,
 *                   "sound_cloud": true,
 *                   "contact_form": true,
 *                   "image_slider": true,
 *                   "file": true,
 *                   "tiktok_video": true,
 *                   "buy_me_coffee": true,
 *                   "telegram_post": true,
 *                   "email_collector": true,
 *                   "pinterest_profile": true,
 *                   "share_stock_price": true
 *               },
 *               "payment_processors_limit": 10
 *           }
 *       },
 */

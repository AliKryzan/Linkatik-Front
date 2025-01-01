import { googleMeetIcon, moyasar, paypal, salla, stripe, tiktok, zed } from "../assets"

// languages locals
export const LOCALES = ["ar", "en"]
// local storage key for storing user data
export const LOCALSTORAGE_KEY = "linkatik_user"
export const BASE_URL = "https://app.linkatik.com"
// number of element per page in table
export const PER_PAGE_DEFAULT = 10
// payment gateways

export const PAYMENTGATEWAYS = {
  stripe: {
    name: "Stripe",
    key: "stripe",
    image: stripe,
    formKeys: [
      {
        name: "inputKek",
        label: "inputLabel",
        type: "inputType",
        placeholder: "inputPlaceHolder",
      },
      {
        name: "inputKek",
        label: "inputLabel",
        type: "inputType",
        placeholder: "inputPlaceHolder",
      },
      {
        name: "inputKek",
        label: "inputLabel",
        type: "inputType",
        placeholder: "inputPlaceHolder",
      },
      {
        name: "inputKek",
        label: "inputLabel",
        type: "inputType",
        placeholder: "inputPlaceHolder",
      },
    ],
    description:
      "Stripe is a hosted payment service provider that allows businesses to accept online payments. Stripe supports multiple payment methods and currencies.",
  },

  paypal: {
    name: "Paypal",
    key: "paypal",
    image: paypal,
    formKeys: [
      {
        name: "inputKek",
        label: "inputLabel",
        type: "inputType",
        placeholder: "inputPlaceHolder",
      },
      {
        name: "inputKek",
        label: "inputLabel",
        type: "inputType",
        placeholder: "inputPlaceHolder",
      },
      {
        name: "inputKek",
        label: "inputLabel",
        type: "inputType",
        placeholder: "inputPlaceHolder",
      },
      {
        name: "inputKek",
        label: "inputLabel",
        type: "inputType",
        placeholder: "inputPlaceHolder",
      },
    ],
    description:
      "PayPal is an online payment service provider that allows businesses to accept online payments. PayPal supports multiple payment methods and currencies.",
  },
  moyasar: {
    name: "Moyasar",
    key: "moyasar",
    image: moyasar,
    formKeys: [
      {
        name: "inputKek",
        label: "inputLabel",
        type: "inputType",
        placeholder: "inputPlaceHolder",
      },
      {
        name: "inputKek",
        label: "inputLabel",
        type: "inputType",
        placeholder: "inputPlaceHolder",
      },
      {
        name: "inputKek",
        label: "inputLabel",
        type: "inputType",
        placeholder: "inputPlaceHolder",
      },
      {
        name: "inputKek",
        label: "inputLabel",
        type: "inputType",
        placeholder: "inputPlaceHolder",
      },
    ],
    description:
      "Moyasar is an online payment service provider that allows businesses to accept online payments. Moyasar supports multiple payment methods and currencies.",
  },
}
export let PAYMENTGATEWAYS_LOGOS = {}

Object.values(PAYMENTGATEWAYS).forEach((gateway) => (PAYMENTGATEWAYS_LOGOS[gateway.key] = gateway.image))

export const bio_blocks = {
  faq: "الاسئلة الشائعة",
  zid: "زيد",
  link: "رابط",
  text: "نص",
  audio: "صوت",
  image: "صورة",
  salla: "سلة",
  vimeo: "فيميو",
  paypal: "باي بال",
  twitch: "تويتش",
  discord: "ديسكورد",
  divider: "فاصل",
  product: "منتج",
  socials: "وسائل التواصل الاجتماعي",
  spotify: "سبوتيفاي",
  threads: "ثريدز",
  x_tweet: "تغريدة على إكس",
  youtube: "يوتيوب",
  donation: "تبرع",
  facebook: "فيسبوك",
  snapchat: "سناب شات",
  countdown: "عداد تنازلي",
  instagram: "انستجرام",
  x_profile: "ملف إكس الشخصي",
  google_map: "خريطة جوجل",
  apple_music: "آبل ميوزيك",
  link_folder: "مجلد الروابط",
  sound_cloud: "ساوند كلاود",
  contact_form: "نموذج الاتصال",
  image_slider: "شريط تمرير الصور",
  file: "مستند PDF",
  tiktok_video: "فيديو تيك توك",
  buy_me_coffee: "اشتر لي قهوة",
  telegram_post: "منشور تلغرام",
  email_collector: "جامع البريد الإلكتروني",
  pinterest_profile: "ملف بينتيريست الشخصي",
  share_stock_price: "سعر السهم",
}

export const INTEGRATIONS = {
  google_meet: {
    icon: googleMeetIcon,
    name: "google_meet",
    integration_url: "https://back-dev-project.linkatik.com/login/google/token/redirect",
  },
  zid: {
    icon: zed,
    name: "zid",
    integration_url: "/user/zid/get/connect",
  },
  salla: {
    icon: salla,
    name: "salla",
    integration_url: "/user/salla/get/connect",
  },
  tiktok: {
    icon: tiktok,
    name: "tiktok",
    integration_url: "/user/tiktok/connect",
  },
}

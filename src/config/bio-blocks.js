import {
  appleMusic,
  buyMeCoffee,
  calender,
  contactForm,
  contactInfo,
  counter,
  digitalProduct,
  discord,
  document,
  email,
  facebook,
  fag,
  gallery,
  image,
  instagram,
  link,
  location,
  music,
  paypal,
  pintrest,
  salla,
  snapchat,
  socials,
  soundCloud,
  space,
  spotifiy,
  telegram,
  text,
  threads,
  tiktok,
  title,
  twitch,
  uploadImage,
  video,
  vimeo,
  x,
  youtube,
  zed,
} from "../assets"

export const BIOBLOCKS = {
  general: [
    {
      name: "link",
      icon: link,
    },
    {
      name: "video",
      icon: video,
      type: "no_url",
    },

    {
      name: "socials",
      icon: socials,
      type: "no_url",
    },
    {
      name: "audio",
      icon: music,
      type: "no_url",
    },
    {
      name: "youtube",
      icon: youtube,
      link_behavior: true,
    },
    {
      name: "header",
      icon: title,
      type: "no_url",
    },
    {
      name: "pinterest_profile",
      icon: pintrest,
      link_behavior: true,
    },
    {
      name: "spotify",
      icon: spotifiy,
      link_behavior: true,
    },
    {
      name: "tiktok_video",
      icon: tiktok,
      link_behavior: true,
    },
    {
      name: "sound_cloud",
      icon: soundCloud,
      link_behavior: true,
    },
    {
      name: "twitch",
      icon: twitch,
      link_behavior: true,
    },
    {
      name: "x_tweet",
      icon: x,
    },
    {
      name: "instagram",
      icon: instagram,
    },
    {
      name: "facebook",
      icon: facebook,
    },
    {
      name: "vimeo",
      icon: vimeo,
      link_behavior: true,
    },
    {
      name: "apple_music",
      icon: appleMusic,
      link_behavior: true,
    },
    {
      name: "snapchat",
      icon: snapchat,
    },
    {
      name: "tiktok_profile",
      icon: tiktok,
    },
    {
      name: "discord",
      icon: discord,
    },
    {
      name: "threads",
      icon: threads,
    },
    {
      name: "telegram_post",
      icon: telegram,
      link_behavior: true,
    },
  ],
  commercial: [
    {
      name: "product",
      icon: digitalProduct,
      type: "no_url",
    },
    {
      name: "buy_me_coffee",
      icon: buyMeCoffee,
    },
    {
      name: "salla",
      icon: salla,
      type: "no_url",
    },
    {
      name: "booking",
      icon: calender,
      type: "no_url",
    },
    {
      name: "zid",
      icon: zed,
      type: "no_url",
    },
    {
      name: "paypal",
      icon: paypal,
    },
  ],
  advanced: [
    {
      name: "vcard",
      icon: contactInfo,
      type: "no_url",
    },
    {
      name: "contact_form",
      icon: contactForm,
      type: "no_url",
    },
    {
      name: "google_map",
      icon: location,
      link_behavior: true,
    },
    {
      name: "faq",
      icon: fag,
      type: "no_url",
    },
    {
      name: "file",
      icon: document,
      type: "no_url",
    },
    {
      name: "image",
      icon: image,
      type: "no_url",
    },
    {
      name: "image_slider",
      icon: uploadImage,
      type: "no_url",
    },
    {
      name: "text_block",
      icon: text,
      type: "no_url",
    },
    {
      name: "countdown",
      icon: counter,
      type: "no_url",
    },
    {
      name: "divider",
      icon: space,
      type: "no_url",
    },
    {
      name: "image_gallery",
      icon: gallery,
      type: "no_url",
    },
    {
      name: "email_collector",
      icon: email,
      type: "no_url",
    },
    {
      name: "share_stock_price",
      icon: paypal,
    },
  ],
}

export const BlocksInArray = Object.values(BIOBLOCKS).flat()
export const BlocksWithLinkBehavior = BlocksInArray.filter((block) => block.link_behavior).map(
  (block) => block.name,
)
export const NoURlBlocks = BlocksInArray.filter((block) => block.type === "no_url").map((block) => block.name)

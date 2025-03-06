import { AuthLinkatikApi, LinkatikApi } from ".."
import { INTEGRATIONS, PER_PAGE_DEFAULT } from "../../config"
import { queryClient } from "@/lib/react-query/react-query-provider"
import { getLocalstorageUser } from "@/utils/get-localstorage-user"

/**
 * Get user data from the server
 * @function
 * @param {string} [params.token] - User token
 * @returns {object} User data
 */
export const GetUser = async ({ token }) => {
  const response = token
    ? await LinkatikApi.get("/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    : await AuthLinkatikApi.get("/user/profile")
  const user = response.data.data
  user.token = getLocalstorageUser()?.token || token
  return user
}

export const GetInterests = async (params) => {
  const response = await LinkatikApi.get("/user/interests", {
    params: {
      // default for 50 items (register page shows interests to select from , no need for infinite scroll)
      per_page: 50,
      "include[]": "subInterests",
      " filter[is_active]": "true",
      ...params,
    },
  })

  return response
}

export const GetPlans = async () => {
  const response = await AuthLinkatikApi.get("/user/plans")

  return response
}

export const PostTransaction = async (data) => {
  const response = await AuthLinkatikApi.post("/user/transaction", data)

  return response
}
export const PostUpgradePlane = async (data) => {
  const response = await AuthLinkatikApi.post("/user/transaction/upgrade", data)

  return response
}

export const GetBioPagesList = async (params) => {
  const response = await AuthLinkatikApi.get("/user/bio-pages", {
    params: { ...params },
  })
  const data = {
    data: response.data?.data || [],
    pagination: response.data.pagination,
  }
  return data
}

export const PutUpdateProfile = async (data) => {
  const response = await AuthLinkatikApi.put("/user/profile", data)
  return response
}

export const PutChangePassword = async (data) => {
  const response = await AuthLinkatikApi.put("/user/change-password", data)
  return response
}
export const DeleteProfile = async () => {
  const response = await AuthLinkatikApi.delete("/user/profile")
  return response
}

export const GetDomains = async (params) => {
  const response = await AuthLinkatikApi.get("/user/domains", {
    params: { per_page: PER_PAGE_DEFAULT, ...params },
  })
  const data = {
    data: response.data?.data || [],
    pagination: response.data.pagination,
  }
  return data
}
export const GetSubscribers = async (params) => {
  const response = await AuthLinkatikApi.get("/user/subscribers", {
    params: { per_page: PER_PAGE_DEFAULT, ...params },
  })
  const data = {
    data: response.data?.data || [],
    pagination: response.data.pagination,
  }
  return data
}

export const PostDomain = async (data) => {
  const response = await AuthLinkatikApi.post("/user/domains", data)
  return response
}

export const DeleteDomain = async (id) => {
  const response = await AuthLinkatikApi.delete(`/user/domains/${id}`)
  return response
}
export const PutDomain = async (id, data) => {
  const response = await AuthLinkatikApi.put(`/user/domains/${id}`, data)
  return response
}
export const GetProducts = async (params) => {
  const response = await AuthLinkatikApi.get("/user/products", {
    params: { per_page: PER_PAGE_DEFAULT, ...params },
  })
  const data = {
    data: response.data?.data || [],
    pagination: response.data.pagination,
  }
  return data
}

export const GetZidProducts = async (params) => {
  const response = await AuthLinkatikApi.get("user/zid/products", {
    params: { per_page: PER_PAGE_DEFAULT, ...params },
  })
  const data = {
    data: response.data?.data || [],
    pagination: response.data.pagination,
  }
  return data
}

export const GetSallaProducts = async (params) => {
  const response = await AuthLinkatikApi.get("/user/salla/products", {
    params: { per_page: PER_PAGE_DEFAULT, ...params },
  })
  const data = {
    data:
      response.data?.data.map((product) => ({
        id: product.id,
        title: product.name,
        image: product.thumbnail,
      })) || [],
    pagination: response.data.pagination,
  }
  return data
}
export const GetProduct = async (id) => {
  const response = await AuthLinkatikApi.get(`/user/products/show/${id}`)

  return response.data.data
}

export const PostProduct = async (data) => {
  const response = await AuthLinkatikApi.post("/user/products", data)
  return response
}

export const DeleteProduct = async (id) => {
  const response = await AuthLinkatikApi.delete(`/user/products/${id}`)
  return response
}

export const PutProduct = async (id, data) => {
  const response = await AuthLinkatikApi.post(`/user/products/${id}?_method=put`, data)
  return response
}

export const GetPaymentsGateWays = async (params) => {
  const response = await AuthLinkatikApi.get(`/user/payment-processors`, {
    params: { per_page: PER_PAGE_DEFAULT, ...params },
  })
  const data = {
    data: response.data?.data || [],
    pagination: response.data.pagination,
  }
  return data
}

export const PostPaymentsGateWays = async (data) => {
  const response = await AuthLinkatikApi.post("/user/payment-processors", data)
  return response
}
export const PutPaymentsGateWays = async (id, data) => {
  const response = await AuthLinkatikApi.put(`/user/payment-processors/${id}`, data)
  return response
}

export const DeletePaymentGateWay = async (id) => {
  const response = await AuthLinkatikApi.delete(`/user/payment-processors/${id}`)
  return response
}


export const PostCreateBioPage = async (data,bioImage,image_type) => {

  console.log("image_type------>",image_type)

  try {
    const response = await AuthLinkatikApi.post("/user/bio-pages", {
      ...data,  
      [image_type === 'custom' ? "image" : "image_avatar"]: bioImage

    });

    return response;
  } catch (error) {
    console.error("Error in PostCreateBioPage:", error);
    throw error; 
  }
};



// export const PostCreateBioPage = async (data, bioImage) => {
//   try {
//     const formData = new FormData();

//     // إضافة البيانات النصية
//     Object.keys(data).forEach((key) => {
//       formData.append(key, data[key]);
//     });
//     if (bioImage) {
//       formData.append("image", bioImage); 
//     }

//     const response = await AuthLinkatikApi.post("/user/bio-pages", formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });

//     return response;
//   } catch (error) {
//     console.error("Error in PostCreateBioPage:", error);
//     throw error;
//   }
// };



export const DeleteBioPage = async ({ id }) => {
  const response = await AuthLinkatikApi.delete(`/user/bio-pages/${id}`)
  return response
}

export const GetBioPage = async (id, { params }) => {
  const response = await AuthLinkatikApi.get(`user/bio-page/${id}/bio-blocks`, {
    params,
  })
  return response.data
}
export const GetLinkDetections = async (params) => {
  const response = await AuthLinkatikApi.get("/user/link/detect", {
    params,
  })
  return response.data.data
}

export const PostCreateBlock = async (pageId, data) => {
  const response = await AuthLinkatikApi.post(`/user/bio-page/${pageId}/bio-blocks`, data)
  console.log("🚀 ~ PostCreateBlock ~ response:", response)

  return response.data
}

export const DeleteBioBlock = async ({ pageId, blockId }) => {
  const response = await AuthLinkatikApi.delete(`/user/bio-page/${pageId}/bio-blocks/${blockId}`)
  return response
}

export const PutUpdateBlock = async ({ pageId, blockId, data, abortSignal }) => {
  if (data.url && data.type !== "link") {
    const response = await GetLinkDetections({ url: data.url })
    if (response.type !== data.type) throw new Error("الرابط غير متوافق مع نوع البلوك")
  }
  if ("url" in data && !data.url) throw new Error("لا يمكن ترك الرابط فارغا")
  const response = await AuthLinkatikApi.put(
    `/user/bio-page/${pageId}/bio-blocks/${blockId}`,
    {
      bio_page_id: pageId,
      ...data,
    },
    {
      signal: abortSignal ? abortSignal : null,
    },
  )

  if (data.order) {
    queryClient.invalidateQueries({ queryKey: ["bio-page-preview"] })
  }
  queryClient.invalidateQueries({ queryKey: ["bio-block-preview", blockId] })
  if (data.schedule) {
    queryClient.invalidateQueries({ queryKey: ["bio-page", pageId] })
  }
  return response
}

export const GetPagePreview = async (path) => {
  const response = await AuthLinkatikApi.get(`/${path}`)
  return response.data
}

export const GetSuccessfullyPreview = async (id) => {
  const response = await AuthLinkatikApi.get(`/user/bio-pages/${id}`)
  return response.data
}

export const GetPageAppearance = async (path) => {
  const response = await AuthLinkatikApi.get(`/${path}`)
  return response.data.data
}

export const GetBlockPreview = async (pageId, blockId) => {
  const response = await AuthLinkatikApi.get(`/bio-page/${pageId}/bio-block/${blockId}`)
  return response.data
}

export const GetBioPageInfo = async (pageId) => {
  const response = await AuthLinkatikApi.get(`/user/bio-pages/${pageId}`)
  return response.data
}

export const GetBioPageThemes = async ({
  params = {
    per_page: 50,
  },
}) => {
  const response = await AuthLinkatikApi.get("/user/bio-page-themes", { params })
  return response.data
}
export const PutUpdateBioPage = async ({ id, data, abortSignal }) => {
  const response = await AuthLinkatikApi.put(
    `/user/bio-pages/${id}`,
    {
      id,
      ...data,
    },
    {
      signal: abortSignal ? abortSignal : null,
    },
  )
  queryClient.invalidateQueries({ queryKey: ["bio-page-preview"] })
  return response
}
export const GetBioPageStatistics = async (pageId) => {
  const response = await AuthLinkatikApi.get(`/user/bio-page-stats-index?bio_page_id=${pageId}`)
  return response.data
}
export const GetGeneralStatistics = async () => {
  const response = await AuthLinkatikApi.get(`/user/statistics`)
  return response.data
}

export const PostSubscribe = async (data) => {
  const response = await LinkatikApi.post("/user/subscribe", data)
  return response
}

export const GetIntegrations = async () => {
  const response = await AuthLinkatikApi.get("/user/integration")
  return response.data
}
export const GetIntegrate = async ({ type, ...params }) => {
  const url = INTEGRATIONS[type].integration_url
  const response = await AuthLinkatikApi.get(url, { params })
  return response.data
}
export const PostRemoveIntegrations = async (body) => {
  const response = await AuthLinkatikApi.post("/user/integration/remove", body)
  return response.data
}

export const PostIntegrationCallback = async (integration, body) => {
  const response = await AuthLinkatikApi.post(`/user/${integration}/callback`, body)
  return response.data
}

export const GetProductPreview = async (slug) => {
  const response = await LinkatikApi.get(`/product/show/${slug}`)
  return response.data.data
}

export const PostPlaceOrder = async (data) => {
  const response = await LinkatikApi.post("/user/order", data)
  return response.data.data
}

export const GetOrders = async (params) => {
  const response = AuthLinkatikApi.get("/user/orders", {
    params,
  })

  return (await response).data
}

export const ResetPasswordService = async (data) => {
  const response = await LinkatikApi.post("/user/reset-password", data)
  return response.data
}

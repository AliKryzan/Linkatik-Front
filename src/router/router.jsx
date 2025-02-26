import { Suspense } from "react"
import AuthLayout from "@/layouts/auth-layout"
import { UserLayout } from "@/layouts/user-layout"
import ForgotPassword from "@/pages/(auth)/forgot-password"
import Login from "@/pages/(auth)/login"
import Plans from "@/pages/(auth)/plans"
import SignUp from "@/pages/(auth)/sign-up/sign-up"
import ThankYou from "@/pages/(auth)/thank-you"
import CallBack from "@/pages/[integration]/callback"
import Preview from "@/pages/preview/bio-page-preview"
import WebProductPreview from "@/pages/preview/web-product-preview"
import CreateBioPage from "@/pages/user/bio-pages/create-bio-page"
import SuccessfullyCreatedBio from "@/pages/user/bio-pages/Successfully-created-bio"
import Dashboard from "@/pages/user/dashboard"
import AddDomain from "@/pages/user/domains/add-domain"
import Domains from "@/pages/user/domains/domains"
import UpdateDomain from "@/pages/user/domains/update-domain"
import Integrations from "@/pages/user/integrations/integrations"
import Orders from "@/pages/user/orders/Orders"
import PaymentGateways from "@/pages/user/payments-gateways/payment-gateways"
import CreateProduct from "@/pages/user/products/create-product"
import Products from "@/pages/user/products/products"
import UpdateProduct from "@/pages/user/products/update-product"
import Profile from "@/pages/user/profile"
import Subscribers from "@/pages/user/subscribers/subscribers"
import { Group } from "@mantine/core"
import { createBrowserRouter } from "react-router-dom"

import LanguageWrapper from "@/lib/i18n/language-wrapper"
import { Navigate } from "@/lib/i18n/navigation"
import Loader from "@/components/common/loader"

import ProtectedRoute from "./protected-routes"
import RouterErrorBoundary from "./RouterErrorBoundary"

export const MyRouter = createBrowserRouter([
  {
    path: "/:lang?",
    element: <LanguageWrapper />,
    errorElement: <RouterErrorBoundary />,
    children: [
      {
        path: "",
        element: (
          <>
            <Navigate to="/user" />
          </>
        ),
      },
      {
        element: <AuthLayout />,
        children: [
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "signup",
            element: <SignUp />,
          },
          {
            path: "forgot-password",
            element: <ForgotPassword />,
          },

          {
            path: "plans",
            element: <Plans />,
          },
          {
            path: "payment",
            element: <ThankYou />,
          },
        ],
      },
      {
        path: "user",
        element: (
          <ProtectedRoute>
            <UserLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "dashboard?",
            element: <Dashboard />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "bio-pages",
            children: [
              { path: "", element: <Navigate to="/user" /> },
              {
                path: ":id/:path",
                element: <CreateBioPage />,
              },
              {
                path: ":id/:path/Successfully",
                element: <SuccessfullyCreatedBio />,
              },
            ],
          },
          {
            path: "products",
            children: [
              { path: "", element: <Products /> },
              {
                path: "add-product",
                element: <CreateProduct />,
              },
              {
                path: ":productId",
                element: (
                  <Suspense
                    fallback={
                      <Group p="xl">
                        <Loader />
                      </Group>
                    }>
                    <UpdateProduct />,
                  </Suspense>
                ),
              },
            ],
          },
          {
            path: "domains",
            children: [
              { path: "", element: <Domains /> },
              {
                path: "add-domain",
                element: <AddDomain />,
              },
              {
                path: ":id",
                element: <UpdateDomain />,
              },
            ],
          },
          {
            path: "payment-gateways",
            element: <PaymentGateways />,
          },
          {
            path: "integrations",
            element: <Integrations />,
          },
          {
            path: "subscriptions",
            element: <Subscribers />,
          },
          {
            path: "orders",
            element: <Orders />,
          },
        ],
      },
      {
        path: "preview/:path",
        element: (
          <ProtectedRoute>
            <Preview isStandAlonePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "preview/product/:slug",
        element: (
          <Suspense
            fallback={
              <Group p="xl">
                <Loader />
              </Group>
            }>
            <WebProductPreview />,
          </Suspense>
        ),
      },
      {
        path: ":integration/callback",
        element: <CallBack />,
      },
    ],
  },
])

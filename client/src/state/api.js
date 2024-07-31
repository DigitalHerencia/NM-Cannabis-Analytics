import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: [
    "User",
    "Users",
    "Products",
    "Categories",
    "Breakdown",
    "Sales",
    "Performance",
    "KPI",
    "Dispensary",
    "Dispensaries",
    "Comparison",
    "Comparisons",
    "Promotions",
  ],
  endpoints: (build) => ({
    getProductCategories: build.query({
      query: () => "breakdown/product-categories",
      providesTags: ["Categories"],
    }),
    getBreakdown: build.query({
      query: () => "breakdown/breakdown",
      providesTags: ["Breakdown"],
    }),
    getAllPromotions: build.query({
      query: () => "dispensaries/promotions",
      providesTags: ["Promotions"],
    }),
    getUser: build.query({
      query: (userId) => ({
        url: "users/user",
        params: { userId },
      }),
      providesTags: ["User"],
    }),
    getUsers: build.query({
      query: () => "users/users",
      providesTags: ["Users"],
    }),
    createUser: build.mutation({
      query: (newUser) => ({
        url: "users/user",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["Users"],
    }),
    updateUser: build.mutation({
      query: ({ userId, ...patch }) => ({
        url: `users/user`,
        method: "PUT",
        body: { userId, ...patch },
      }),
      invalidatesTags: ["User", "Users"],
    }),
    deleteUser: build.mutation({
      query: (userId) => ({
        url: `users/user`,
        method: "DELETE",
        params: { userId },
      }),
      invalidatesTags: ["Users"],
    }),
    getProducts: build.query({
      query: ({ menuId, page, pageSize }) => ({
        url: `menus/products`,
        params: { menuId, page, pageSize },
      }),
      providesTags: ["Products"],
    }),
    getAllProducts: build.query({
      query: () => "menus/all-products",
      providesTags: ["Products"],
    }),
    getSales: build.query({
      query: () => "sales/sales",
      providesTags: ["Sales"],
    }),
    getDispensary: build.query({
      query: (id) => `dispensaries/dispensary/${id}`,
      providesTags: ["Dispensary"],
    }),
    getDispensaries: build.query({
      query: () => "dispensaries/dispensaries",
      providesTags: ["Dispensaries"],
    }),
    getComparisonById: build.query({
      query: ({ menuId }) => ({
        url: `comparison/comparison`,
        params: { menuId },
      }),
      providesTags: ["Comparison"],
    }),
    getComparisons: build.query({
      query: () => "comparison/comparisons",
      providesTags: ["Comparisons"],
    }),
    getPerformance: build.query({
      query: () => "city/performance",
      providesTags: ["Performance"],
    }),
    getKPI: build.query({
      query: () => "kpi/kpi",
      providesTags: ["KPI"],
    }),
    createKPI: build.mutation({
      query: () => "kpi/kpi",
      method: "POST",
      invalidatesTags: ["KPI"],
    }),
    deleteKPI: build.mutation({
      query: (id) => ({
        url: `kpi/kpi`,
        method: "DELETE",
        params: { id },
      }),
      invalidatesTags: ["KPI"],
    }),
  }),
});

export const {
  useGetProductCategoriesQuery,
  useGetBreakdownQuery,
  useGetAllPromotionsQuery,
  useGetUserQuery,
  useGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetAllProductsQuery,
  useGetProductsQuery,
  useGetSalesQuery,
  useGetPerformanceQuery,
  useGetDispensaryQuery,
  useGetDispensariesQuery,
  useCreateKPIMutation,
  useDeleteKPIMutation,
  useGetKPIQuery,
  useGetComparisonsQuery,
  useGetComparisonByIdQuery,
} = api;

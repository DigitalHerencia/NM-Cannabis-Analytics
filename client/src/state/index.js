import { configureStore, createSlice } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "./api";

// Global Slice for UI mode
const globalInitialState = {
  mode: "dark",
};

const globalSlice = createSlice({
  name: "global",
  initialState: globalInitialState,
  reducers: {
    setMode: (state, action) => {
      state.mode =
        action.payload || (state.mode === "light" ? "dark" : "light");
    },
  },
});

export const { setMode } = globalSlice.actions;

// KPI Slice
const kpiInitialState = {
  dispensaryId: "664ed1acb153ce8190e15227",
  menuId: "664a6f5e8d1c437542d64d96",
  salesId: "664a72e5b746f053c2ab9f5a",
  userId: "6677972f84c55e7127d018f6",
};

const kpiSlice = createSlice({
  name: "kpi",
  initialState: kpiInitialState,
  reducers: {
    setKPI: (state, action) => {
      state.dispensaryId = action.payload.dispensaryId || state.dispensaryId;
      state.menuId = action.payload.menuId || state.menuId;
      state.salesId = action.payload.salesId || state.salesId;
      localStorage.setItem("dispensaryId", state.dispensaryId);
      localStorage.setItem("menuId", state.menuId);
      localStorage.setItem("salesId", state.salesId);
    },
  },
});

export const { setKPI } = kpiSlice.actions;

// Calendar Slice
const calendarInitialState = {
  promotions: JSON.parse(localStorage.getItem("calendarPromotions")) || [],
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState: calendarInitialState,
  reducers: {
    setPromotions: (state, action) => {
      state.promotions = action.payload || [];
      localStorage.setItem(
        "calendarPromotions",
        JSON.stringify(state.promotions)
      );
    },
    addPromotion: (state, action) => {
      if (!action.payload) return;
      state.promotions.push(action.payload);
      localStorage.setItem(
        "calendarPromotions",
        JSON.stringify(state.promotions)
      );
    },
    updatePromotion: (state, action) => {
      const { id, updates } = action.payload || {};
      const promotionIndex = state.promotions.findIndex(
        (promotion) => promotion.id === id
      );
      if (promotionIndex !== -1) {
        state.promotions[promotionIndex] = {
          ...state.promotions[promotionIndex],
          ...updates,
        };
        localStorage.setItem(
          "calendarPromotions",
          JSON.stringify(state.promotions)
        );
      }
    },
    removePromotion: (state, action) => {
      if (!action.payload) return;
      state.promotions = state.promotions.filter(
        (promotion) => promotion.id !== action.payload
      );
      localStorage.setItem(
        "calendarPromotions",
        JSON.stringify(state.promotions)
      );
    },
  },
});

export const { setPromotions, addPromotion, updatePromotion, removePromotion } =
  calendarSlice.actions;

// Products Slice
const productsSlice = createSlice({
  name: "products",
  initialState: {
    productsData: [],
  },
  reducers: {
    setProducts(state, action) {
      state.productsData = action.payload;
    },
  },
});

export const { setProducts } = productsSlice.actions;

// Comparisons Slice
const comparisonsSlice = createSlice({
  name: "comparisons",
  initialState: {
    comparisonsData: [],
  },
  reducers: {
    setComparisons(state, action) {
      state.comparisonsData = action.payload;
    },
  },
});

export const { setComparisons } = comparisonsSlice.actions;

// Chart Slice for managing chart data
const chartInitialState = {
  projects: JSON.parse(localStorage.getItem("projects")) || [],
};

const chartSlice = createSlice({
  name: "chart",
  initialState: chartInitialState,
  reducers: {
    addProject: (state, action) => {
      state.projects.push(action.payload);
      localStorage.setItem("projects", JSON.stringify(state.projects));
    },
    updateProject: (state, action) => {
      const index = state.projects.findIndex((project) => project.id === action.payload.id);
      if (index !== -1) {
        state.projects[index] = action.payload;
        localStorage.setItem("projects", JSON.stringify(state.projects));
      }
    },
    deleteProject: (state, action) => {
      state.projects = state.projects.filter((project) => project.id !== action.payload);
      localStorage.setItem("projects", JSON.stringify(state.projects));
    },
  },
});

export const { addProject, updateProject, deleteProject } = chartSlice.actions;

export { calendarSlice, chartSlice, comparisonsSlice, kpiSlice, productsSlice };

// Store Configuration
const store = configureStore({
    reducer: {
        global: globalSlice.reducer,
        kpi: kpiSlice.reducer,
        calendar: calendarSlice.reducer,
        products: productsSlice.reducer,
        comparison: comparisonsSlice.reducer,
        chart: chartSlice.reducer,
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }).concat(
            api.middleware
        ),
    devTools: false,
})

setupListeners(store.dispatch);

export default store;

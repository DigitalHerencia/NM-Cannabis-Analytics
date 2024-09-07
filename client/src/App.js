import { CssBaseline, ThemeProvider } from "@mui/material/index.js"
import { createTheme } from "@mui/material/styles/index.js"
import React, { useMemo } from "react"
import { useSelector } from "react-redux"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import ErrorBoundary from "./components/ErrorBoundary.jsx"
import Admin from "./scenes/admin/index.jsx"
import Breakdown from "./scenes/breakdown/index.jsx"
import Daily from "./scenes/daily/index.jsx"
import Dashboard from "./scenes/dashboard/index.jsx"
import Forecast from "./scenes/forecast/index.jsx"
import Geography from "./scenes/geography/index.jsx"
import Layout from "./scenes/layout/index.jsx"
import Licensees from "./scenes/licensees/index.jsx"
import NotFound from "./scenes/notfound/index.jsx"
import Overview from "./scenes/overview/index.jsx"
import Performance from "./scenes/performance/index.jsx"
import Products from "./scenes/products/index.jsx"
import Reports from "./scenes/reports/index.jsx"
import { themeSettings } from "./theme.js"

function App() {
    // @ts-ignore
    const mode = useSelector((state) => state.global.mode)
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])

    return (
        <div className="app">
            <BrowserRouter>
                <ErrorBoundary>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <Routes>
                            <Route element={<Layout />}>
                                <Route path="/" element={<Dashboard />} />
                                <Route
                                    path="/dashboard"
                                    element={<Dashboard />}
                                />
                                <Route
                                    path="/products"
                                    element={<Products />}
                                />
                                <Route
                                    path="/forecast"
                                    element={<Forecast />}
                                />
                                <Route path="/reports" element={<Reports />} />
                                <Route
                                    path="/geography"
                                    element={
                                        <Geography isSidebarOpen={undefined} />
                                    }
                                />
                                <Route
                                    path="/overview"
                                    element={<Overview />}
                                />
                                <Route path="/daily" element={<Daily />} />
                                <Route
                                    path="/licensees"
                                    element={<Licensees />}
                                />
                                <Route
                                    path="/breakdown"
                                    element={<Breakdown />}
                                />
                                <Route path="/admin" element={<Admin />} />
                                <Route
                                    path="/performance"
                                    element={<Performance />}
                                />
                                <Route path="*" element={<NotFound />} />
                            </Route>
                        </Routes>
                    </ThemeProvider>
                </ErrorBoundary>
            </BrowserRouter>
        </div>
    )
}

export default App

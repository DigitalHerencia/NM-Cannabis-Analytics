import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import React, { useMemo } from "react"
import { useSelector } from "react-redux"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import ErrorBoundary from "./components/ErrorBoundary"
import Admin from "./scenes/admin"
import Breakdown from "./scenes/breakdown"
import Daily from "./scenes/daily"
import Dashboard from "./scenes/dashboard"
import Forecast from "./scenes/forecast"
import Geography from "./scenes/geography"
import Layout from "./scenes/layout"
import Licensees from "./scenes/licensees"
import NotFound from "./scenes/notfound"
import Overview from "./scenes/overview"
import Performance from "./scenes/performance"
import Products from "./scenes/products"
import Reports from "./scenes/reports"
import { themeSettings } from "./theme"

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

export default App;

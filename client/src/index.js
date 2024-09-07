// @ts-nocheck
import { disableReactDevTools } from "@fvilers/disable-react-devtools"
import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import App from "./App"
import "./index.css"
import store from "./state"

if (process.env.NODE_ENV === "production") {
    disableReactDevTools()
}

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <Provider store={store}>
        <App />
    </Provider>
)

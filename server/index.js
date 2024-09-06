// @ts-nocheck
import cors from "cors"
import dotenv from "dotenv"
import express from "express"
import helmet from "helmet"
import mongoose from "mongoose"
import morgan from "morgan"
import path from "path"
import breakdownRoute from "./routes/breakdownRoute.js"
import cityRoute from "./routes/cityRoute.js"
import comparisonRoutes from "./routes/comparisonRoute.js"
import dispensariesRoute from "./routes/dispensariesRoute.js"
import kpiRoute from "./routes/kpiRoute.js"
import menusRoute from "./routes/menusRoute.js"
import salesRoute from "./routes/salesRoute.js"
import usersRoute from "./routes/usersRoute.js"

// Load environment variables
dotenv.config()

// Initialize express app
const app = express()

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(morgan("common"))
app.use(cors())

// MongoDB connection
mongoose
    .set("strictQuery", false)
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((error) =>
        console.error("Failed to connect to MongoDB Atlas", error)
    )

// Routes
app.use("/users", usersRoute)
app.use("/menus", menusRoute)
app.use("/sales", salesRoute)
app.use("/dispensaries", dispensariesRoute)
app.use("/city", cityRoute)
app.use("/kpi", kpiRoute)
app.use("/comparison", comparisonRoutes)
app.use("/breakdown", breakdownRoute)

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
    const __dirname = path.resolve()
    app.use(express.static(path.join(__dirname, "../client/build")))
    app.get("*", (req, res) => {
        res.sendFile(
            path.resolve(__dirname, "../client", "build", "index.html")
        )
    })
}

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send("Something broke!")
})

// Set the PORT and start the server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

// @ts-nocheck
import bodyParser from "body-parser"
import cors from "cors"
import dotenv from "dotenv"
import express from "express"
import helmet from "helmet"
import mongoose from "mongoose"
import morgan from "morgan"
import breakdownRoute from "./routes/breakdownRoute.js"
import cityRoute from "./routes/cityRoute.js"
import comparisonRoutes from "./routes/comparisonRoute.js"
import dispensariesRoute from "./routes/dispensariesRoute.js"
import kpiRoute from "./routes/kpiRoute.js"
import menusRoute from "./routes/menusRoute.js"
import salesRoute from "./routes/salesRoute.js"
import usersRoute from "./routes/usersRoute.js"

dotenv.config()
const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(morgan("common"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

// Registering Routes
app.use("/users", usersRoute)
app.use("/menus", menusRoute)
app.use("/sales", salesRoute)
app.use("/dispensaries", dispensariesRoute)
app.use("/city", cityRoute)
app.use("/kpi", kpiRoute)
app.use("/comparison", comparisonRoutes)
app.use("/breakdown", breakdownRoute)

// MongoDB Connection
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

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

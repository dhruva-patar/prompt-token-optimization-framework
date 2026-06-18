import express from "express";
import cors from "cors";
import { env } from "../config/env.js";
import presetRoutes from "./v1/routes/preset.routes.js";
import analyticsRoutes
  from "./v1/routes/analytics.routes.js";
import { requestId } from "./middleware/requestId.js";
import { requestTimer } from "./middleware/requestTimer.js";
import { requestLogger } from "./middleware/requestLogger.js";
import { errorHandler } from "./middleware/errorHandler.js";
import sessionRoutes from "./v1/routes/session.routes.js";
import providerRoutes from "./v1/routes/provider.routes.js";
import optimizeRoutes from "./v1/routes/optimize.routes.js";
import classifyRoutes from "./v1/routes/classify.routes.js";
import benchmarkRoutes from "./v1/routes/benchmark.routes.js";

const app = express();
const PORT = env.port;

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
}));


app.use(express.json());

app.use(requestId);
app.use(requestLogger);
app.use(requestTimer);

app.use("/v1/presets", presetRoutes);
app.use(
  "/v1/analytics",
  analyticsRoutes
);
app.use("/v1/optimize", optimizeRoutes);
app.use("/v1/classify", classifyRoutes);
app.use("/v1/benchmark", benchmarkRoutes);
app.use("/v1/sessions", sessionRoutes);
app.use("/v1/providers", providerRoutes);

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "ptof-api",
  });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`PTOF API running on port ${PORT}`);
});

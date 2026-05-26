import express from "express";
import optimizeRoutes from "./v1/routes/optimize.routes.js";
import classifyRoutes from "./v1/routes/classify.routes.js";
import benchmarkRoutes from "./v1/routes/benchmark.routes.js";
import { requestLogger } from "./middleware/requestLogger.js";


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(requestLogger);
app.use("/v1/optimize", optimizeRoutes);
app.use("/v1/classify", classifyRoutes);
app.use("/v1/benchmark", benchmarkRoutes);

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "ptof-api",
  });
});

app.listen(PORT, () => {
  console.log(`PTOF API running on port ${PORT}`);
});

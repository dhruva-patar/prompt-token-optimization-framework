import express from "express";
import optimizeRoutes from "./routes/optimize.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/optimize", optimizeRoutes);

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "ptof-api",
  });
});

app.listen(PORT, () => {
  console.log(`PTOF API running on port ${PORT}`);
});

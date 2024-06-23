require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const receptionRoutes = require("./routes/reception.routes");
const managerRoutes = require("./routes/manager.routes");
const doctorRoutes = require("./routes/doctor.routes");
const pharmacistRoutes = require("./routes/pharmacist.routes");
const radiologistAdminRoutes = require("./routes/radiology/radiologyAdmin.routes");
const radiologistRoutes = require("./routes/radiology/radiologyDoctor.routes");
const nursingAdminRoutes = require("./routes/nursing/nursingAdmin.routes");
const nurseRoutes = require("./routes/nursing/nurse.routes");
const labAdminRoutes = require("./routes/lab/labAdmin.routes");
const labEmployeeRoutes = require("./routes/lab/labEmployee.routes");
const authRoutes = require("./routes/auth/login.routes");
const sharedRoutes = require("./routes/sharedRoutes");
const publicRoutes = require("./routes/public.routes");
const sequelize = require("./config/db");
const httpStatusText = require("./utils/httpStatusText");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
const port = process.env.PORT;

sequelize
  .authenticate()
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/public", publicRoutes);
app.use("/api/reception", receptionRoutes);
app.use("/api/manager", managerRoutes);
app.use("/api/doctor", doctorRoutes);
app.use("/api/pharmacist", pharmacistRoutes);
app.use("/api/radiology-admin", radiologistAdminRoutes);
app.use("/api/radiologist", radiologistRoutes);
app.use("/api/nursing-admin", nursingAdminRoutes);
app.use("/api/nurse", nurseRoutes);
app.use("/api/lab-admin", labAdminRoutes);
app.use("/api/lab", labEmployeeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/shared", sharedRoutes)

// Global error handler
app.use(errorHandler);

app.all("*", (req, res, next) => {
  res.status(404).json({
    status: httpStatusText.ERROR,
    message: `can't find ${req.originalUrl} on this server`,
  });
});

app.listen(port, () => {
  console.log(`
        connected to port ${port}
        http://localhost:${port}
    `);
});

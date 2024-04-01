import cors from "cors";

const allowedOrigins = ["http://localhost:3002"];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

export const corsOptions = cors(options);

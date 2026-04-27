import { CorsOptions } from "cors";

export const corsConfig: CorsOptions = {
  origin: (origin, callback) => {

    const whitelist = [
      process.env.FRONTEND_URL,
      "http://localhost:5173",
    ];

    console.log("Origin recibido:", origin);

    // 👇 CLAVE
    if (!origin) {
      return callback(null, true);
    }

    if (whitelist.includes(origin)) {
      return callback(null, true);
    }

    console.log("CORS bloqueado:", origin);
    callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
};
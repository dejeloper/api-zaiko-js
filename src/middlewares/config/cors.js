const whitelist = [
  "http://localhost:3000",
  "http://127.0.0.1:5500",
  "https://backend-zaiko.vercel.app",
];

export const option = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("No Permitido"));
    }
  },
};

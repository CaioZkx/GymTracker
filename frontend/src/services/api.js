import ky from "ky";

const api = ky.create({
  prefixUrl: "http://localhost:3000",
});

export default api;
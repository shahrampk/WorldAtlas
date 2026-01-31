import axios from "axios";

const api = axios.create({
  baseURL: "https://restcountries.com/v3.1",
});

export const getCountries = async () => {
  try {
    const response = await api.get(
      "/all?fields=name,population,area,continents,flags,languages,capital,region,subregion",
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching countries:", error);
    throw error;
  }
};

export default api;

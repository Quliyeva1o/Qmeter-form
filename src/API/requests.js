import axios from "axios";

const BASE_URL = "https://api.country.is/";

export const get = async () => {
    try {
        const response = await axios.get(BASE_URL);
        return response;
    } catch (err) {
        throw err;
    }
};
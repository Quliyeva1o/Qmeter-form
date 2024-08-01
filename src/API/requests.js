import axios from "axios";
import { BASE_URL } from "../utils/constants";


export const get = async () => {
    try {
        const response = await axios.get(BASE_URL);
        return response;
    } catch (err) {
        throw err;
    }
};
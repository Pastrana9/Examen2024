import { GraphQLError } from "graphql";
import { API_time } from "./type.ts";

const API_KEY = Deno.env.get("API_KEY");

export const getDatetime = async () => { // Eliminamos el parámetro 'country'
    if (!API_KEY) throw new GraphQLError("Error en la API_KEY");
    const url = `https://api.api-ninjas.com/v1/worldtime?timezone=Europe/Madrid`;  // Ponemos un valor fijo por ahora
    const data = await fetch(url, {
        headers: {
            'X-Api-Key': API_KEY,
        },
    });

    if (data.status !== 200) throw new GraphQLError("Error en la API");
    const result: API_time = await data.json();
    return result.datetime;
};

export const validatePhoneNumber = async (phone: string): Promise<boolean> => {
    const url = `https://api.api-ninjas.com/v1/phone?number=${phone}`;
    const response = await fetch(url, {
        headers: {
            'X-Api-Key': API_KEY!,
        },
    });

    if (response.status !== 200) throw new GraphQLError("Error al validar el número de teléfono");
    const result = await response.json();
    return result.valid;
};


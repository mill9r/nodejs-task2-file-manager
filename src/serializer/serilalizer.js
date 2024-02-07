import {DESERIALIZABLE_ERROR, SERIALIZER_ERROR} from "../constants/index.js";

const serializeData = (data) => {
    try {
        return JSON.stringify(data);
    } catch (error) {
        throw new Error(SERIALIZER_ERROR);
    }
}

const deserializeData = (data) => {
    try {
        return JSON.parse(data);
    } catch (error) {
        throw new Error(DESERIALIZABLE_ERROR);
    }
}

export {serializeData, deserializeData};

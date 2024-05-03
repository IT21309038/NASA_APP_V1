import {api} from "./apiBase";

const apiDefinitions = {

    //Get Picture of the Day
    getPictureOfTheDay: async function() {
        return await api.get('/planetary/apod', {
            params: {
                api_key: process.env.REACT_APP_API_KEY,
                // date: '2024-04-21'
            }
        });
    },

    getPictureByDate: async function(date) {
        return await api.get('/planetary/apod', {
            params: {
                api_key: process.env.REACT_APP_API_KEY,
                date: date
            }
        });
    },

    getMarsPictures: async function(sol, camera, rover) {
        return await api.get(`/mars-photos/api/v1/rovers/${rover}/photos`, {
            params: {
                api_key: process.env.REACT_APP_API_KEY,
                sol: sol,
                camera: camera
            }
        });
    },
};

export default apiDefinitions;
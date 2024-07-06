export {removemovie} from '../reducers/movieSlice'
import axios from '../../utils/axios';
import { loadmovie } from '../reducers/movieSlice';

export const asyncLoadMovie = (id) => async(dispatch, getState) => {
    try {
        const detail = await axios.get(`/movie/${id}`)   
        const externalId = await axios.get(`/movie/${id}/external_ids`)   
        const recommendations = await axios.get(`/movie/${id}/recommendations`)   
        const similar = await axios.get(`/movie/${id}/similar`)   
        const translations = await axios.get(`/movie/${id}/translations`)   
        const videos = await axios.get(`/movie/${id}/videos`)   
        const watchProviders = await axios.get(`/movie/${id}/watch/providers`)   

        let combinedData = {
            details: detail.data,
            externalId : externalId.data,
            recommendation : recommendations.data.results,
            similar : similar.data.results,
            translations : translations.data.translations.map(translate => translate.english_name),
            video : videos.data.results.find(m => m.type === "Trailer"),
            watchProvider : watchProviders.data.results.IT
        }

        dispatch(loadmovie(combinedData))
    } catch (error) {
     console.log(error);   
    }
}  
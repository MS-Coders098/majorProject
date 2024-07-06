export {removetv} from '../reducers/tvSlice'
import axios from '../../utils/axios';
import { loadtv } from '../reducers/tvSlice';

export const asyncLoadtv =   (id) => async(dispatch, getState) => {
    try {
        const detail = await axios.get(`/tv/${id}`)   
        const externalId = await axios.get(`/tv/${id}/external_ids`)   
        const recommendations = await axios.get(`/tv/${id}/recommendations`)   
        const similar = await axios.get(`/tv/${id}/similar`)   
        const translations = await axios.get(`/tv/${id}/translations`)   
        const videos = await axios.get(`/tv/${id}/videos`)   
        const watchProviders = await axios.get(`/tv/${id}/watch/providers`)   

        let combinedData = {
            details: detail.data,
            externalId : externalId.data,
            recommendation : recommendations.data.results,
            similar : similar.data.results,
            translations : translations.data.translations.map(translate => translate.english_name),
            video : videos.data.results.find(m => m.type === "Trailer"),
            watchProvider : watchProviders.data.results.IT
        }

        dispatch(loadtv(combinedData))
    } catch (error) {
     console.log(error);   
    }
}  
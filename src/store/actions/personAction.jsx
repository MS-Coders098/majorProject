export {removeperson} from '../reducers/personSlice'
import axios from '../../utils/axios';
import { loadperson } from '../reducers/personSlice';

export const asyncLoadperson =   (id) => async(dispatch, getState) => {
    try {
        const detail = await axios.get(`/person/${id}`)   
        const externalId = await axios.get(`/person/${id}/external_ids`)   
        const combinedCredits = await axios.get(`/person/${id}/combined_credits`)   
        const movieCredits = await axios.get(`/person/${id}/movie_credits`)   
        const tvCredits = await axios.get(`/person/${id}/tv_credits`)   

        let combinedData = {
            details: detail.data,
            externalId : externalId.data,
            combinedCredits: combinedCredits.data,
            movieCredits: movieCredits.data,
            tvCredits: tvCredits.data
        }

        dispatch(loadperson(combinedData))
    } catch (error) {
     console.log(error);   
    }
}  
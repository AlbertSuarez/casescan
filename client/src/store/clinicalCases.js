import { get, post} from '../utils/requests';

export const getAllCases = async function() {
  const res = await get('/clinical_cases')
  if(res.status === 200) {
      return res.data.response.results
  } else {
      return []
  }
}


export const getClinicalCaseById = async function(id) {
  try {
    const res = await get('/clinical_cases', { case_id: parseInt(id) })
    if(res.status === 200) {
      if(res.data.error){
        return res.data
      }
      return res.data.response.results
    }
  } catch (error) {
    return {
      error: true,
      message: 'Invalid input. The ID is between 1 and 2500'
    }
  }
}

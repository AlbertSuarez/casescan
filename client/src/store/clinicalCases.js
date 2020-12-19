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
  const res = await get('/clinical_cases', { case_id: parseInt(id) })
  if(res.status === 200) {
      return res.data.response.results
  } else {
      return []
  }
}
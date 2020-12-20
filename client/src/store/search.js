import { post } from "../utils/requests";

export const getSimilarityById = async function ({ case_id, sections}) {
  const res = await post("/search/clinical_case", {
    data: { section_names: sections },
    params: { case_id }
  });
  if (res.status === 200) {
    return res.data.response.results;
  } else {
    return [];
  }
};


export const getSimilarityByText = async function ({ section_names, aggregated_search = true }) {
  const res = await post("/search/text", {
    data: { section_names, aggregated_search }
  });
  if (res.status === 200) {
    return res.data.response.results;
  } else {
    return [];
  }
}
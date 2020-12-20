import h5py

from flask import request

from src import SECTION_AGGREGATED, DATA_EMBEDDINGS
from src.engine import searcher
from src.engine.initializator import cases_db, mapping
from src.helper import response_builder


def post_text(aggregated_search=None):
    response = dict(results=dict(
        medical_history=[dict(case_id=1, sections=dict(medical_history='Lorem ipsum'), percentage=92.5)]
    ))
    return response_builder.make(False, response=response)


def post_clinical_case(case_id):
    # Validate given case identifier
    if case_id in cases_db:
        section_names = request.get_json().get('section_names', [])
        if section_names:
            if not all(bool(cases_db.get(case_id, {}).get(k)) for k in section_names):
                return response_builder.make(
                    True, message=f'Clinical case with id [{case_id}] has no all sections selected.'
                )
        else:
            section_names.append(SECTION_AGGREGATED)

        # Retrieve case embeddings
        embeddings_dict = dict()
        with h5py.File(DATA_EMBEDDINGS, 'r') as f:
            for section_name in section_names:
                embeddings_dict[section_name] = f[section_name][mapping.get(section_name, {}).get(case_id)]

        # Search
        results = searcher.search(embeddings_dict, case_id=case_id)

        # Return
        return response_builder.make(False, response=dict(results=results))
    else:
        return response_builder.make(True, message=f'Clinical case with id [{case_id}] could not be found.')

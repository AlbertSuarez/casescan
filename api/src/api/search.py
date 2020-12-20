import h5py
import numpy as np

from flask import request

from src import SECTION_AGGREGATED, DATA_EMBEDDINGS, SECTION_LIST, MODEL_DIMENSIONS
from src.engine import searcher, transformer
from src.engine.initializator import cases_db, mapping
from src.helper import response_builder


def _valid_section_json(sections):
    return sections and \
           isinstance(sections, dict) and \
           all(isinstance(k, str) for k in sections.keys()) and \
           all(k in SECTION_LIST for k in sections.keys()) and \
           all(isinstance(v, str) for v in sections.values()) and \
           all(bool(v.strip()) for v in sections.values())


def post_text(aggregated_search=None):
    # Validate input
    sections = request.get_json()
    if not _valid_section_json(sections):
        return response_builder.make(True, message='JSON request body provided is invalid.')

    # Extract embeddings
    embeddings_dict = dict()
    aggregated_embeddings = np.array([])
    for section_name, section_content in sections.items():
        section_embeddings = transformer.encode(section_content)
        aggregated_embeddings = np.concatenate((aggregated_embeddings, section_embeddings))
        embeddings_dict[section_name] = section_embeddings

    # Complete aggregate dimensions if selected
    if aggregated_search:
        aggregated_embeddings = transformer.complete_aggregation(
            aggregated_embeddings=aggregated_embeddings, target_dims=MODEL_DIMENSIONS * len(SECTION_LIST)
        )
        embeddings_dict = {SECTION_AGGREGATED: aggregated_embeddings}

    # Search
    results = searcher.search(embeddings_dict)

    # Return
    return response_builder.make(False, response=dict(results=results))


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

import os
import pickle

from src import DATA_CLINICAL_CASES_DB, SECTION_LIST, SECTION_AGGREGATED, DATA_INDEXES_FOLDER, DATA_MAPPING
from src.engine.nmslib import Nmslib
from src.helper import log


def _init_db():
    log.info('Initializing clinical cases database.')
    with open(DATA_CLINICAL_CASES_DB, 'rb') as f:
        db_dict = pickle.load(f)
    for key in db_dict.keys():
        for section_name in SECTION_LIST:
            db_dict[key][section_name] = db_dict[key].get(section_name, None)
    log.info(f'DB initialized with {len(db_dict)} clinical cases.')
    return db_dict


def _init_indexes():
    log.info('Initializing indexes.')
    index_dict = dict()
    for index_name in SECTION_LIST + [SECTION_AGGREGATED]:
        index_object = Nmslib()
        index_object.load(os.path.join(DATA_INDEXES_FOLDER, f'{index_name}.nmslib'))
        index_dict[index_name] = index_object
    log.info(f'Indexes initialized with {len(index_dict)} objects.')
    return index_dict


def _init_mapping():
    log.info('Initializing mapping.')
    with open(DATA_MAPPING, 'rb') as f:
        mapping_dict = pickle.load(f)
    log.info('Mapping initialized.')
    return mapping_dict


cases_db = _init_db()
indexes = _init_indexes()
mapping = _init_mapping()

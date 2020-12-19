import pickle

from src import DATA_CLINICAL_CASES_DB, SECTION_LIST
from src.helper import log


def _init():
    log.info('Initializing clinical cases database.')
    with open(DATA_CLINICAL_CASES_DB, 'rb') as f:
        db_dict = pickle.load(f)
    for key in db_dict.keys():
        for section_name in SECTION_LIST:
            db_dict[key][section_name] = db_dict[key].get(section_name, None)
    log.info(f'DB initialized with {len(db_dict)} clinical cases.')
    return db_dict


cases_db = _init()

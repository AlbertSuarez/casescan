import argparse
import os
import nmslib_viz

from src import DATA_INDEXES_FOLDER, SECTION_LIST, SECTION_AGGREGATED
from src.engine.initializator import cases_db
from src.helper import log


def parse_args():
    index_name_choices = SECTION_LIST + [SECTION_AGGREGATED]
    parser = argparse.ArgumentParser()
    parser.add_argument('--index_name', type=str, choices=index_name_choices, default=SECTION_AGGREGATED)
    return parser.parse_args()


def _validate(index_name):
    index_path = os.path.join(DATA_INDEXES_FOLDER, f'{index_name}.nmslib')
    assert os.path.isfile(index_path)
    log.info('Parameters validated!')
    return index_path


def _plot(index_path):
    nmslib_viz.view(index_path, number_points=len(cases_db))


def main(index_name):
    index_path = _validate(index_name)
    _plot(index_path)


if __name__ == '__main__':
    args = parse_args()
    main(args.index_name)

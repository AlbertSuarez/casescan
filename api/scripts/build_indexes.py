import argparse
import os

from src import DATA_INDEXES_FOLDER, DATA_EMBEDDINGS, DATA_MAPPING
from src.helper import log


def parse_args():
    parser = argparse.ArgumentParser()
    parser.add_argument('--input_embeddings', type=str, default=DATA_EMBEDDINGS)
    parser.add_argument('--input_mapping', type=str, default=DATA_MAPPING)
    parser.add_argument('--output_indexes_folder', type=str, default=DATA_INDEXES_FOLDER)
    return parser.parse_args()


def _validate(input_embeddings, input_mapping, output_indexes_folder):
    os.makedirs(output_indexes_folder, exist_ok=True)
    assert os.path.isfile(input_embeddings)
    assert os.path.isfile(input_mapping)
    log.info('Parameters validated!')


def main(input_embeddings, input_mapping, output_indexes_folder):
    _validate(input_embeddings, input_mapping, output_indexes_folder)


if __name__ == '__main__':
    args = parse_args()
    main(args.input_embeddings, args.input_mapping, args.output_indexes_folder)

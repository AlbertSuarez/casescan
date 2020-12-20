import argparse
import os
import pickle
import h5py

from tqdm import tqdm

from src import DATA_INDEXES_FOLDER, DATA_EMBEDDINGS, DATA_MAPPING, SECTION_LIST, SECTION_AGGREGATED
from src.engine.nmslib import Nmslib
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


def _load_mapping(input_mapping):
    with open(input_mapping, 'rb') as f:
        mapping_dict = pickle.load(f)
    return mapping_dict


def _build(input_embeddings, mapping_dict, output_indexes_folder):
    index_list = SECTION_LIST + [SECTION_AGGREGATED]
    with h5py.File(input_embeddings, 'r') as f:
        for index_name in tqdm(index_list, total=len(index_list)):
            index_mapping = mapping_dict[index_name]
            ids = sorted(index_mapping, key=index_mapping.get)
            embeddings = f[index_name][:]
            assert len(ids) == embeddings.shape[0]
            index_path = os.path.join(output_indexes_folder, f'{index_name}.nmslib')
            index = Nmslib()
            index.fit(embeddings, ids)
            index.save(index_path)


def _log(output_indexes_folder):
    for index_path in os.listdir(output_indexes_folder):
        index_size = os.stat(os.path.join(output_indexes_folder, index_path)).st_size
        index_size = round(index_size / 1024 ** 2, 2)
        log.info(f'> Index for {index_path}: [{index_size} MB]')


def main(input_embeddings, input_mapping, output_indexes_folder):
    _validate(input_embeddings, input_mapping, output_indexes_folder)
    mapping_dict = _load_mapping(input_mapping)
    _build(input_embeddings, mapping_dict, output_indexes_folder)
    _log(output_indexes_folder)


if __name__ == '__main__':
    args = parse_args()
    main(args.input_embeddings, args.input_mapping, args.output_indexes_folder)

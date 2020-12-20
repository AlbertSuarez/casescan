import argparse
import pickle
import h5py
import numpy as np
import os

from tqdm import tqdm

from src import DATA_EMBEDDINGS, DATA_MAPPING, SECTION_LIST, SECTION_AGGREGATED, MODEL_DIMENSIONS
from src.engine import transformer
from src.engine.initializator import cases_db
from src.helper import log


def parse_args():
    parser = argparse.ArgumentParser()
    parser.add_argument('--output_embeddings_file', type=str, default=DATA_EMBEDDINGS)
    parser.add_argument('--output_mapping_file', type=str, default=DATA_MAPPING)
    return parser.parse_args()


def _validate(output_embeddings_file, output_mapping_file):
    assert os.path.isdir(os.path.dirname(output_embeddings_file))
    assert os.path.isdir(os.path.dirname(output_mapping_file))
    log.info('Parameters validated!')


def _encode(output_embeddings_file, output_mapping_file):
    cases_items = cases_db.items()
    mapping_dict = {k: dict() for k in SECTION_LIST + [SECTION_AGGREGATED]}  # Initialize dictionary mapping
    with h5py.File(output_embeddings_file, 'w') as f:
        # Create datasets
        for dataset_name in mapping_dict.keys():
            # Compute dataset shape
            if dataset_name == SECTION_AGGREGATED:
                dataset_shape = (len(cases_items), MODEL_DIMENSIONS * len(SECTION_LIST))
            else:
                dataset_shape = (len([x for _, x in cases_items if x.get(dataset_name)]), MODEL_DIMENSIONS)
            # Create dataset
            f.create_dataset(dataset_name, dataset_shape, dtype='f', maxshape=(None, None), chunks=True)

        # Iterate over cases
        for case_id, case_sections in tqdm(cases_items, total=len(cases_items)):
            aggregated_embeddings = np.array([])
            for section_name in SECTION_LIST:
                section_str = case_sections.get(section_name)
                # Encode embeddings if section is found
                if section_str:
                    section_embeddings = transformer.encode(section_str)
                    aggregated_embeddings = np.concatenate((aggregated_embeddings, section_embeddings))
                    section_embeddings_idx = len(mapping_dict[section_name])  # Compute current section index
                    f[section_name][section_embeddings_idx] = section_embeddings
                    mapping_dict[section_name][case_id] = section_embeddings_idx

            # Save aggregated results
            aggregated_embeddings = transformer.complete_aggregation(
                aggregated_embeddings=aggregated_embeddings, target_dims=f[SECTION_AGGREGATED].shape[1]
            )

            aggregated_embeddings_idx = len(mapping_dict[SECTION_AGGREGATED])  # Compute current aggregated index
            f[SECTION_AGGREGATED][aggregated_embeddings_idx] = aggregated_embeddings
            mapping_dict[SECTION_AGGREGATED][case_id] = aggregated_embeddings_idx

    with open(output_mapping_file, 'wb') as f:
        pickle.dump(mapping_dict, f)


def _log(output_embeddings_file):
    with h5py.File(output_embeddings_file, 'r') as f:
        for dataset_name, dataset_object in f.items():
            log.info(f'> Dataset {dataset_name}: [{dataset_object.shape}]')


def main(output_embeddings_file, output_mapping_file):
    _validate(output_embeddings_file, output_mapping_file)
    _encode(output_embeddings_file, output_mapping_file)
    _log(output_embeddings_file)


if __name__ == '__main__':
    args = parse_args()
    main(args.output_embeddings_file, args.output_mapping_file)

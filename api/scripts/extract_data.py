import argparse
import os
import pickle

from tqdm import tqdm

from src import DATA_CLINICAL_CASES_FOLDER, DATA_CLINICAL_CASES_DB
from src.helper import log


def parse_args():
    parser = argparse.ArgumentParser()
    parser.add_argument('--input_data_folder', type=str, default=DATA_CLINICAL_CASES_FOLDER)
    parser.add_argument('--output_pickle_file', type=str, default=DATA_CLINICAL_CASES_DB)
    return parser.parse_args()


def _validate(input_data_folder, output_pickle_file):
    assert os.path.isdir(input_data_folder)
    assert os.path.isdir(os.path.dirname(output_pickle_file))
    log.info('Parameters validated!')


def _extract(input_data_folder):
    db_dict = dict()
    txt_file_list = [i for i in os.listdir(input_data_folder) if os.path.splitext(i)[-1] == '.txt']
    for txt_file_name in tqdm(txt_file_list, total=len(txt_file_list)):
        txt_file_path = os.path.join(input_data_folder, txt_file_name)

    log.info(f'Clinical cases extracted: [{len(db_dict)}]')
    return db_dict


def _save(db_dict, output_pickle_file):
    with open(output_pickle_file, 'wb') as f:
        pickle.dump(db_dict, f)
    log.info(f'Saved into [{output_pickle_file}]')


def main(input_data_folder, output_pickle_file):
    _validate(input_data_folder, output_pickle_file)
    db_dict = _extract(input_data_folder)
    _save(db_dict, output_pickle_file)


if __name__ == '__main__':
    args = parse_args()
    main(args.input_data_folder, args.output_pickle_file)

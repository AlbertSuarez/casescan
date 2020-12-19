import argparse
import os
import pickle

from tqdm import tqdm

from src import DATA_CLINICAL_CASES_FOLDER, DATA_CLINICAL_CASES_DB, SECTION_MAPPING_FILE_TO_NAME, \
    SECTION_MAPPING_TO_SKIP, SECTION_LIST
from src.engine import text_decoder
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


def __extract_item(file_content):
    item_dict = dict()
    mapped_section = str()
    for file_line in file_content:
        line_clean = text_decoder.remove_accents(file_line).replace(':', '').strip().lower()  # Clean possible header
        if line_clean:
            # Header use case
            if line_clean in SECTION_MAPPING_FILE_TO_NAME.keys():
                mapped_section, to_be_appended = SECTION_MAPPING_FILE_TO_NAME[line_clean]
                if mapped_section not in item_dict:
                    item_dict[mapped_section] = list()
                if to_be_appended:
                    pre_character = '\n' if item_dict[mapped_section] else ''
                    item_to_be_appended = f'{pre_character}{file_line.strip()}'
                    if not item_to_be_appended.endswith(':'):
                        item_to_be_appended += ':'
                    item_dict[mapped_section].append(item_to_be_appended)
            else:
                # Content use case (given a previous header)
                if mapped_section and line_clean not in SECTION_MAPPING_TO_SKIP:
                    if mapped_section not in item_dict:
                        item_dict[mapped_section] = list()
                    item_dict[mapped_section].append(file_line.strip())
    # Join all results with end lines
    return {k: '\n'.join(v) for k, v in item_dict.items() if v}


def _extract(input_data_folder):
    db_dict = dict()
    file_list = sorted([i for i in os.listdir(input_data_folder) if os.path.splitext(i)[-1] == '.txt'])
    for file_name in tqdm(file_list, total=len(file_list)):
        file_id = int(os.path.splitext(file_name)[0].split('_')[-1])  # Extract case identifier from file name
        file_path = os.path.join(input_data_folder, file_name)
        with open(file_path, 'r') as f:
            file_content = f.read().split('\n')  # Get content split by lines
        item_dict = __extract_item(file_content)
        if item_dict:
            db_dict[file_id] = item_dict  # Only save it if it could be split by section

    log.info(f'Clinical cases extracted: [{len(db_dict)} - {round((len(db_dict) / len(file_list)) * 100.0, 2)}%]')
    for section_name in SECTION_LIST:
        s_dict = [d[section_name] for d in db_dict.values() if section_name in d and d[section_name]]
        log.info(f'> {section_name}: [{len(s_dict)} - {round((len(s_dict) / len(db_dict)) * 100.0, 2)}%]')

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

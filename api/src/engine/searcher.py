from src import NMSLIB_MATCHES
from src.engine.initializator import indexes, cases_db


def search(embeddings_dict, case_id=None):
    results = dict()
    for section_name, embeddings in embeddings_dict.items():
        results[section_name] = list()
        closest, distances = indexes[section_name].query(embeddings, len(cases_db))  # Query into the index
        assert len(closest) == len(distances)
        max_distance = float(max(distances))  # This will be used for computing the percentage
        for idx in range(len(closest)):
            if not case_id or closest[idx] != case_id:  # Do not return itself
                item_dict = dict(
                    case_id=closest[idx],
                    sections=cases_db.get(closest[idx]),
                    percentage=round((1 - float(distances[idx]) / max_distance) * 100.0, 2)
                )
                results[section_name].append(item_dict)
                if len(results[section_name]) >= NMSLIB_MATCHES:
                    break
    return results


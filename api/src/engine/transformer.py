import numpy as np

from sentence_transformers import SentenceTransformer

from src import MODEL_NAME


_model = SentenceTransformer(MODEL_NAME)


def encode(section_str):
    section_str = section_str.replace('\n', '')
    sentence_embeddings = _model.encode(section_str)
    return sentence_embeddings


def complete_aggregation(aggregated_embeddings, target_dims):
    m = aggregated_embeddings.shape[0]
    if m < target_dims:
        new_aggregated = np.empty((target_dims,))
        new_aggregated[:m] = aggregated_embeddings
        new_aggregated[m:] = aggregated_embeddings[np.random.choice(range(m), size=target_dims - m)]
        aggregated_embeddings = new_aggregated
    return aggregated_embeddings

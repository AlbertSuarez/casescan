from sentence_transformers import SentenceTransformer

from src import MODEL_NAME


_model = SentenceTransformer(MODEL_NAME)


def encode(section_str):
    section_str = section_str.replace('\n', '')
    sentence_embeddings = _model.encode(section_str)
    return sentence_embeddings

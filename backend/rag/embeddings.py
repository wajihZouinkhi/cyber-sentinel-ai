"""Embedding wrapper."""
from functools import lru_cache

@lru_cache(maxsize=1)
def get_embedder():
    from sentence_transformers import SentenceTransformer
    return SentenceTransformer("all-MiniLM-L6-v2")

def embed(texts):
    return get_embedder().encode(list(texts)).tolist()

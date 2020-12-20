import nmslib

from src import NMSLIB_METRIC, NMSLIB_METHOD, NMSLIB_EF_CONSTRUCTION, NMSLIB_EF_SEARCH


class Nmslib:

    def __init__(self, metric=NMSLIB_METRIC, method=NMSLIB_METHOD, data_type=nmslib.DataType.DENSE_VECTOR):
        self._metric = metric
        self._method = method
        self._data_type = data_type
        self._index = None

    def fit(self, embeddings, ids):
        self._index = nmslib.init(space=self._metric, method=self._method, data_type=self._data_type)
        self._index.addDataPointBatch(data=embeddings, ids=ids)
        self._index.createIndex(index_params=dict(efConstruction=NMSLIB_EF_CONSTRUCTION), print_progress=True)
        self._index.setQueryTimeParams(params=dict(efSearch=NMSLIB_EF_SEARCH))

    def query(self, v, n):
        return self._index.knnQuery(v, k=n)

    def save(self, fn: str):
        self._index.saveIndex(fn, save_data=True)

    def load(self, fn: str):
        self._index = nmslib.init(space=self._metric, method=self._method, data_type=self._data_type)
        self._index.loadIndex(fn)
        self._index.setQueryTimeParams(params=dict(efSearch=NMSLIB_EF_SEARCH))

    def __str__(self) -> str:
        return f'Nmslib(metric={self._metric}, method={self._method})'

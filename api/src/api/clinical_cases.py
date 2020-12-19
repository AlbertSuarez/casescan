from src.engine.db_initializator import cases_db
from src.helper import response_builder


def get(case_id=None):
    if case_id:
        if case_id in cases_db:
            return response_builder.make(
                False, response=dict(results=[dict(case_id=case_id, sections=cases_db.get(case_id))])
            )
        else:
            return response_builder.make(True, message=f'Clinical case with id [{case_id}] could not be found.')
    else:
        return response_builder.make(
            False, response=dict(results=[dict(case_id=k, sections=v) for k, v in cases_db.items()])
        )

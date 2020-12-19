from src.helper import response_builder


def get(case_id=None):
    response = dict(results=[dict(case_id=1, sections=dict(medical_history='Lorem ipsum'))])
    return response_builder.make(False, response=response)

from src.helper import response_builder


def post_text(aggregated_search=None):
    response = dict(results=dict(
        medical_history=[dict(case_id=1, sections=dict(medical_history='Lorem ipsum'), percentage=92.5)]
    ))
    return response_builder.make(False, response=response)

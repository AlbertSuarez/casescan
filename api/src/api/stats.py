from src.helper import response_builder


def get():
    response = dict(total_amunt=2000)
    return response_builder.make(False, response=response)

from flask import jsonify


def make(error, message=None, response=None):
    response_dict = dict(error=error)
    if error:
        assert message
        response_dict['message'] = message
    else:
        assert response
        response_dict['response'] = response
    return jsonify(response_dict), 200

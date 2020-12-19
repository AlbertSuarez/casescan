import connexion

from flask_cors import CORS

from src.engine import db_initializator


# API
connexion_app = connexion.FlaskApp(__name__, specification_dir='./openapi/')
flask_app = connexion_app.app
flask_app.config['JSON_AS_ASCII'] = False
connexion_app.add_api('openapi.yaml', arguments={'title': 'Casescan API'})
CORS(flask_app)

# Database
clinical_db = db_initializator.init()


@flask_app.route('/')
def index():
    return 'Welcome to Casescan API!', 200

# Import base image
FROM python:3.7
ENV HOME /srv/casescan

# Add needed files
ADD ./src ${HOME}/src
ADD ./data/db.pkl ${HOME}/data/db.pkl
ADD ./data/embeddings_full.h5 ${HOME}/data/embeddings_full.h5
ADD ./data/mapping.pkl ${HOME}/data/mapping.pkl
ADD ./data/indexes ${HOME}/data/indexes
ADD ./requirements.lock ${HOME}/requirements.lock
ADD ./uwsgi.ini ${HOME}/uwsgi.ini

# Install dependencies
RUN pip install --upgrade pip
RUN pip install -r ${HOME}/requirements.lock

# Set up port to listen
ENV PORT 80
EXPOSE 80

# Move to working directory and start
WORKDIR ${HOME}
CMD uwsgi --ini uwsgi.ini
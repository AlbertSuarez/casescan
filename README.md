# Casescan

[![HitCount](http://hits.dwyl.io/AlbertSuarez/casescan.svg)](http://hits.dwyl.io/AlbertSuarez/casescan)
![Deploy to Heroku](https://github.com/AlbertSuarez/casescan/workflows/Deploy%20to%20Heroku/badge.svg)
[![GitHub stars](https://img.shields.io/github/stars/AlbertSuarez/casescan.svg)](https://gitHub.com/AlbertSuarez/casescan/stargazers/)
[![GitHub forks](https://img.shields.io/github/forks/AlbertSuarez/casescan.svg)](https://gitHub.com/AlbertSuarez/casescan/network/)
[![GitHub contributors](https://img.shields.io/github/contributors/AlbertSuarez/casescan.svg)](https://gitHub.com/AlbertSuarez/casescan/graphs/contributors/)
[![GitHub license](https://img.shields.io/github/license/AlbertSuarez/casescan.svg)](https://github.com/AlbertSuarez/casescan/blob/master/LICENSE)

[API Documentation](https://casescan.herokuapp.com/ui/) | [API Endpoint](https://casescan.herokuapp.com/)

🔍 Clinical cases search by similarity specialized in Covid-19

## Summary

_Coming soon..._

## Images

_Coming soon..._

## Development

### Requirements

1. Python 3.7+
2. React 17.0+

### Recommendations

Usage of [virtualenv](https://realpython.com/blog/python/python-virtual-environments-a-primer/) is recommended for API / backend package library / runtime isolation.

### Set up

#### API

To run the commands, please execute the following from the `api` directory:

1. Setup virtual environment.

2. Install dependencies.

  ```bash
  pip3 install -r requirements.lock
  ```

#### Client

To run the commands, please execute the following from the `client` directory:

1. Install dependencies.

  ```bash
  npm install
  ```

### Usage

#### API

To run the commands, please execute the following from the `root` directory:

1. Run API container using docker-compose.

  ```bash
  docker-compose up -d --build
  ```


#### API

To run the commands, please execute the following from the `client` directory:

1. Serve React application.

  ```bash
  npm start
  ```

## Authors

- [Albert Suàrez](https://github.com/AlbertSuarez)
- [Elena Ruiz](https://github.com/elena20ruiz)

## License

MIT © Casescan

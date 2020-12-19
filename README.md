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

## Similarity analysis procedure

### Extract data

Firstly, looking at the initial dataset of 2.500 clinical cases, we saw that a big portion of them contained headers during the clinical explanation (Like Assessment, Evolution...). So, given the length of every document, we decided to split every clinical case in different sections, being able then to have shorter fragments of text with more concise information.

We did a first assessment of the different headers that could be found in the dataset, and we decided to group them all in these 6 different sections:

```csv
medical_history,physic_exploration,supplementary_tests,assessment,treatment,evolution
```

Then, using the `extract_data.py` script, we generated a `pickle` file called `db.pkl` where you can find enough structure data to start playing with it. So, given the initial 2.500 clinical cases, we ended up with the following ones:

**Clinical cases extracted**: [1306 - _52.24%_]
```
> medical_history: [1294 - 99.08%]
> physic_exploration: [1282 - 98.16%]
> supplementary_tests: [1285 - 98.39%]
> assessment: [1274 - 97.55%]
> treatment: [1255 - 96.09%]
> evolution: [1289 - 98.7%]
```

So, as it can be seen above, most of the extracted clinical cases have structured section data.

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

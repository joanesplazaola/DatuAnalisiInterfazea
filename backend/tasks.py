from __future__ import absolute_import, unicode_literals
import pandas as pd
from sklearn.model_selection import train_test_split
from ts_featurizer import TimeSeriesFeaturizer
from backend.models import Azterketa
import numpy as np

def azterketa_hasi(id, callback):
	# TODO Hemen requesteko erabiltzailearen arabera jasoko da azterketa eta erabiltzaile horrena den egiaztatuko da
	azterketa = Azterketa.objects.filter(id=id).first()
	proiektua = azterketa.proiektua
	fitxategiak = proiektua.fitxategiak
	data = pd.read_csv(fitxategiak.first().fitxategia)

	if azterketa.datu_mota.izena == 'Denbora segida':
		features, target = tseries_process(azterketa.tseries_config, proiektua)
	else:

		# TODO Hemen fitxategiak pozesatu beharko dira, soilik batean jarri, eta target eta featuretan banatu

		features = data.drop(axis=1, columns=proiektua.target)
		target = data.loc[:, proiektua.target]

	X_train, X_test, y_train, y_test = train_test_split(features, target, train_size=azterketa.train_test_ratio)

	modeloa = tpot_process(azterketa, callback)

	modeloa.fit(X_train, y_train)

	score = modeloa.score(X_test, y_test)
	return modeloa, score


def tseries_process(tseries_config, proiektua):
	ts = TimeSeriesFeaturizer()

	datu_lista, targetak = kendu_sentsoreak(proiektua.fitxategiak.all(), proiektua.target)
	model_kop = int(tseries_config.model_ratio * len(datu_lista))

	model_features = ts.featurize(datu_lista[:model_kop])
	features = ts.featurize(datu_lista[model_kop:], apply_model=True)
	all_features = pd.concat([model_features, features])

	all_features = all_features.replace([np.inf, -np.inf], np.nan)
	na_cols = features.columns[all_features.isna().any()]
	all_features.drop(axis=1, columns=na_cols, inplace=True)

	return all_features, targetak


def kendu_sentsoreak(fitxategiak, target):
	import pandas as pd
	file_list = list()
	targets = list()
	for f in fitxategiak:
		data = pd.read_csv(f.fitxategia)
		file_list.append(data.drop(columns=[target], axis=1))
		targets.append(data[target][0])

	return file_list, pd.Series(targets)


def tpot_process(azterketa, callback):
	# Hau agian bigarren async egin beharko litzateke
	from utils.tpot import TPOTClassifier, TPOTRegressor
	klase_aukera = {'Sailkapena': TPOTClassifier, 'Erregresioa': TPOTRegressor}

	TPOTKlasea = klase_aukera[azterketa.ataza_mota.izena]
	conf = azterketa.tpot_config

	estimator = TPOTKlasea(n_jobs=conf.n_jobs, generations=conf.generations, population_size=conf.population,
						   verbosity=3, cv=conf.cv, per_loop_callback=callback)

	return estimator

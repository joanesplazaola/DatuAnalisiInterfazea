# -*- coding: utf-8 -*-

"""This file is part of the TPOT library.

TPOT was primarily developed at the University of Pennsylvania by:
    - Randal S. Olson (rso@randalolson.com)
    - Weixuan Fu (weixuanf@upenn.edu)
    - Daniel Angell (dpa34@drexel.edu)
    - and many more generous open source contributors

TPOT is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as
published by the Free Software Foundation, either version 3 of
the License, or (at your option) any later version.

TPOT is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public
License along with TPOT. If not, see <http://www.gnu.org/licenses/>.

"""

from .base import TPOTBase
from .config.classifier import classifier_config_dict
from .config.regressor import regressor_config_dict
from .config.novelty_detector import novelty_detector_config_dict
from .builtins.constants import Mode


class TPOTClassifier(TPOTBase):
	"""TPOT estimator for classification problems."""

	scoring_function = 'accuracy'
	default_config_dict = classifier_config_dict
	mode = Mode.CLASSIFIER


class TPOTRegressor(TPOTBase):
	"""TPOT estimator for regression problems."""

	scoring_function = 'neg_mean_squared_error'
	default_config_dict = regressor_config_dict
	mode = Mode.REGRESSOR


class TPOTNoveltyDetector(TPOTBase):
	"""TPOT estimator for novelty detection"""

	scoring_function = 'roc_auc_score'
	mode = Mode.NOVELTY_DETECTOR
	default_config_dict = novelty_detector_config_dict
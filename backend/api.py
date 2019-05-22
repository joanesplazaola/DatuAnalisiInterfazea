import pandas as pd
from rest_pandas import PandasSimpleView
from sklearn.model_selection import train_test_split

from backend.models import Proiektua, Fitxategia, Azterketa, AtazaMota, DatuMota
from rest_framework import viewsets, permissions
from .serializers import ProiektuaSerializer, FitxategiaSerializer, AzterketaSerializer, AtazaMotaSerializer, \
	DatuMotaSerializer
from django.conf import settings


class ProiektuaViewSet(viewsets.ModelViewSet):
	"""
	Proiektuaren endpointa konfiguratzen du.
	"""
	permission_classes = [permissions.IsAuthenticated]
	serializer_class = ProiektuaSerializer

	def get_queryset(self):
		return self.request.user.proiektuak.all()

	def perform_create(self, serializer):
		serializer.save(jabea=self.request.user)


class FitxategiaViewSet(viewsets.ModelViewSet):
	"""
	Fitxategien endpointa konfiguratzen du.
	"""
	permission_classes = [permissions.IsAuthenticated]
	serializer_class = FitxategiaSerializer

	def get_queryset(self):
		return Fitxategia.objects.filter(proiektua__jabea=self.request.user)


class AzterketaViewSet(viewsets.ModelViewSet):
	"""
	Azterketen endpointa konfiguratzen du.
	"""
	permission_classes = [permissions.AllowAny]
	serializer_class = AzterketaSerializer

	def get_queryset(self):
		user = self.request.user
		return Azterketa.objects.filter(proiektua__jabea=user)


class DatuMotaViewSet(viewsets.ModelViewSet):
	permission_classes = [permissions.AllowAny]
	serializer_class = DatuMotaSerializer
	queryset = DatuMota.objects.all()


class AtazaMotaViewSet(viewsets.ModelViewSet):
	permission_classes = [permissions.AllowAny]
	serializer_class = AtazaMotaSerializer
	queryset = AtazaMota.objects.all()


class TimeSeriesView(PandasSimpleView):
	# TODO Hau erabiliko da batez be grafikotarako
	def get_data(self, request, *args, **kwargs):
		files = Fitxategia.objects.all()
		file_list = []
		# TODO Hemen falta da erabiltzailea eta proiektua kontuan izatea fitxategiak filtratzerako orduan
		for file in files:
			file_list.append(pd.read_csv(f'{settings.MEDIA_ROOT}/{file.fitxategia}'))

		return pd.concat(file_list)

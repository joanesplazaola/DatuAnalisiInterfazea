from django.contrib.auth.models import User
from django.db import models
import os


class Proiektua(models.Model):
	izena = models.CharField(max_length=30)
	target = models.CharField(max_length=100, blank=True, null=True)
	jabea = models.ForeignKey(User, related_name='proiektuak', on_delete=models.CASCADE, null=True)

	def __str__(self):
		return self.izena

	def delete(self, *args, **kwargs):
		for fitxategia in self.fitxategiak.all():
			fitxategia.delete()
		super(Proiektua, self).delete()


class Fitxategia(models.Model):
	# file will be saved to MEDIA_ROOT/uploads/
	CSV = 'CSV'
	MOTAK = ((CSV, 'CSV'),)

	mota = models.CharField(choices=MOTAK, default=CSV, max_length=15)
	proiektua = models.ForeignKey(Proiektua, on_delete=models.CASCADE, related_name='fitxategiak')
	fitxategia = models.FileField(upload_to='fitxategiak/', )
	izena = models.CharField(max_length=100, null=True, blank=True)
	tamaina = models.FloatField(null=True, blank=True)

	def save(self, force_insert=False, force_update=False, using=None, update_fields=None):
		self.izena = self.fitxategia.name
		self.tamaina = (self.fitxategia.size / (1024 ** 2))
		super(Fitxategia, self).save()

	def delete(self, *args, **kwargs):
		if os.path.isfile(self.fitxategia.path):
			os.remove(self.fitxategia.path)
		super(Fitxategia, self).delete(*args, **kwargs)

	def __str__(self):
		return f'{self.proiektua}-(e)ko {self.fitxategia}'


class Dataset(models.Model):
	fitxategia = models.ForeignKey(Fitxategia, related_name='datasets', on_delete=models.CASCADE)


class Field(models.Model):
	CAT = 'CAT'
	NUM = 'NUM'
	DATE = 'DATE'
	MOTAK = ((CAT, 'CAT'), (NUM, 'NUM'), (DATE, 'DATE'))
	izena = models.CharField(max_length=50)
	mota = models.CharField(max_length=20, choices=MOTAK)
	fitxategia = models.ForeignKey(Fitxategia, related_name='fields', on_delete=models.CASCADE, )


class DatuMota(models.Model):
	izena = models.CharField(max_length=50)

	def __str__(self):
		return self.izena


class AtazaMota(models.Model):
	izena = models.CharField(max_length=50)

	def __str__(self):
		return self.izena


class Pausua(models.Model):
	modulua = models.CharField(max_length=200)
	izena = models.CharField(max_length=100)
	azterketa = models.ForeignKey('Azterketa', related_name='pausuak', on_delete=models.CASCADE)


class Argumentua(models.Model):
	# STRING = 'STRING'
	# NONE = 'NONE'
	# FLOAT = 'FLOAT'
	# BOOL = 'BOOL'
	# INTEGER = 'INTEGER'
	# MOTA_AUKERAK = ((STRING, 'STRING'), (NONE, 'NONE'), (FLOAT, 'FLOAT'), (BOOL, 'BOOL'), (INTEGER, 'INTEGER'))
	# egoera = models.CharField(choices=MOTA_AUKERAK, max_length=15)
	gakoa = models.CharField(max_length=100)
	balioa = models.CharField(max_length=50, null=True)
	pausua = models.ForeignKey(Pausua, related_name='argumentuak', on_delete=models.CASCADE)


class TPOTConfig(models.Model):
	generations = models.IntegerField(default=100)
	population = models.IntegerField(default=100)
	cv = models.IntegerField(default=5)
	multi_output = models.BooleanField(default=False)
	n_jobs = models.IntegerField(default=-1)


class TseriesConfig(models.Model):
	model_ratio = models.FloatField(default=0.01)
	n_jobs = models.IntegerField(default=-1)
	chunk_size = models.FloatField(default=0.1)


class Azterketa(models.Model):
	ZAIN = 'ZAIN'
	HASI_GABE = 'HASI_GABE'
	EXEKUTATZEN = 'EXEKUTATZEN'
	AMAITUTA = 'AMAITUTA'
	EGOERA_AUKERAK = ((ZAIN, 'ZAIN'), (EXEKUTATZEN, 'EXEKUTATZEN'), (AMAITUTA, 'AMAITUTA'))
	izena = models.CharField(max_length=100)
	proiektua = models.ForeignKey(Proiektua, on_delete=models.CASCADE, related_name='azterketak')
	ataza_mota = models.ForeignKey(AtazaMota, on_delete=models.DO_NOTHING)
	datu_mota = models.ForeignKey(DatuMota, on_delete=models.DO_NOTHING)
	train_test_ratio = models.FloatField(default=0.7)
	tpot_config = models.OneToOneField(TPOTConfig, on_delete=models.CASCADE)
	tseries_config = models.OneToOneField(TseriesConfig, on_delete=models.CASCADE, blank=True, null=True)
	sortu_data = models.DateTimeField(auto_now_add=True)
	hasi_data = models.DateTimeField(null=True, blank=True)
	amaitu_data = models.DateTimeField(null=True, blank=True)
	egoera = models.CharField(choices=EGOERA_AUKERAK, default=HASI_GABE, max_length=15)
	portzentaia = models.IntegerField(default=0)
	emaitza = models.FloatField(default=0.0)


class Resource(models.Model):
	CSV = 'CSV'
	MOTAK = ((CSV, 'CSV'),)
	mota = models.CharField(choices=MOTAK, default=CSV, max_length=15)

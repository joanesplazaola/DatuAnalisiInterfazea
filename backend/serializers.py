from rest_framework import serializers
from .models import Proiektua, Fitxategia, Azterketa, TPOTConfig, AtazaMota, DatuMota, TseriesConfig, Pausua, Argumentua


class FitxategiaSerializer(serializers.ModelSerializer):
	class Meta:
		model = Fitxategia
		fields = '__all__'


class ProiektuaSerializer(serializers.ModelSerializer):
	fitxategiak = FitxategiaSerializer(many=True, allow_null=True, required=False, read_only=True)

	class Meta:
		model = Proiektua
		fields = ('id', 'izena', 'target', 'jabea', 'fitxategiak',)


class TPOTConfigSerializer(serializers.ModelSerializer):
	class Meta:
		model = TPOTConfig
		fields = '__all__'


class TseriesConfigSerializer(serializers.ModelSerializer):
	class Meta:
		model = TseriesConfig
		fields = '__all__'


class AtazaMotaSerializer(serializers.ModelSerializer):
	class Meta:
		model = AtazaMota
		fields = '__all__'


class DatuMotaSerializer(serializers.ModelSerializer):
	class Meta:
		model = DatuMota
		fields = '__all__'


class ArgumentuaSerializer(serializers.ModelSerializer):
	class Meta:
		model = Argumentua
		fields = ('gakoa', 'balioa')


class PausuaSerializer(serializers.ModelSerializer):
	argumentuak = ArgumentuaSerializer(many=True, read_only=True)

	class Meta:
		model = Pausua
		fields = ('id', 'modulua', 'izena', 'argumentuak')


class AzterketaSerializer(serializers.ModelSerializer):
	tpot_config = TPOTConfigSerializer()
	tseries_config = TseriesConfigSerializer(allow_null=True)
	pausuak = PausuaSerializer(many=True, read_only=True)

	class Meta:
		model = Azterketa
		fields = (
			'id', 'izena', 'train_test_ratio', 'proiektua', 'ataza_mota', 'datu_mota', 'tpot_config', 'tseries_config', 'egoera',
			'portzentaia', 'emaitza', 'pausuak'
		)

	def update(self, instance, validated_data):
		# TODO Idatzi hau
		pass

	def create(self, validated_data):
		tpot_config = validated_data.pop('tpot_config')
		tpot = TPOTConfig.objects.create(**tpot_config)
		tseries_config = validated_data.pop('tseries_config')
		tseries = None
		if validated_data['datu_mota'] == DatuMota.objects.filter(izena='Denbora segida').first():
			tseries = TseriesConfig.objects.create(**tseries_config)

		return Azterketa.objects.create(**validated_data, tpot_config=tpot, tseries_config=tseries)

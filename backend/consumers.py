import asyncio
from datetime import datetime
from time import sleep

import pytz
from asgiref.sync import async_to_sync
from channels.consumer import SyncConsumer
from channels.generic.websocket import WebsocketConsumer, AsyncWebsocketConsumer

# Erabili datu basetik eskaerak eitterakuan
from knox.models import AuthToken

from backend.serializers import PausuaSerializer
from .models import Azterketa, Pausua, Argumentua
from .tasks import azterketa_hasi
from channels.layers import get_channel_layer
import json


class AzterketaConsumer(WebsocketConsumer):
	"""
	Erabiltzailea azterketa pantailara iristean, websocket honetara konektatuko da, tokena bidaliz.
	Klase honen bidez kontrolatuko dira azterketak, atzealdean exekutatzen jarriz.
	"""
	channel_layer = get_channel_layer()

	def connect(self):
		"""
		Erabiltzailea websocketera konektatzen saiatzean funtzio hau exekutatuko da, bertatik tokena hartu eta
		erabiltzailea egokia den begiratuko da, konexioa onartu edo deusezteko.
		:return:
		"""
		self.token = self.scope['url_route']['kwargs']['token']
		# TODO Hau hobeto begiratu bihar da, hasierako 8 horrek zeatik dian
		users = AuthToken.objects.filter(token_key=self.token[:8])

		if len(users) > 0:
			user = users[0].user
			print(user.username)

			self.accept()

		else:
			self.close()

	def receive(self, text_data=None, bytes_data=None):
		"""
		Azterketa bat abiarazteko agindua ematean, funtzio hau exekutatzen da, bertan erabiltzaileak
		funtzio hori burutzeko duen egokitasuna begiratu ostean, background-tasks kanalera mezua bidaltzen du,
		exekutatu beharreko azterketaren datuekin, atzealdean exekutatzen utziz.
		:param text_data:
		:param bytes_data:
		:return:
		"""
		data = json.loads(text_data)
		token = data['token']
		azterketa = data['id']
		# TODO Hemen beittu bihar da ia pertsona horrek badaukan proiektu hori etab.

		async_to_sync(self.channel_layer.send)('background-tasks', {'type': 'azterketa_hasi', 'id': azterketa,
																	'channel_name': self.channel_name})

	# self.send(text_data="Aileau dok!", )

	def send_change(self, event):
		"""
		Background-tasks kanaletik jasotako ebentuak hartu, eta bertan adierazitako aurrerapena websocketera
		konektatutako bezeroei bidaltzen zaie.
		:param event:
		:return:
		"""
		self.send(text_data=json.dumps({**event}), )

	def disconnect(self, event):
		pass


class BackgroundTaskConsumer(SyncConsumer):

	def bidali_aldaketa(self, aldagaiak_ws, aldagaiak_db):
		Azterketa.objects.filter(pk=self.azterketa_id).update(**aldagaiak_db)

		async_to_sync(self.channel_layer.send)(self.bidali_channel, {
			"type": "send.change",
			"id": self.azterketa_id,
			**aldagaiak_ws
		})

	def get_progress(self, current, total):
		"""Atazan eginiko aurrerapena jaso eta berriz ere  AzterketaConsumerrera bidaltzen da, kasu honetan
		send_progress funtziora.
		"""
		data = {"portzentaia": int(100 * current / total)}
		self.bidali_aldaketa(data, data)

	def azterketa_hasi(self, message):
		"""
		AzterketaConsumerreko receive funtziotik kanalera bidalitako mezua jaso, eta prozesaketa hasten da,
		bertan, eginiko aurrerapenaren bidaliko du print_success funtziora, ataza bat amaitzen den bakoitzean.
		:param message:
		:return:
		"""

		tz = pytz.timezone('Europe/Madrid')
		self.bidali_channel = message['channel_name']
		self.azterketa_id = message['id']
		data = {"egoera": Azterketa.EXEKUTATZEN, }
		self.bidali_aldaketa(data, dict(data, **{'hasi_data': datetime.now(tz)}))
		model, emaitza = azterketa_hasi(message['id'], self.get_progress)
		steps = model.fitted_pipeline_.steps
		for step in steps:
			klasea = step[1].__class__
			args = step[1].get_params()
			pausua = Pausua(modulua=klasea.__module__, izena=klasea.__name__, azterketa_id=self.azterketa_id)
			pausua.save()
			Argumentua.objects.bulk_create(
				[Argumentua(gakoa=k, balioa=v, pausua_id=pausua.pk) for k, v in zip(args.keys(), args.values())]
			)

		azterketa = Azterketa.objects.get(id=self.azterketa_id)
		serializer = PausuaSerializer(azterketa.pausuak.all(), many=True)

		data = {"egoera": Azterketa.AMAITUTA, 'emaitza': emaitza, 'portzentaia': 100}
		self.bidali_aldaketa(
			dict(data, **{'pausuak': serializer.data}),
			dict(data, **{'amaitu_data': datetime.now(tz)})
		)

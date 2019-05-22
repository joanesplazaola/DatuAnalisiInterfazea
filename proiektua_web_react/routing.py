from django.conf.urls import url

from channels.routing import ProtocolTypeRouter, URLRouter, ChannelNameRouter
from channels.auth import AuthMiddlewareStack
from channels.security.websocket import AllowedHostsOriginValidator

from backend.consumers import AzterketaConsumer, BackgroundTaskConsumer

application = ProtocolTypeRouter({
	# Messages directed to a single channel will have a type `channel`
	'channel': ChannelNameRouter({
		# Messages directed to the `background-tasks` channel will be passed to our consumer
		'background-tasks': BackgroundTaskConsumer,
	}),
	'websocket': AllowedHostsOriginValidator(
		AuthMiddlewareStack(
			URLRouter(
				[
					url(r'^ws/azterketak/(?P<token>[^/]+)/$', AzterketaConsumer),
				]
			)
		)

	)
})

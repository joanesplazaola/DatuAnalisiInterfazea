from django.urls import include, path
from rest_framework import routers
from .api import ProiektuaViewSet, FitxategiaViewSet, AzterketaViewSet, AtazaMotaViewSet, DatuMotaViewSet, \
	TimeSeriesView
from rest_framework_swagger.views import get_swagger_view

schema_view = get_swagger_view(title='Modelo sortzaile API')


router = routers.DefaultRouter()
router.register('proiektuak', ProiektuaViewSet, 'proiektuak')
router.register('fitxategiak', FitxategiaViewSet, 'fitxategiak')
router.register('azterketak', AzterketaViewSet, 'azterketak')
router.register('atazamotak', AtazaMotaViewSet, 'atazamotak')
router.register('datumotak', DatuMotaViewSet, 'datumotak')

urlpatterns = [
	path('', include('accounts.urls')),
	path('data/', TimeSeriesView.as_view()),

	path('docs/', schema_view)
]
urlpatterns += router.urls

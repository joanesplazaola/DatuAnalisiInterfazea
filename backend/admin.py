from django.contrib import admin
from .models import Proiektua, Fitxategia, AtazaMota, DatuMota, Azterketa

# Register your models here.
admin.site.register(Proiektua)
admin.site.register(Fitxategia)
admin.site.register(AtazaMota)
admin.site.register(Azterketa)
# admin.site.register(AtazaMota)
admin.site.register(DatuMota)

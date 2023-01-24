from django.contrib import admin
from .models import City, Place, Opening_hours, Review

admin.site.register(City)
admin.site.register(Place)
admin.site.register(Opening_hours)
admin.site.register(Review)
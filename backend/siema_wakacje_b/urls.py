
from django.contrib import admin
from django.urls import path, include


# nic nie zmieniac
# ja wiem co tu jest
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('pages.urls'))
]

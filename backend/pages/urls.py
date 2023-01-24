# pages/urls.py
from django.urls import path, re_path
from . import views
from django.shortcuts import render


# dobrze chlopcy
# fajnie jakbyscie tu dawali same wyrazenia regularne
# bo to wyglada tak ze
# urls te glowne sa stworzone tam nic nie trzeba ruszac
# tutaj dajecie to co bedzie po /
# przyklad: siemawakacje.pl/city/...
# i tylko tu cos robicie
urlpatterns = [
    # re_path(r'^(?P<cityName>[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]*)/hotels/$', views.hotelsResponseView),
    # re_path(r'^city/($)|^city/(?P<cityName>[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]*)/$', views.cityQueryView),
    # re_path(r'^($)|(?P<cityName>[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]*)/$', views.cityPageView),
            


    re_path('cities/', views.city_view, name='city_list'),
    re_path('cities/<int:city_id>/', views.city_detail_view, name='city_detail'),
    re_path('places/', views.place_view, name='place_list'),
    re_path('places/<int:place_id>/', views.place_detail_view, name='place_detail'),
    re_path('places/<int:place_id>/opening_hours/', views.place_opening_hours_view, name='place_opening_hours'),
    re_path('places/<int:place_id>/reviews/', views.place_reviews_view, name='place_reviews'),
    re_path('search/', views.search_by_city_view, name='search_by_city'),
]

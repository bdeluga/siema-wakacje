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
    re_path(
        r'^city/($)|^city/(?P<cityName>[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ\s?-]*)/?$', views.cityQueryView),
    re_path(
        r'^city/($)|^city/(?P<cityName>[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ\s?-]*)/(?P<endpoint>[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ\s?-]*)/(?P<signs>[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ\s?-]*)', views.searchQueryView),
    re_path(
        r'^(?P<cityName>[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ\s?-]*)/plan/(?P<kind>[a-zA-Z?_]*)/?$', views.pickHighestRate),
    re_path(
        r'^plan/save', views.savePlace),
    re_path(
        r'^plan/confirm', views.confirmUsedPlaces),
    re_path(
        r'^plan/showall/?$', views.cityShowList),  
    re_path(
        r'^plan/showone/?$', views.cityShowOneList), 
    re_path(
        r'^(?P<cityName>[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ\s?-]*)/(?P<place>[a-zA-Z?_]*)/?$', views.placesResponseView),
    re_path(
        r'^($)|(?P<cityName>[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ\s?]*)/$', views.cityPageView),
    re_path(
         r'login', views.LoginUser),
       
    re_path(
         r'register', views.RegisterUser)
]

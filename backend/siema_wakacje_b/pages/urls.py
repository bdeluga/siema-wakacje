# pages/urls.py
from django.urls import path, re_path
from .views import homePageView
from .views import cityPageView
from django.shortcuts import render

# Create your views here.
# pages/views.py
from django.http import HttpResponse

urlpatterns = [
    path('', homePageView, name="home"),
    re_path(r'^', cityPageView ),
]
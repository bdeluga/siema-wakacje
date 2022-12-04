from django.shortcuts import render
from django.conf import settings
from django.http import HttpResponse
import csv
import os

def cityPageView(request):

    # empty endpoint
    if str(request.path[1:]) == '':
        return HttpResponse(status=200)
    
    
    # absolute path cuz data is in .csv outside the project

    worldCities = os.path.join(settings.DATA_DIR, 'worldcities.csv')

    # open stream
    # take every row from data file and split it to take only city column
    # [1:-1] cuz data is in "cityName" format so need to remove marks
    # take only city name and compare with endpoint
    # if finded status = 200 (OK)
    # else status = 404 (ERROR)

    with open(worldCities, encoding='utf8') as data:
        for row in data:
            if ((row.split(',')[0])[1:-1]).upper() == (str(request.path)[1:]).upper():
                return HttpResponse(status=200)
    return HttpResponse(status=404)



def cityQueryView(request):
    # nasza baza 40k miast
    worldCities = os.path.join(settings.DATA_DIR, 'worldcities.csv')
    # sciezka (upper liwiduje mniejsze wieksze znaki)
    path = str(request.path)[6:].upper()
    # lista na miasta
    cities = []
    
    # znajduje miasta ktore sa na jakas litere
    # jak to dziala to nie czas na tlumaczenie
    with open(worldCities, encoding='utf8') as data:
        for row in data:
            if (((row.split(',')[0])[1:-1]).upper()).startswith(path):
                cities.append((row.split(',')[0])[1:-1])
    return HttpResponse(f'{cities} ')
    

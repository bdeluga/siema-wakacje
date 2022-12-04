from django.shortcuts import render
from django.conf import settings
from django.http import HttpResponse, JsonResponse
import csv
import os
import json

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
    cities = {'metainf':[], 'data':[]}
    
    # znajduje miasta ktore sa na jakas litere
    # jak to dziala to nie czas na tlumaczenie
    if path == '':
        return HttpResponse(status=200)
    else:
        count = 0
        with open(worldCities, encoding='utf8') as data:
            for row in data:
                if (((row.split(',')[0])[1:-1]).upper()).startswith(path):
                    city = {}
                    city['name'] = (row.split(',')[0])[1:-1]
                    city['lat'] = (row.split(',')[2])[1:-1]
                    city['lng'] = (row.split(',')[3])[1:-1]
                    city['country'] =  (row.split(',')[4])[1:-1]
                    city['iso'] = (row.split(',')[6])[1:-1]
                    cities['data'].append(city)
                    count = count + 1
        inf = {}
        inf['count'] = count
        cities['metainf'].append(inf)   
        return JsonResponse(cities)
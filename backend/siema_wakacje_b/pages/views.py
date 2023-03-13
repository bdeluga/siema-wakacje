from django.shortcuts import render
from django.conf import settings
from django.http import HttpResponse, JsonResponse
import csv
import os
import json
import osmnx as ox
import requests

def placesResponseView(request, cityName, place):
    cityName = cityName.upper()
    worldCities = os.path.join(settings.DATA_DIR, 'worldcities.csv')
    lat = -1
    lng = -1
    with open(worldCities, encoding='utf8') as data:
            for row in data:
                if (((row.split(',')[0])[1:-1]).upper()).startswith(cityName):
                    lat = (row.split(',')[2])[1:-1]
                    lng = (row.split(',')[3])[1:-1]
    if place == 'hotels':
        result = []
        url = f'https://api.opentripmap.com/0.1/en/places/radius?radius=15000&lon={lng}&lat={lat}&kinds=accomodations&format=json&apikey={settings.TRIP_KEY}'
        data = (requests.get(url)).json()
        for ind in data:
            if ind['name'] == '':
                continue
            if 'xid' in ind:
                del ind['xid']
            if 'dist' in ind:
                del ind['dist']
            if 'osm' in ind:
                del ind['osm']
            if 'kinds' in ind:
                del ind['kinds']            
            result.append(ind)            
        return JsonResponse(result, safe=False)
    if place == 'architecture':
        result = []
        url = f'https://api.opentripmap.com/0.1/en/places/radius?radius=15000&lon={lng}&lat={lat}&kinds=architecture&format=json&apikey={settings.TRIP_KEY}'
        data = (requests.get(url)).json()
        for ind in data:
            place = {}
            if 'Street' in ind['name'] or ind['name'] == '':
                continue
            place['name'] = ind['name']
            place['rate'] = ind['rate']
            place['point'] = ind['point']
            url2 = f'https://api.opentripmap.com/0.1/en/places/xid/{ind["xid"]}?apikey={settings.TRIP_KEY}'
            data2 = (requests.get(url2)).json()
            if 'preview' in data2:
                if 'source' in data2['preview']:
                    place['img1'] = data2['preview']['source']
            if 'image' in data2:
                place['img2'] = data2['image']
            else:
                place['img'] = 'None'               
            result.append(place)
        return JsonResponse(result, safe=False)
    return HttpResponse('nieelo')

def cityPageView(request, cityName=''):

    # city name from path
    city = cityName.upper()
    # prevent to pass favicon.ico or empty string to nominatim request
    if city == '' or city == 'favicon.ico':
        return HttpResponse(status=200)
    # search for hotels only
    tags = {'amenity': 'hotel',
            'building': 'hotel',
            'tourism': 'hotel'}
    # geodataframe with response
    hotelResponse = ox.geometries_from_place(city, tags=tags)
    # dictionary for clean data to return
    hotels = {'hotels': []}
    # iterate over geodataframe and append names to respone dictionary
    for ind in hotelResponse.index:
        hotel = {}
        hotel['name'] = hotelResponse['name'][ind]
        hotels['hotels'].append(hotel)
    # response as json
    return JsonResponse(hotels)


def cityQueryView(request, cityName=''):
    cityName = cityName.upper()
    # nasza baza 40k miast
    worldCities = os.path.join(settings.DATA_DIR, 'worldcities.csv')
    # sciezka (upper liwiduje mniejsze wieksze znaki)
    # lista na miasta
    cities = {'metainf': [], 'data': []}
    # znajduje miasta ktore sa na jakas litere
    # jak to dziala to nie czas na tlumaczenie
    if cityName == '':
        return HttpResponse(status=200)
    else:
        count = 0
        with open(worldCities, encoding='utf8') as data:
            for row in data:
                if (((row.split(',')[0])[1:-1]).upper()).startswith(cityName):
                    city = {}
                    city['name'] = (row.split(',')[0])[1:-1]
                    city['lat'] = (row.split(',')[2])[1:-1]
                    city['lng'] = (row.split(',')[3])[1:-1]
                    city['country'] = (row.split(',')[4])[1:-1]
                    city['iso'] = (row.split(',')[6])[1:-1]
                    cities['data'].append(city)
                    count = count + 1
        inf = {}
        inf['count'] = count
        cities['metainf'].append(inf)
        if(inf['count'] == 0):
            return JsonResponse({'message': 'Szukane miasto nie istnieje.'}, status=404)

        return JsonResponse(cities)

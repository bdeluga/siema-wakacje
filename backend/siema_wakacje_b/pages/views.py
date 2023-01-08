from django.shortcuts import render
from django.conf import settings
from django.http import HttpResponse, JsonResponse
import csv
import os
import json
import osmnx as ox
import pandas
import sqlite3

# tymczasowe polaczenie
connection = sqlite3.connect('data.db')
cursor = connection.cursor()
create_table = '''CREATE TABLE DATA(
                city TEXT,
                city_ascii TEXT,
                lat INTEGER,
                lng INTEGER,
                country TEXT,
                iso2 TEXT,
                admin_name TEXT,
                capital TEXT,
                population INTEGER,
                id INTEGER);
                '''

cursor.execute(create_table)
file = open('worldcities.csv')
contents = csv.reader(file)
insert_records = "INSERT INTO DATA (city, country) VALUES(?, ?)"
cursor.executemany(insert_records, contents)

def cityPageView(request):

    # city name from path
    city = str(request.path)[1:]
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


def cityQueryView(request):
    # nasza baza 40k miast
    worldCities = os.path.join(settings.DATA_DIR, 'worldcities.csv')
    # sciezka (upper liwiduje mniejsze wieksze znaki)
    #
  #  path = str(contents)[6:].upper()

    path = str(request.path)[6:].upper()
    # lista na miasta
    cities = {'metainf': [], 'data': []}

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


connection.commit()
connection.close()
from django.shortcuts import render
from django.conf import settings
from django.http import HttpResponse
import csv
import os

def homePageView(request):
    return HttpResponse("hello world")

def cityPageView(request):   
    
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
            if (row.split(',')[0])[1:-1] == str(request.path)[1:]: 
                return HttpResponse(status=200) 
    return HttpResponse(status=404)
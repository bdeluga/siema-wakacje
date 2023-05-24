from django.shortcuts import render
from django.conf import settings
from django.http import HttpResponse, JsonResponse,HttpRequest
from django.views.decorators.csrf import csrf_exempt
import uuid
import os
import json, operator
import osmnx as ox
import requests
import sqlite3
import bcrypt





def positionOfCity(cityName):
    worldCities = os.path.join(settings.DATA_DIR, 'worldcities.csv')
    lat = -1
    lng = -1
    with open(worldCities, encoding='utf8') as data:
            for row in data:
                if (((row.split(',')[0])[1:-1]).upper()).startswith(cityName):
                    lat = (row.split(',')[2])[1:-1]
                    lng = (row.split(',')[3])[1:-1]
    return lat,lng

def dbInsertion(cityName):
    con = sqlite3.connect(os.path.join(settings.DB_DIR,'Project.db'))
    cur = con.cursor()
    lat,lng=positionOfCity(cityName)
    check=[]
    # creating list of names that already are in database
    for row in cur.execute("SELECT name FROM city"):
        check.append(row[0])
    # updating db if there is no city
    if cityName.upper() not in check:        
        cur.execute("INSERT INTO city VALUES(?,?,?)",
        (cityName.upper(),lng,lat))
        con.commit()        
        url_acomodation1 = f'https://api.opentripmap.com/0.1/en/places/radius?radius=20000&lon={lng}&lat={lat}&kinds=alcohol,casino,nightclubs,hookah,foods,accomodations,museums,bridges,historic_architecture,lighthouses,towers,archaeology,burial_places,fortifications,historical_places,monuments_and_memorials,religion&format=json&apikey={settings.TRIP_KEY}'
        data_acomodation1 = (requests.get(url_acomodation1)).json()
        k=1
        for data in data_acomodation1:
            if "wikidata" in data.keys():
                print("XD")
                cur.execute("INSERT INTO place VALUES(?,?,?,?,?,?,?,?)",
                (k,data['name'],data['rate'],data['kinds'],data['wikidata'],1,data['point']['lon'],data['point']['lat']))
                k+=1
            else:
                cur.execute("INSERT INTO place VALUES(?,?,?,?,?,?,?,?)",
                (k,data['name'],data['rate'],data['kinds'],'',1,data['point']['lon'],data['point']['lat']))
                k+=1
        con.commit()
        url_acomodation2 = f'https://api.opentripmap.com/0.1/en/places/radius?radius=15000&lon={lng}&lat={lat}&kinds=amusement_parks,ferris_wheels,miniature_parks,water_parks,baths_and_saunas,theatres_and_entertainments,urban_environment,gardens_and_parks,fountains,beaches,geological_formations,natural_springs,nature_reserves,water,view_points,sport,bicycle_rental&format=json&apikey={settings.TRIP_KEY}'
        data_acomodation2 = (requests.get(url_acomodation2)).json()
        for data in data_acomodation2:
            if "wikidata" in data.keys():
                cur.execute("INSERT INTO place VALUES(?,?,?,?,?,?,?,?)",
                (k,data['name'],data['rate'],data['kinds'],data['wikidata'],1,data['point']['lon'],data['point']['lat']))
                k+=1
            else:
                cur.execute("INSERT INTO place VALUES(?,?,?,?,?,?,?,?)",
                (k,data['name'],data['rate'],data['kinds'],'',1,data['point']['lon'],data['point']['lat']))
                k+=1
        con.commit()
def dbSelect(columnName):
    for row in cur.execute(f"SELECT * FROM '{columnName}'"):
        print(row)

@csrf_exempt 
def LoginUser(request):
    if request.method != "POST":
        return HttpResponse(status=404)
    if request.body==None:
        return HttpResponse(status=422)

    con = sqlite3.connect(os.path.join(settings.DB_DIR,'Project.db'))
    cur = con.cursor()

    
    email,password= json.loads(request.body.decode('UTF-8')).values()
    sql_select_query = f"select * from user where email ='{email}'" 

    user=cur.execute(sql_select_query)
    user = cur.fetchone()
 
    # for x in (user):
    #     r.append(user)
    # print(user)

    if user==None:
        return JsonResponse({'message': 'Zły e-mail lub hasło'}, status=404)
    print(user[0])
    r={
        'id':user[0],
        'login':user[1],
        'email':user[3],
        'image':user[4]
    }
    print(r)
    if not bcrypt.checkpw(password.encode(), user[2]):
        return JsonResponse({'message': 'Zły e-mail lub hasło'}, status=404)
    return JsonResponse(r,status=200,safe=False)


@csrf_exempt 
def RegisterUser(request):
    if request.method != "POST":
        return HttpResponse(status=404)
    if request.body==None:
        return HttpResponse(status=422)

    # con = sqlite3.connect('C:\\Users\\Laptop\\Documents\\GitHub\\siema-wakacje1\\backend\\siema_wakacje_b\\pages\\Project.db')
    con = sqlite3.connect(os.path.join(settings.DB_DIR,'Project.db'))

    cur = con.cursor()
    

    
    username,password,email,image= json.loads(request.body.decode('UTF-8')).values()
    
    sql_select_query = f"select * from user where email ='{email}'" 
    user=cur.execute(sql_select_query)
    user = cur.fetchone() 
    print(user)
    if not user==None:
        return HttpResponse(status=422)

    salt=bcrypt.gensalt(rounds=10)
    hashed=bcrypt.hashpw(password.encode(),salt)
    cur.execute("INSERT INTO user VALUES(?,?,?,?,?)",
            (str(uuid.uuid4()),username,hashed,email,image))
    con.commit()
    return HttpResponse(status=200)



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
       
        return JsonResponse(cleanJson(data), safe=False)
    if place == 'fun':
        result = []
        url = f'https://api.opentripmap.com/0.1/en/places/radius?radius=15000&lon={lng}&lat={lat}&kinds=amusement_parks,ferris_wheels,miniature_parks,water_parks,baths_and_saunas,theatres_and_entertainments,urban_environment&format=json&apikey={settings.TRIP_KEY}'
        data = (requests.get(url)).json()
           
        return JsonResponse(cleanJson(data), safe=False)
    if place == 'recreations':
        result = []
        url = f'https://api.opentripmap.com/0.1/en/places/radius?radius=15000&lon={lng}&lat={lat}&kinds=gardens_and_parks,fountains,beaches,geological_formations,natural_springs,nature_reserves,water,view_points,sport,bicycle_rental&format=json&apikey={settings.TRIP_KEY}'
        data = (requests.get(url)).json()
          
        return JsonResponse(cleanJson(data), safe=False)
    if place == 'night_life':
        result = []
        url = f'https://api.opentripmap.com/0.1/en/places/radius?radius=15000&lon={lng}&lat={lat}&kinds=alcohol,casino,nightclubs,hookah&format=json&apikey={settings.TRIP_KEY}'
        data = (requests.get(url)).json()
             
        return JsonResponse(cleanJson(data), safe=False)
    if place == 'restaurants':
        result = []
        url = f'https://api.opentripmap.com/0.1/en/places/radius?radius=15000&lon={lng}&lat={lat}&kinds=foods&format=json&apikey={settings.TRIP_KEY}'
        data = (requests.get(url)).json()
          
        return JsonResponse(cleanJson(data), safe=False)
    if place == 'history':
        result = []
        url = f'https://api.opentripmap.com/0.1/en/places/radius?radius=15000&lon={lng}&lat={lat}&kinds=museums,bridges,historic_architecture,lighthouses,towers,archaeology,burial_places,fortifications,historical_places,monuments_and_memorials,religion&format=json&apikey={settings.TRIP_KEY}'
        data = (requests.get(url)).json()
        
        return JsonResponse(cleanJson(data), safe=False)
    return JsonResponse({})

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

def cleanJson(data):
    result = []
    for ind in data:
            if ind['name'] == '':
                continue
            if ind['rate'] <= 1:
                continue
            if 'xid' in ind:
                del ind['xid']
            if 'dist' in ind:
                del ind['dist']
            if 'osm' in ind:
                del ind['osm']    
            ind['name'] = ind['name'].title()     
            result.append(ind) 
    return result  

def cleanJsonPlan(data):
    result = []
    for ind in data:
            if ind['name'] == '' or ind['name'].upper() in settings.USED_PLACES:
                continue
            if ind['rate'] <= 1:
                continue
            if 'xid' in ind:
                del ind['xid']
            if 'dist' in ind:
                del ind['dist']
            if 'osm' in ind:
                del ind['osm']    
            ind['name'] = ind['name'].title()     
            result.append(ind) 
    return result 

def pickHighestRate(request, cityName, kind):
    cityName = cityName.upper()
    worldCities = os.path.join(settings.DATA_DIR, 'worldcities.csv')
    lat = -1
    lng = -1
    with open(worldCities, encoding='utf8') as data:
            for row in data:
                if (((row.split(',')[0])[1:-1]).upper()).startswith(cityName):
                    lat = (row.split(',')[2])[1:-1]
                    lng = (row.split(',')[3])[1:-1]
    result = {}
    if kind == 'hotels':
        hotelsUrl = f'https://api.opentripmap.com/0.1/en/places/radius?radius=15000&lon={lng}&lat={lat}&kinds=accomodations&format=json&apikey={settings.TRIP_KEY}'
        hotelsData = cleanJsonPlan((requests.get(hotelsUrl)).json())
        hotelsData.sort(key=operator.itemgetter('rate'), reverse=True)
        result['hotels'] = hotelsData[0:5]
    if kind == 'fun':
        funUrl = f'https://api.opentripmap.com/0.1/en/places/radius?radius=15000&lon={lng}&lat={lat}&kinds=amusement_parks,ferris_wheels,miniature_parks,water_parks,baths_and_saunas,theatres_and_entertainments,urban_environment&format=json&apikey={settings.TRIP_KEY}'
        funData = cleanJsonPlan((requests.get(funUrl)).json())
        funData.sort(key=operator.itemgetter('rate'), reverse=True)
        result['fun'] = funData[0:5]     
    if kind == 'recreations':
        recreationsUrl = f'https://api.opentripmap.com/0.1/en/places/radius?radius=15000&lon={lng}&lat={lat}&kinds=gardens_and_parks,fountains,beaches,geological_formations,natural_springs,nature_reserves,water,view_points,sport,bicycle_rental&format=json&apikey={settings.TRIP_KEY}'
        recreationsData = cleanJsonPlan((requests.get(recreationsUrl)).json())
        recreationsData.sort(key=operator.itemgetter('rate'), reverse=True)   
        result['recreations'] = recreationsData[0:5]
    if kind == 'night_life':
        nightLifeUrl = f'https://api.opentripmap.com/0.1/en/places/radius?radius=15000&lon={lng}&lat={lat}&kinds=alcohol,casino,nightclubs,hookah&format=json&apikey={settings.TRIP_KEY}'
        nightLifeData = cleanJsonPlan((requests.get(nightLifeUrl)).json())
        nightLifeData.sort(key=operator.itemgetter('rate'), reverse=True)
        result['nightLife'] = nightLifeData[0:5]
    if kind == 'restaurants':
        restaurantsUrl = f'https://api.opentripmap.com/0.1/en/places/radius?radius=15000&lon={lng}&lat={lat}&kinds=foods&format=json&apikey={settings.TRIP_KEY}'
        restaurantsData = cleanJsonPlan((requests.get(restaurantsUrl)).json())
        restaurantsData.sort(key=operator.itemgetter('rate'), reverse=True)
        result['restaurants'] = restaurantsData[0:5]
    if kind == 'history':
        historyUrl = f'https://api.opentripmap.com/0.1/en/places/radius?radius=15000&lon={lng}&lat={lat}&kinds=museums,bridges,historic_architecture,lighthouses,towers,archaeology,burial_places,fortifications,historical_places,monuments_and_memorials,religion&format=json&apikey={settings.TRIP_KEY}'
        historyData = cleanJsonPlan((requests.get(historyUrl)).json())
        historyData.sort(key=operator.itemgetter('rate'), reverse=True)
        result['history'] = historyData[0:5]      
    return JsonResponse(result, safe=False)

@csrf_exempt 
def savePlace(request):
    
    if request.method != "POST":
        return HttpResponse(status=404)
    if request.body==None:
        return HttpResponse(status=422)

    con = sqlite3.connect(os.path.join(settings.DB_DIR,'Project.db'))
    cur = con.cursor()

    
    id,name,rate,kind,_,_,lon,lat= json.loads(request.body.decode('UTF-8')).values()
    print(id)
    sql_select_query = f"select * from user where id ='{id}'" 
    print(settings.USED_PLACES==[])
    print([id in sublist for sublist in settings.USED_PLACES])
    if not any([id in sublist for sublist in settings.USED_PLACES]) or settings.USED_PLACES ==[]:
        try:
            settings.USED_PLACES.append([id,name,rate,kind,lon,lat])
            print(settings.USED_PLACES)
            return HttpResponse('Ok')
        except:
            return HttpResponse('nieok')
    print(settings.USED_PLACES)
    # settings.USED_PLACES.clear()

    return HttpResponse('Rekordzik juz jest nie martw sie:)')
        
@csrf_exempt 
def confirmUsedPlaces(request):
    print(settings.USED_PLACES)
    con = sqlite3.connect(os.path.join(settings.DB_DIR,'Project.db'))
    cur = con.cursor()

    cur.execute("INSERT INTO list VALUES(?,?,?)",
    (str(uuid.uuid4()),1,str(settings.USED_PLACES)))
    con.commit()

    for row in cur.execute(f"SELECT * FROM list"):
        print(row)
    try:
        settings.USED_PLACES.clear()
        return HttpResponse('Ok')
    except:
        return HttpResponse('nieok')
    return "elowina eeeeelowina"

    
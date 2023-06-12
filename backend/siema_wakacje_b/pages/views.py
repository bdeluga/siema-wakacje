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
import unicodedata


# TODO
# Naprawic wyswietlanie znakow polskich (ecoding)
# headersy
# Zrefaktoryzowac troche kodzik
# i nie zapomniec o usunieciu komentarzy xd



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
    print("XDD")
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


@csrf_exempt 
def placesResponseView(request, cityName, place):
    con = sqlite3.connect(os.path.join(settings.DB_DIR,'Project.db'))
    cur = con.cursor()


    cityName = cityName.upper()
    sql_select_query = f"select * from city where name ='{cityName}'" 

    city=cur.execute(sql_select_query)
    city = cur.fetchone() 
    if city==None:
        print(city)
        return HttpResponse(status=422)

    if place == 'hotels':
        result = []
        sql_select_query = f"SELECT * FROM place INNER JOIN city on city.cityid=place.cityid WHERE city.name ='{cityName}' AND place.kinds='hotels'" 
        places=cur.execute(sql_select_query)
        row = cur.fetchall() 
        for places in row:
            r={
                'id':places[0],
                'name':places[1].decode('UTF8'),
                'rate':places[2],
                'kinds':places[3],
                'wikidata':places[4],
                "point":{ 'lon':places[6],
                'lat':places[7]},
                'img':places[8]
            }
            result.append(r)
        return JsonResponse(result, safe=False)
    if place == 'fun':
        result = []
        sql_select_query = f"SELECT * FROM place INNER JOIN city on city.cityid=place.cityid WHERE city.name ='{cityName}' AND place.kinds='fun'" 
        places=cur.execute(sql_select_query)
        row = cur.fetchall() 
        for places in row:
            r={
                'id':places[0],
                'name':places[1].decode('UTF8'),
                'rate':places[2],
                'kinds':places[3],
                'wikidata':places[4],
                "point":{ 'lon':places[6],
                'lat':places[7]},
                'img':places[8]
            }
            result.append(r)
        return JsonResponse(result, safe=False)

    if place == 'recreations':
        result = []
        sql_select_query = f"SELECT * FROM place INNER JOIN city on city.cityid=place.cityid WHERE city.name ='{cityName}' AND place.kinds='recreations'" 
        places=cur.execute(sql_select_query)
        row = cur.fetchall() 
        for places in row:
            r={
                'id':places[0],
                'name':places[1].decode('UTF8'),
                'rate':places[2],
                'kinds':places[3],
                'wikidata':places[4],
                "point":{ 'lon':places[6],
                'lat':places[7]},
                'img':places[8]
            }
            result.append(r)
        return JsonResponse(result, safe=False)

    if place == 'night_life':
        result = []
        sql_select_query = f"SELECT * FROM place INNER JOIN city on city.cityid=place.cityid WHERE city.name ='{cityName}' AND place.kinds='night_life'" 
        places=cur.execute(sql_select_query)
        row = cur.fetchall() 
        for places in row:
            r={
                'id':places[0],
                'name':places[1].decode('UTF8'),
                'rate':places[2],
                'kinds':places[3],
                'wikidata':places[4],
                "point":{ 'lon':places[6],
                'lat':places[7]},
                'img':places[8]
            }
            result.append(r)
        return JsonResponse(result, safe=False)
    if place == 'restaurants':
        result = []
        sql_select_query = f"SELECT * FROM place INNER JOIN city on city.cityid=place.cityid WHERE city.name ='{cityName}' AND place.kinds='restaurants'" 
        places=cur.execute(sql_select_query)
        row = cur.fetchall() 
        for places in row:
            r={
                'id':places[0],
                'name':places[1].decode('UTF8'),
                'rate':places[2],
                'kinds':places[3],
                'wikidata':places[4],
                "point":{ 'lon':places[6],
                'lat':places[7]},
                'img':places[8]
            }
            result.append(r)
        return JsonResponse(result, safe=False)
    if place == 'history':
        result = []
        sql_select_query = f"SELECT * FROM place INNER JOIN city on city.cityid=place.cityid WHERE city.name ='{cityName}' AND place.kinds='history'" 
        row=cur.execute(sql_select_query)
        row = cur.fetchall() 
        for places in row:
            r={
                'id':places[0],
                'name':places[1].decode('UTF8'),
                'rate':places[2],
                'kinds':places[3],
                'wikidata':places[4],
                "point":{ 'lon':places[6],
                'lat':places[7]},
                'img':places[8]
            }
            result.append(r)
        return JsonResponse(result, safe=False)
    return JsonResponse({})
@csrf_exempt 
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



@csrf_exempt 
def cityQueryView(request, cityName=''):
    con = sqlite3.connect(os.path.join(settings.DB_DIR,'Project.db'))
    cur = con.cursor()

    cityName = cityName.upper()
    print(cityName)
    # sql_select_query = f"select * from city where name Like ?", (starting_letters + '%',)) 
    cityall=cur.execute("select * from city where name Like ? || '%'", (cityName,))
    cityall = cur.fetchall()
    print(cityall) 
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
        for row in cityall:
            print(cityall[0])
            sd = json.dumps(row[1],ensure_ascii=False)
            s2 = json.loads(sd)
            s2.encode('utf-8')
            # print(row)
            city={}
            city['name']=s2
            city['lat']=str(row[4])
            city['lng']=str(row[3])
            city['country']="Poland"
            city['iso'] = row[2]
            cities['data'].append(city)
            count = count + 1
        inf = {}
        inf['count'] = count
        cities['metainf'].append(inf)
        print(cities)
        if(inf['count'] == 0):
            return JsonResponse({'message': 'Szukane miasto nie istnieje.'}, status=404)

        return JsonResponse(cities)

@csrf_exempt 
def cleanJson(data):
    result = []
    for ind in data:
            if ind['name'] == '':
                continue
            if ind['rate'] <= 1:
                continue
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

@csrf_exempt 
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
    con = sqlite3.connect(os.path.join(settings.DB_DIR,'Project.db'))
    cur = con.cursor()


    if kind == 'hotels':
        result = []
        sql_select_query = f"SELECT * FROM place INNER JOIN city on city.cityid=place.cityid WHERE city.name ='{cityName}' AND place.kinds='hotels'" 
        places=cur.execute(sql_select_query)
        places = cur.fetchone() 
        hotelsData={
            'id':places[0],
            'name':places[1],
            'rate':places[2],
            'kinds':places[3],
            'wikidata':places[4],
            'lon':places[6],
            'lat':places[7]
        }
        hotelsData.sort(key=operator.itemgetter('rate'), reverse=True)
        result['fun'] = hotelsData[0:5]
    if kind == 'fun':
        result = []
        sql_select_query = f"SELECT * FROM place INNER JOIN city on city.cityid=place.cityid WHERE city.name ='{cityName}' AND place.kinds='fun'" 
        places=cur.execute(sql_select_query)
        places = cur.fetchone() 
        funData={
            'id':places[0],
            'name':places[1],
            'rate':places[2],
            'kinds':places[3],
            'wikidata':places[4],
            'lon':places[6],
            'lat':places[7]
        }
        funData.sort(key=operator.itemgetter('rate'), reverse=True)
        result['fun'] = funData[0:5]

    if kind == 'recreations':
        result = []
        sql_select_query = f"SELECT * FROM place INNER JOIN city on city.cityid=place.cityid WHERE city.name ='{cityName}' AND place.kinds='recreations'" 
        places=cur.execute(sql_select_query)
        places = cur.fetchone() 
        recreationsData={
            'id':places[0],
            'name':places[1],
            'rate':places[2],
            'kinds':places[3],
            'wikidata':places[4],
            'lon':places[6],
            'lat':places[7]
        }
        recreationsData.sort(key=operator.itemgetter('rate'), reverse=True)
        result['recreations'] = recreationsData[0:5]

    if kind == 'night_life':
        result = []
        sql_select_query = f"SELECT * FROM place INNER JOIN city on city.cityid=place.cityid WHERE city.name ='{cityName}' AND place.kinds='night_life'" 
        places=cur.execute(sql_select_query)
        places = cur.fetchone() 
        night_lifeData={
            'id':places[0],
            'name':places[1],
            'rate':places[2],
            'kinds':places[3],
            'wikidata':places[4],
            'lon':places[6],
            'lat':places[7]
        }
        night_lifeData.sort(key=operator.itemgetter('rate'), reverse=True)
        result['night_life'] = night_lifeData[0:5]
    if kind == 'restaurants':
        result = []
        sql_select_query = f"SELECT * FROM place INNER JOIN city on city.cityid=place.cityid WHERE city.name ='{cityName}' AND place.kinds='restaurants'" 
        places=cur.execute(sql_select_query)
        places = cur.fetchone() 
        restaurantsData={
            'id':places[0],
            'name':places[1],
            'rate':places[2],
            'kinds':places[3],
            'wikidata':places[4],
            'lon':places[6],
            'lat':places[7]
        }
        restaurantsData.sort(key=operator.itemgetter('rate'), reverse=True)
        result['restaurants'] = restaurantsData[0:5]
    if kind == 'history':
        result = []
        sql_select_query = f"SELECT * FROM place INNER JOIN city on city.cityid=place.cityid WHERE city.name ='{cityName}' AND place.kinds='history'" 
        places=cur.execute(sql_select_query)
        places = cur.fetchone() 
        historyData={
            'id':places[0],
            'name':places[1],
            'rate':places[2],
            'kinds':places[3],
            'wikidata':places[4],
            'lon':places[6],
            'lat':places[7]
        }
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

    return HttpResponse('Rekordzik juz jest nie martw sie:)')
        
@csrf_exempt 
def confirmUsedPlaces(request):
    print(settings.USED_PLACES)
    con = sqlite3.connect(os.path.join(settings.DB_DIR,'Project.db'))
    cur = con.cursor()
    
    # id z headersow
    userid,name,array= json.loads(request.body).values()
    # print(list(id.values())[0])
    cur.execute("INSERT INTO list VALUES(?,?,?,?)",
    (str(uuid.uuid4()),userid,name,str(array)))
    con.commit()

    for row in cur.execute(f"SELECT * FROM list"):
        print(row)
    try:
        settings.USED_PLACES.clear()
        return HttpResponse('Ok')
    except:
        return HttpResponse('nieok')
    return "elowina eeeeelowina"

@csrf_exempt 
def cityShowList(request):
    if request.method != "GET":
        return HttpResponse(status=404)


    con = sqlite3.connect(os.path.join(settings.DB_DIR,'Project.db'))
    cur = con.cursor()
    # id= json.loads(request.body)
    response=request.GET.get('id',"")
    print(response)
    # print(list(id.values())[0])
    # name
    sql_select_query = f"select id, name, data from list where userid ='{response}'" 
    print(id)
    sql_select_query=cur.execute(sql_select_query)
    sql_select_query = cur.fetchall() 
    # Dobra tu zoribc tablice z querry sqlite zamiast r=
    # text = sql_select_query.split(',')
    # print(text)
    print(sql_select_query)
    result=[]
    if not sql_select_query:
        return HttpResponse(status=422)
    for i in sql_select_query:
        # text = i.split(',')
        # i=eval(i[0])
        # nazwa dodac XDDDD
        r={
            'id': i[0],
            'name': i[1],
                }
        result.append(r)
        # print(i)
    # print(r)
    return JsonResponse(result, safe=False)
@csrf_exempt 
def cityShowOneList(request):


    if request.method != "GET":
        return HttpResponse(status=404)


    con = sqlite3.connect(os.path.join(settings.DB_DIR,'Project.db'))
    cur = con.cursor()

    
    # id= json.loads(request.body)
    responseId=request.GET.get('id',"")
    print(responseId)

    # name
    sql_select_query = f"select id, name, data from list where id ='{responseId}'" 
    sql_select_query=cur.execute(sql_select_query)
    sql_select_query = cur.fetchone()
    # print(sql_select_query) 
    if sql_select_query==None:
        return HttpResponse(status=422)
    # Dobra tu zoribc tablice z querry sqlite zamiast r=
    # text = sql_select_query.split(',')
    # print(text)
    print(sql_select_query[2])
    
    r={
            'id': sql_select_query[0],
            'name': sql_select_query[1],
            'list':eval(sql_select_query[2])["places"]
    }
        # print(i)
    # print(r)
    return JsonResponse(r, safe=False)

@csrf_exempt 
def searchQueryView(request, cityName='',endpoint=''):
    con = sqlite3.connect(os.path.join(settings.DB_DIR,'Project.db'))
    cur = con.cursor()

    cityName = cityName.upper()
    cities = {'metainf': [], 'data': []}
    search=request.GET.get('search',"")

    if cityName == '':
        return HttpResponse(status=200)
    else:
        count = 0
        places=cur.execute("SELECT * FROM place INNER JOIN city on city.cityid=place.cityid WHERE city.name=? AND place.kinds=? AND place.name Like ? || '%'",(cityName,endpoint,search) )
        row = cur.fetchall() 
        for places in row:

            city={}
            city['id']=places[0]
            city['name']=places[1].decode('UTF8')
            city['rate']=places[2]
            city['kinds']=places[3]
            city['wikidata'] = places[4]
            city['point']={
                'lon':places[6],
                'lat':places[7]
                           }
            city['img']:places[8]

            cities['data'].append(city)

            count+=1

        inf = {}
        inf['count'] = count
        cities['metainf'].append(inf)
        if(inf['count'] == 0):
            return JsonResponse({'message': 'Szukane miejsce nie istnieje.'}, status=404)
        return JsonResponse(cities)
    
@csrf_exempt 
def changePlan(request):
    if request.method != "PUT":
        return HttpResponse(status=404)
    if request.body==None:
        return HttpResponse(status=422)

    con = sqlite3.connect(os.path.join(settings.DB_DIR,'Project.db'))
    cur = con.cursor()

    
    id,name= json.loads(request.body.decode('UTF-8')).values()
    print(id,name)
    # sql_select_query = ("UPDATE list SET name = ? WHERE id=?",(id,name))

    cur.execute("UPDATE list SET name = ? WHERE id=?",(name,id))
    con.commit()
    sql_select_query = f"select id, name, data from list where id ='{id}'" 
    sql_select_query=cur.execute(sql_select_query)
    sql_select_query = cur.fetchone()

    return HttpResponse(status=200)

    
@csrf_exempt 
def removePlan(request):
    if request.method != "DELETE":
        return HttpResponse(status=404)
    if request.body==None:
        return HttpResponse(status=422)

    con = sqlite3.connect(os.path.join(settings.DB_DIR,'Project.db'))
    cur = con.cursor()
 
    
    responseId=request.GET.get('id',"")
    user=cur.execute("DELETE from list WHERE id=?",(responseId,))
    con.commit()

    return HttpResponse(status=200)

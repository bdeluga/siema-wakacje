
import uuid
import os
import json, operator
import requests
import sqlite3





def positionOfCity(cityName):
    worldCities = 'worldcities.csv'
    lat = -1
    lng = -1
    with open(worldCities, encoding='utf8') as data:
            for row in data:
                if (((row.split(',')[0])[1:-1]).upper()).startswith(cityName):
                    lat = (row.split(',')[2])[1:-1]
                    lng = (row.split(',')[3])[1:-1]
                    namecity = (row.split(',')[0])[1:-1]
                    id = (row.split(',')[10])[1:-1]
                    ISO = (row.split(',')[5])[1:-1]

                    # print("XD")
    return lat,lng,namecity,id,ISO

def dbInsertion(cityName):
    con = sqlite3.connect('Project.db')
    cur = con.cursor()
    lat,lng,namecity,id,ISO=positionOfCity(cityName)
    check=[]
    print(lat,lng)
    appi='5ae2e3f221c38a28845f05b62b26f90170e4a1d9a4af1650d19e061d'
    # creating list of names that already are in database
    for row in cur.execute("SELECT name FROM city"):
        check.append(row[0])
    # updating db if there is no city
    if cityName.upper() not in check:        
        cur.execute("INSERT INTO city VALUES(?,?,?,?,?)",
        (id,cityName.upper(),ISO,lng,lat))
        con.commit()        
        url_acomodation1 = f'https://api.opentripmap.com/0.1/en/places/radius?radius=15000&lon={lng}&lat={lat}&kinds=accomodations&format=json&apikey={appi}'
        data_acomodation1 = (requests.get(url_acomodation1)).json()
        for data in data_acomodation1:
            # print(data)
            if "wikidata" in data.keys():
                print("XD")
                cur.execute("INSERT INTO place VALUES(?,?,?,?,?,?,?,?)",
                (str(uuid.uuid4()),data['name'],data['rate'],'hotels',data['wikidata'],id,data['point']['lon'],data['point']['lat']))
            else:
                cur.execute("INSERT INTO place VALUES(?,?,?,?,?,?,?,?)",
                (str(uuid.uuid4()),data['name'],data['rate'],'hotels','',id,data['point']['lon'],data['point']['lat']))
        con.commit()
        url_acomodation2 = f'https://api.opentripmap.com/0.1/en/places/radius?radius=15000&lon={lng}&lat={lat}&kinds=amusement_parks,ferris_wheels,miniature_parks,water_parks,baths_and_saunas,theatres_and_entertainments,urban_environment&format=json&apikey={appi}'
        data_acomodation2 = (requests.get(url_acomodation2)).json()
        for data in data_acomodation2:
            if "wikidata" in data.keys():
                cur.execute("INSERT INTO place VALUES(?,?,?,?,?,?,?,?)",
                (str(uuid.uuid4()),data['name'],data['rate'],'fun',data['wikidata'],id,data['point']['lon'],data['point']['lat']))
            else:
                cur.execute("INSERT INTO place VALUES(?,?,?,?,?,?,?,?)",
                (str(uuid.uuid4()),data['name'],data['rate'],'fun','',id,data['point']['lon'],data['point']['lat']))
        con.commit()
        url_acomodation3 = f'https://api.opentripmap.com/0.1/en/places/radius?radius=15000&lon={lng}&lat={lat}&kinds=gardens_and_parks,fountains,beaches,geological_formations,natural_springs,nature_reserves,water,view_points,sport,bicycle_rental&format=json&apikey={appi}'
        data_acomodation3 = (requests.get(url_acomodation3)).json()
        for data in data_acomodation3:
            if "wikidata" in data.keys():
                cur.execute("INSERT INTO place VALUES(?,?,?,?,?,?,?,?)",
                (str(uuid.uuid4()),data['name'],data['rate'],'recreations',data['wikidata'],id,data['point']['lon'],data['point']['lat']))
            else:
                cur.execute("INSERT INTO place VALUES(?,?,?,?,?,?,?,?)",
                (str(uuid.uuid4()),data['name'],data['rate'],'recreations','',id,data['point']['lon'],data['point']['lat']))
        con.commit()
        url_acomodation4 = f'https://api.opentripmap.com/0.1/en/places/radius?radius=15000&lon={lng}&lat={lat}&kinds=alcohol,casino,nightclubs,hookah&format=json&apikey={appi}'
        data_acomodation4 = (requests.get(url_acomodation4)).json()
        for data in data_acomodation4:
            if "wikidata" in data.keys():
                cur.execute("INSERT INTO place VALUES(?,?,?,?,?,?,?,?)",
                (str(uuid.uuid4()),data['name'],data['rate'],'night_life',data['wikidata'],id,data['point']['lon'],data['point']['lat']))
            else:
                cur.execute("INSERT INTO place VALUES(?,?,?,?,?,?,?,?)",
                (str(uuid.uuid4()),data['name'],data['rate'],'night_life','',id,data['point']['lon'],data['point']['lat']))
        con.commit()
        url_acomodation5 = f'https://api.opentripmap.com/0.1/en/places/radius?radius=15000&lon={lng}&lat={lat}&kinds=foods&format=json&apikey={appi}'
        data_acomodation5 = (requests.get(url_acomodation5)).json()
        for data in data_acomodation5:
            if "wikidata" in data.keys():
                cur.execute("INSERT INTO place VALUES(?,?,?,?,?,?,?,?)",
                (str(uuid.uuid4()),data['name'],data['rate'],'restaurants',data['wikidata'],id,data['point']['lon'],data['point']['lat']))
            else:
                cur.execute("INSERT INTO place VALUES(?,?,?,?,?,?,?,?)",
                (str(uuid.uuid4()),data['name'],data['rate'],'restaurants','',id,data['point']['lon'],data['point']['lat']))
        con.commit()
        url_acomodation6 = f'https://api.opentripmap.com/0.1/en/places/radius?radius=15000&lon={lng}&lat={lat}&kinds=museums,bridges,historic_architecture,lighthouses,towers,archaeology,burial_places,fortifications,historical_places,monuments_and_memorials,religion&format=json&apikey={appi}'
        data_acomodation6 = (requests.get(url_acomodation6)).json()
        for data in data_acomodation6:
            if "wikidata" in data.keys():
                cur.execute("INSERT INTO place VALUES(?,?,?,?,?,?,?,?)",
                (str(uuid.uuid4()),data['name'],data['rate'],'history',data['wikidata'],id,data['point']['lon'],data['point']['lat']))
            else:
                cur.execute("INSERT INTO place VALUES(?,?,?,?,?,?,?,?)",
                (str(uuid.uuid4()),data['name'],data['rate'],'history','',id,data['point']['lon'],data['point']['lat']))
        con.commit()
def dbSelect():
    con = sqlite3.connect('Project.db')
    cur = con.cursor()
    for row in cur.execute(f"SELECT * FROM place"):
        print(row)


dbInsertion('WARSAW')
dbSelect()
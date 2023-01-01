import sqlite3
conn = sqlite3.connect('c:/Python/BED/example.sqlite')
c = conn.cursor()

c.execute('''CREATE TABLE transakcje
             (data TEXT, przedmiot_id INTEGER, cena REAL)''')
# dane miasta, trasy ...
c.execute("""INSERT INTO transakcje VALUES 
        ('2020-05-06', 36, 17.50)""")
c.execute("""INSERT INTO transakcje VALUES 
        ('2020-05-19', 18, 39.99)""")

conn.commit()
# Zamknięcie połączenia z bazą danych
conn.close()
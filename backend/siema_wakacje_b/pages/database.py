import sqlite3
from os import getenv

class Database:
        def __init__(self, database_name):
                self.connection = sqlite3.connect(database_name)
                self.cursor = self.connection.cursor()

        def __del__(self):
                self.connection.close()

        def create_table(self, sql: str):
                self.cursor.execute(sql)
                self.connection.commit()

        def insert(self, table, *values):
                self.cursor.execute(f"INSERT INTO {table} VALUES({','.join(['?' for _ in values])})", values)        
                self.connection.commit()

db = Database(getenv('DB_NAME'))
db.create_table('''CREATE TABLE data 
    (id INTEGER PRIMARY KEY AUTOINCREMENT, city TEXT, restourant TEXT, park TEXT, trasa TEXT,klub TEXT)''')


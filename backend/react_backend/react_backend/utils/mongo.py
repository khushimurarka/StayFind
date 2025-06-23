from pymongo import MongoClient
from django.conf import settings

def get_mongo_collection(collection_name):
    client = MongoClient(settings.MONGO_URI)
    db = client[settings.MONGO_DB_NAME]
    return db[collection_name]

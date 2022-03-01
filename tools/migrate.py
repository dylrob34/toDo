from pymongo import MongoClient
from pprint import pprint

client = MongoClient()

db = client.toDo

docs = db.users.find()

def ownerTask():
    for doc in docs:
        user = doc.get("user")
        if user == None:
            owner =  doc.get("team")
        else: owner = user
        pprint(doc)
        db.tasks.update_one({"_id": doc.get("_id")}, {"$set": {"buckets": []}})
    print("Done")

def deleteUserTeam():
    for doc in docs:
        db.buckets.update_one({"_id": doc.get("_id")}, {"$unset": {"user": None}})
    print("Done")

def deleteDoc():
    for doc in docs:
        if doc.get("title") == "":
            db.timeblocking.delete_one({"_id": doc.get("_id")})

def backupTable():
    for doc in docs:
        db.backupTimeblocking.insert_one(doc)

def migrateUser():
    for user in docs:
        db.users.update_one({"_id": user.get("_id")},
        {
            "$set": {
                "gender" : "Male",
                "day": 0,
                "month": 0,
                "year": 0,
                "showCompleted": False,
                "timeSetting": False
            }
        })

if __name__=="__main__":
    migrateUser()

import datetime
import json
import sqlite3
import random

from pydantic import BaseModel


class Ad(BaseModel):
    ad_id: int
    wallet_id: str
    cid: str
    keywords: str
    ppc: int
    timestamp: datetime.datetime

class AdRating(BaseModel):
    id: int
    sender: str
    ad_id: int
    rating: int
    timestamp: datetime.datetime

# Function to create the SQLite database and table (called once)
def create_table():
    conn = sqlite3.connect("data.db")
    cursor = conn.cursor()

    # Create a table to store the ratings
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS ad_ratings (
            id INTEGER PRIMARY KEY,
            sender TEXT,
            ad_id INTEGER,
            rating INTEGER,
            timestamp DATETIME
        )
    """)
    conn.commit()

    # Create a table to store the ads and ppc
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS ads (
            ad_id INTEGER PRIMARY KEY,
            wallet_id TEXT,
            cid TEXT,
            keywords TEXT,
            ppc INTEGER,
            timestamp DATETIME
        )
    """)
    conn.commit()
    conn.close()


# Function to save data in the SQLite database
def save_to_database(sender, ad_id, rating, timestamp):
    print(f"Saving data to database: {sender}, {ad_id}, {rating}, {timestamp}")
    conn = sqlite3.connect("data.db")
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO ad_ratings (sender, ad_id, rating, timestamp)
        VALUES (?, ?, ?, ?)
    """, (sender, ad_id, rating, timestamp))
    conn.commit()
    conn.close()


# Function to save the rating to database
def save_rating(text):
    obj = json.loads(text)
    sender = obj["from"]
    ad_id = obj["ad_id"]
    rating = obj["rating"]
    timestamp = datetime.datetime.now()
    save_to_database(sender, ad_id, rating, timestamp)
    return {"ok": obj}

def get_highest_rated_ad() -> Ad:
    conn = sqlite3.connect("data.db")
    cursor = conn.cursor()

    # Get the ad_id with the highest rating
    cursor.execute("""
        SELECT *
        FROM ad_ratings
        ORDER BY AVG(rating) DESC
        LIMIT 1
    """)

    highest_rated_ad_id = cursor.fetchone()
    conn.close()

    if highest_rated_ad_id:
        return highest_rated_ad_id[0]
    else:
        return None

def get_most_profitable_ad():
    conn = sqlite3.connect("data.db")
    cursor = conn.cursor()

    # Get the ad_id with the highest PPC
    cursor.execute("""
        SELECT ad_id
        FROM ads
        ORDER BY ppc DESC
        LIMIT 1
    """)

    most_profitable_ad_id = cursor.fetchone()
    conn.close()

    if most_profitable_ad_id:
        return most_profitable_ad_id[0]
    else:
        return None


# Function to do the ranking, not real-ML but usable AI for a hackathon
def do_magic_ranking():
    return random.choice([get_most_profitable_ad(), get_highest_rated_ad()])



def get_all_ads(limit: int = 10) -> list[Ad]:
    conn = sqlite3.connect("data.db")
    cursor = conn.cursor()
    cursor.execute("""
        SELECT ad_id, wallet_id, cid, keywords, ppc, timestamp
        FROM ads
        ORDER BY timestamp DESC
        LIMIT ?
    """, (limit,))
    raw = cursor.fetchall()
    # transform into Ad objects
    ads = [Ad(ad_id=ad[0], wallet_id=ad[1], cid=ad[2], keywords=ad[3], ppc=ad[4], timestamp=ad[5]) for ad in raw]
    return ads

class UploadRequest(BaseModel):
    wallet_id: str
    keywords: str
    cid: str



def save_cid(params: UploadRequest):
    conn = sqlite3.connect("data.db")
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO ads (wallet_id, keywords, cid, ppc, timestamp)
        VALUES (?, ?, ?, ?, ?)
    """, (params.wallet_id, params.keywords, params.cid, 0, datetime.datetime.now()))
    conn.commit()

# Call the function to create the table (called once)
create_table()


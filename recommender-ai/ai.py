import datetime
import json
import sqlite3
import random

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
            id INTEGER PRIMARY KEY,
            ad_id INTEGER,
            ppc INTEGER
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

def get_highest_rated_ad():
    conn = sqlite3.connect("data.db")
    cursor = conn.cursor()

    # Get the ad_id with the highest rating
    cursor.execute("""
        SELECT ad_id
        FROM ad_ratings
        GROUP BY ad_id
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


# Call the function to create the table (called once)
create_table()

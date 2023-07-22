import datetime
import json
import sqlite3

# Function to create the SQLite database and table (called once)
def create_table():
    conn = sqlite3.connect("data.db")
    cursor = conn.cursor()
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
    conn.close()

# Function to save data in the SQLite database
def save_to_database(sender, ad_id, rating, timestamp):
    conn = sqlite3.connect("data.db")
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO ad_ratings (sender, ad_id, rating, timestamp)
        VALUES (?, ?, ?, ?)
    """, (sender, ad_id, rating, timestamp))
    conn.commit()
    conn.close()


def foobar(text):
    obj = json.loads(text)
    sender = obj["from"]
    ad_id = obj["ad_id"]
    rating = obj["rating"]
    timestamp = datetime.datetime.now()

    # Save the data in SQLite database
    save_to_database(sender, ad_id, rating, timestamp)

    return {"ok": obj}

# Call the function to create the table (called once)
create_table()

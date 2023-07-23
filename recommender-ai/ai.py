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
    is_upvote: bool
    timestamp: datetime.datetime


# Function to create the SQLite database and table (called once)
def create_table():
    conn = sqlite3.connect("data.db")
    cursor = conn.cursor()

    # Create a table to store the ratings
    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS ad_ratings (
            id INTEGER PRIMARY KEY,
            sender TEXT,
            ad_id INTEGER,
            is_upvote BOOLEAN,
            timestamp DATETIME
        )
    """
    )
    conn.commit()

    # Create a table to store the ads and ppc
    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS ads (
            ad_id INTEGER PRIMARY KEY,
            wallet_id TEXT,
            cid TEXT,
            keywords TEXT,
            ppc INTEGER,
            timestamp DATETIME
        )
    """
    )
    conn.commit()
    conn.close()


# Function to save the rating to database
def save_rating(text):
    obj = json.loads(text)
    sender = obj["from"]
    ad_id = obj["ad_id"]
    rating = obj["rating"]
    is_upvote = rating == "up"
    timestamp = datetime.datetime.now()
    print(f"Saving data to database: {sender}, {ad_id}, {is_upvote}, {timestamp}")
    conn = sqlite3.connect("data.db")
    cursor = conn.cursor()
    cursor.execute(
        """
        INSERT INTO ad_ratings (sender, ad_id, is_upvote, timestamp)
        VALUES (?, ?, ?, ?)
    """,
        (sender, ad_id, is_upvote, timestamp),
    )
    conn.commit()
    return {"ok": obj}


def get_highest_rated_ad() -> Ad:
    conn = sqlite3.connect("data.db")
    cursor = conn.cursor()

    # Get the ad_id with the highest rating
    cursor.execute(
        """
        SELECT ad_id, AVG(CASE WHEN is_upvote THEN 1 ELSE -1 END) AS average_rating
        FROM ad_ratings
        GROUP BY ad_id
        ORDER BY average_rating DESC
        LIMIT 1;
    """
    )

    highest_rated_ad_id = cursor.fetchone()
    conn.close()

    if highest_rated_ad_id:
        ad_id = highest_rated_ad_id[0]
        return get_ad_by_id(ad_id)
    else:
        return None


def get_most_paid_ad():
    conn = sqlite3.connect("data.db")
    cursor = conn.cursor()

    # Get the ad_id with the highest PPC
    cursor.execute(
        """
        SELECT ad_id
        FROM ads
        ORDER BY ppc DESC
        LIMIT 1
    """
    )

    most_profitable_ad_id = cursor.fetchone()
    conn.close()

    if most_profitable_ad_id:
        return get_ad_by_id(most_profitable_ad_id[0])
    else:
        return None


def get_most_relevant_ad(comma_separated_string):
    conn = sqlite3.connect("data.db")
    cursor = conn.cursor()

    # Extract individual keywords from the comma-separated string
    keywords_list = comma_separated_string.split(",")

    # Build the WHERE clause with the appropriate number of placeholders for the keywords
    where_clause = " OR ".join(["keywords LIKE ?"] * len(keywords_list))

    # Get the ad_id with the highest relevance to the given keywords
    query = f"""
        SELECT *
        FROM ads
        WHERE {where_clause}
        ORDER BY ppc DESC
        LIMIT 1
    """
    print(query, keywords_list)
    cursor.execute(
        query,
        keywords_list,
    )

    most_relevant_ad = cursor.fetchone()
    print(most_relevant_ad)

    if most_relevant_ad:
        ad_id, wallet_id, cid, keywords, ppc, timestamp = most_relevant_ad
        # Create and return the Ad object
        return Ad(
            ad_id=ad_id,
            wallet_id=wallet_id,
            cid=cid,
            keywords=keywords,
            ppc=ppc,
            timestamp=timestamp,
        )
    else:
        return None


def get_ad_by_id(ad_id: int) -> Ad:
    conn = sqlite3.connect("data.db")
    cursor = conn.cursor()
    cursor.execute(
        """
        SELECT ad_id, wallet_id, cid, keywords, ppc, timestamp
        FROM ads
        WHERE ad_id = ?
    """,
        (ad_id,),
    )
    raw = cursor.fetchone()
    if raw:
        ad_id, wallet_id, cid, keywords, ppc, timestamp = raw
        # Create and return the Ad object
        return Ad(
            ad_id=ad_id,
            wallet_id=wallet_id,
            cid=cid,
            keywords=keywords,
            ppc=ppc,
            timestamp=timestamp,
        )
    else:
        return None


# Function to do the ranking, not real-ML but usable AI for a hackathon
def magic_ranking_ad_id(keywords: str = None):
    # get_most_relevant_ad(keywords) if keywords else None,
    choices = [
        get_most_paid_ad(),
        get_highest_rated_ad(),
    ]
    ad = random.choice(choices)
    return ad


def get_all_ads(limit: int = 10) -> list[Ad]:
    conn = sqlite3.connect("data.db")
    cursor = conn.cursor()
    cursor.execute(
        """
        SELECT ad_id, wallet_id, cid, keywords, ppc, timestamp
        FROM ads
        ORDER BY timestamp DESC
        LIMIT ?
    """,
        (limit,),
    )
    raw = cursor.fetchall()
    # transform into Ad objects
    ads = [
        Ad(
            ad_id=ad[0],
            wallet_id=ad[1],
            cid=ad[2],
            keywords=ad[3],
            ppc=ad[4],
            timestamp=ad[5],
        )
        for ad in raw
    ]
    return ads


class UploadRequest(BaseModel):
    wallet_id: str
    keywords: str
    cid: str


def save_cid(params: UploadRequest):
    conn = sqlite3.connect("data.db")
    cursor = conn.cursor()
    cursor.execute(
        """
        INSERT INTO ads (wallet_id, keywords, cid, ppc, timestamp)
        VALUES (?, ?, ?, ?, ?)
    """,
        (params.wallet_id, params.keywords, params.cid, 0, datetime.datetime.now()),
    )
    conn.commit()


# Call the function to create the table (called once)
create_table()

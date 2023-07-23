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
    upvote_count: int = 0
    downvote_count: int = 0


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
        return get_ad_by_id_with_up_downs(ad_id)
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
        return get_ad_by_id_with_up_downs(most_profitable_ad_id[0])
    else:
        return None


def get_most_relevant_ad(comma_separated_string):
    conn = sqlite3.connect("data.db")
    cursor = conn.cursor()

    # Extract individual keywords from the comma-separated string
    keywords_list = comma_separated_string.split(",")

    # Build the WHERE clause
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


def get_ad_by_id_with_up_downs(ad_id: int) -> Ad:
    conn = sqlite3.connect("data.db")
    cursor = conn.cursor()
    cursor.execute(
        """
    SELECT a.ad_id, a.wallet_id, a.cid, a.keywords, a.ppc, a.timestamp,
           SUM(CASE WHEN ar.is_upvote = 1 THEN 1 ELSE 0 END) AS upvote_count,
           SUM(CASE WHEN ar.is_upvote = 0 THEN 1 ELSE 0 END) AS downvote_count
    FROM ads AS a
    LEFT JOIN ad_ratings AS ar ON a.ad_id = ar.ad_id
    WHERE a.ad_id = ?
    GROUP BY a.ad_id, a.wallet_id, a.cid, a.keywords, a.ppc, a.timestamp
    """,
        (ad_id,),
    )

    raw = cursor.fetchone()
    if raw:
        (
            ad_id,
            wallet_id,
            cid,
            keywords,
            ppc,
            timestamp,
            upvote_count,
            downvote_count,
        ) = raw
        # Create and return the Ad object
        return Ad(
            ad_id=ad_id,
            wallet_id=wallet_id,
            cid=cid,
            keywords=keywords,
            ppc=ppc,
            timestamp=timestamp,
            upvote_count=upvote_count,
            downvote_count=downvote_count,
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
    print(choices)
    ad = random.choice(choices)
    return ad


def check_if_ad_exists(ad_id: int) -> bool:
    conn = sqlite3.connect("data.db")
    cursor = conn.cursor()
    cursor.execute(
        """
        SELECT ad_id
        FROM ads
        WHERE ad_id = ?
    """,
        (ad_id,),
    )
    raw = cursor.fetchone()
    return raw is not None


def get_all_ads(limit: int = 10) -> list[Ad]:
    conn = sqlite3.connect("data.db")
    cursor = conn.cursor()
    cursor.execute(
        """
        SELECT ad_id
        FROM ads
        ORDER BY timestamp DESC
        LIMIT ?
    """,
        (limit,),
    )
    raw = cursor.fetchall()
    # transform into Ad objects
    ads = [get_ad_by_id_with_up_downs(row[0]) for row in raw]
    return ads


class UploadRequest(BaseModel):
    wallet_id: str
    keywords: str
    cid: str
    ppc: int


def save_cid(params: UploadRequest) -> int:
    conn = sqlite3.connect("data.db")
    cursor = conn.cursor()
    cursor.execute(
        """
        INSERT INTO ads (wallet_id, keywords, cid, ppc, timestamp)
        VALUES (?, ?, ?, ?, ?)
    """,
        (
            params.wallet_id,
            params.keywords,
            params.cid,
            params.ppc,
            datetime.datetime.now(),
        ),
    )
    conn.commit()
    return cursor.lastrowid


# Call the function to create the table (called once)
create_table()

import datetime
from env import wallet_address
from w3b import clicked, review_ad
from ai import (
    save_rating,
    magic_ranking_ad_id,
    get_all_ads,
    save_cid,
    UploadRequest,
)
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(docs_url=None, redoc_url=None, openapi_url=None)


cors_app = CORSMiddleware(
    app,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"Hack": "ETHGlobal Paris 2023"}


@app.post("/")
async def handle_xmtp_relay(text):
    try:
        ad_id, world_id, cid, is_upvote = save_rating(text)
        # tx_hash = 1000000000
        print(ad_id, world_id, cid, is_upvote)
        tx_hash = review_ad(
            ad_id=ad_id,
            world_id=world_id,
            ipfs_cid=cid,
            review=is_upvote,
        )
        print(tx_hash)
        return {"ad_id": ad_id, "text": text, "status": "ok", "tx_hash": tx_hash}

    except Exception:
        return {"oops": "something went wrong"}


@app.get("/ai")
async def ranking(keywords: str = None):
    return magic_ranking_ad_id(keywords)


@app.get("/ads")
async def all_the_ads():
    ads = get_all_ads(limit=100)
    return ads


@app.post("/clicked")
async def ad_clicked(ad_id: int, world_id: str):
    """
    Creates a new ad
    """
    timestamp: int = int(datetime.datetime.now().timestamp())
    tx_hash = clicked(ad_id, timestamp, world_id, wallet_address)
    return {"event": "ad_clicked", "ad_id": ad_id, "tx_hash": tx_hash}


@app.post("/upload")
async def upload(params: UploadRequest):
    """
    Creates a new ad
    """
    ad_id = save_cid(params)
    return {"uploaded": params, "ad_id": ad_id}


app = cors_app

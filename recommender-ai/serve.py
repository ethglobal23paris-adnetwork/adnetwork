import datetime

from w3b import create_ad, clicked
from ai import (
    save_rating,
    magic_ranking_ad_id,
    get_all_ads,
    save_cid,
    UploadRequest,
    check_if_ad_exists,
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
async def relay(text):
    try:
        return {"ok": save_rating(text)}

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
async def ad_clicked(ad_id: int, world_id: int):
    """
    Creates a new ad
    """
    if check_if_ad_exists(ad_id):
        return {"error": "ad_id does not exist"}
    timestamp: int = int(datetime.now().timestamp())
    tx_hash = clicked(ad_id, timestamp, world_id, sender_address)
    return {"event": "ad_clicked", "ad_id": ad_id, "tx_hash": tx_hash}


@app.post("/upload")
async def upload(params: UploadRequest):
    """
    Creates a new ad
    """
    ad_id = save_cid(params)
    tx_hash = create_ad(params.cid, params.ppc, params.keywords, params.wallet_id)
    return {"uploaded": params, "tx_hash": tx_hash, "ad_id": ad_id}


app = cors_app

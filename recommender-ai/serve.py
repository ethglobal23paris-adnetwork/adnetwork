from ai import save_rating, magic_ranking_ad_id, get_all_ads, save_cid, UploadRequest
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


@app.post("/upload")
async def upload(params: UploadRequest):
    save_cid(params)
    return {"uploaded": params}


app = cors_app

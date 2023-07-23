from ai import save_rating, magic_ranking_ad_id, get_all_ads, save_cid, UploadRequest
from fastapi import FastAPI
from web3 import Web3, HTTPProvider
from eth_account import Account
from fastapi.middleware.cors import CORSMiddleware

w3 = Web3(Web3.HTTPProvider("https://linea-goerli.infura.io/v3/51c64d09ec504c32bc832829d8211891"))


private_key = '0xac965085389145d0ede58d538b833ab26482c8c5184f482a7c2ae563f590d29f'


app = FastAPI(docs_url=None, redoc_url=None, openapi_url=None)

WEB3_STORAGE_API_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGQ4NjcxQTNlRkMwQWNiOWJCOGRlMTkxRTU3ZjczNGZGYjExRUI4YTgiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTAwMjgwMTE0MzYsIm5hbWUiOiJ6YXAifQ.w7Y43yX2S0etFLtbzthh3duoO6FYokHvmX-r9_ddElA"

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

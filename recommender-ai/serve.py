from ai import save_rating, do_magic_ranking
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

@app.get("/ranking")
async def ranking():
    return {"ad_id": do_magic_ranking()}

app = cors_app

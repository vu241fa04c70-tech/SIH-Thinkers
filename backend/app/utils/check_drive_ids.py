import requests

# Base ID string: 1h0pt48eJAq-wAHUf5-gFA9PlibOxVyk0
base_id = "1h0pt48eJAq-wAHUf5-gFA9PlibOxVyk0"

# Common OCR confusion candidates
replacements = [
    base_id,
    "1h0pt48eJAq-wAHUf5-gFA9P1ibOxVyk0", # l -> 1
    "1h0pt48eJAq-wAHUf5-gFA9Plib0xVyk0", # O -> 0
    "1h0pt48eJAq-wAHUf5-gFA9P1ib0xVyk0",
    "1h0pt48eJAq-wAHUf5-gFA9PIibOxVyk0", # l -> I
    "1h0pt48eJAq-wAHUf5-gFA9PlibOxVykO", # 0 -> O
    "1h0pt48eJAq-wAHUf5-gFA9P1ibOxVykO",
    "1h0pt48eJAq_wAHUf5-gFA9PlibOxVyk0", # - -> _
    "1h0pt48eJAq-wAHUf5_gFA9PlibOxVyk0",
    "1h0pt48eJAq_wAHUf5_gFA9PlibOxVyk0",
    "1h0pt48eJAq-wAHUf5-gFA9PlibOxVyk",
    "1h0pt48eJAq-wAHUf5-gFA9PlibOxVyk0/view",
]

session = requests.Session()
session.headers.update({"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"})

for cand in set(replacements):
    url = f"https://drive.google.com/file/d/{cand}/view"
    res = session.get(url, allow_redirects=True)
    status = res.status_code
    page_text = res.text[:200]
    is_not_found = "Sorry, unable to open the file" in res.text or "Page not found" in res.text
    print(f"ID: {cand} -> Status: {status}, NotFound: {is_not_found}, Size: {len(res.text)}")

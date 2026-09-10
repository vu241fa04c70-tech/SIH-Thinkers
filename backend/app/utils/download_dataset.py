import requests
import os
import zipfile

FILE_ID = "1h0pt48eJAq-wAHUf5-gFA9PlibOxVyk0"
RAW_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "data", "raw")
os.makedirs(RAW_DIR, exist_ok=True)

def download_file_from_google_drive(file_id, destination):
    URL = "https://docs.google.com/uc?export=download"
    session = requests.Session()

    response = session.get(URL, params={'id': file_id, 'confirm': 't'}, stream=True)
    
    # Save response content
    with open(destination, "wb") as f:
        for chunk in response.iter_content(32768):
            if chunk:
                f.write(chunk)
                
    print(f"Downloaded file to {destination}, size: {os.path.getsize(destination)} bytes")

if __name__ == "__main__":
    dest = os.path.join(RAW_DIR, "dataset_downloaded.bin")
    download_file_from_google_drive(FILE_ID, dest)

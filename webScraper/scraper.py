
import os
import sys
import uuid

import urllib3
from bs4 import BeautifulSoup
import random

import urllib.parse

import base64
import requests

from PIL import Image
from io import BytesIO
import time



def randFloat (mi, mx):
  base = random.randrange(9999, 999999) / random.randrange(1, 99)
  return base % (mx - mi) + mi

def get_as_base64(url):
    return base64.b64encode(requests.get(url).content)

def scrap_upload_and_link_images (http, imgs, offerId):
  totalCount = 0

  for img in imgs:
    # convert to base64
    # generate new UUID
    # upload
    # link

    if totalCount >= 5:
      break

    print(f'processing: {img}')
    imageId = str(uuid.uuid1())

    # get PIL image
    response = requests.get(img)
    pimg = None

    try:
      pimg = Image.open(BytesIO(response.content))
    except:
      continue

    # convert to base64

    buffered = BytesIO()
    
    # now resize, and do it smart
    W, H = pimg.size
    newSize = (0, 0)

    if W > H:
      newSize = (512, H * 512 // W)
    elif W == H:
      newSize = (512, 512)
    else:
      newSize = (W * 512 // H, 512)

    pimg = pimg.resize(newSize)
    pimg.save(buffered, format="JPEG", quality=25, subsampling=4)
    b64 = base64.b64encode(buffered.getvalue())
    simg = f'data:image/jpeg;base64,{urllib.parse.quote_plus(b64)}'
    # print(f'{simg}') #TODO, MIGHT NEED WRAPR

    # now chunk it, and send throught

    packets = []
    for i in range(0, len(simg), 1980):
      packets.append(simg[i: i + 1980])

    packetId = 0
    for p in packets:
      url = f'http://e-bazary.ugu.pl/uploadImage.php?imageId={imageId}&packetId={packetId}&content={p}'
      r = requests.get(url)
      print(f'\n{imageId} {packetId} resp = {r}')
      # print(f'url = {url}')
      # time.sleep(0.1)
      packetId = packetId + 1

    # subscribe image to offer
    requests.get(f'http://e-bazary.ugu.pl/addImageToOffer.php?offerId={offerId}&imageId={imageId}')
    totalCount = totalCount + 1


def scrap_from_link (http, link, kind):
  print(f'Scrapping from {link}')

  response = http.request('GET', f'https://www.olx.pl{link}')
  soup = BeautifulSoup(response.data)

  imgs = soup.find_all("img", {"class": "css-1bmvjcs"})
  srcs = []

  # First, Pool Images

  for img in imgs:
    src = img.get('src')
    srcset = img.get('srcset')
    datasrc = img.get('data-src')

    if src is not None:
      srcs.append(src)

    if srcset is not None:
      srcs.append(srcset)

    if datasrc is not None:
      srcs.append(datasrc)

    srcs = list(dict.fromkeys(srcs))
    # print(f"\tfound images: {srcs}")

  # Second, Pool Data
  titleHT = soup.find_all("h1", {"class": "css-r9zjja-Text"})
  title = titleHT[0].string
  title = urllib.parse.quote_plus(title)

  descrHT = soup.find_all("div", {"class": "css-g5mtbi-Text"})
  descr = descrHT[0].contents[0]
  descr = urllib.parse.quote_plus(descr)

  priceHT = soup.find_all("h3", {"class": "css-okktvh-Text"})
  price = priceHT[0].contents[0]
  price = str(price).replace(' ', '')

  lat = randFloat(50.729088712331226, 53.936303826804135)
  lon = randFloat(15.678710715966309, 23.45703077399104)
  offerId = str(uuid.uuid1())
  userId = random.randrange(1, 100)

  print(f'offerId: {offerId}, Title: {title}, Descr: {descr}, Price {price}, Lat: {lat}, Lon: {lon}')

  #send info to server
  r2 = http.request('GET', f'http://e-bazary.ugu.pl/newOffer.php?userId={userId}&offerId={offerId}&kind={kind}&title={title}&descr={descr}&price={price}&lat={lat}&lon={lon}')
  
  # Now, Attempt to add images to this offer
  scrap_upload_and_link_images(http, srcs, offerId)


def scrape_from_search (http, info):
  print(f'Pooling {info[0]} from {info[1]}')
  # url = 'http://www.thefamouspeople.com/singers.php'
  
  response = http.request('GET', info[1])
  soup = BeautifulSoup(response.data)

  # now pool links to offers
  # but how?
  linx = soup.find_all("a", {"class": "css-rc5s2u"})
  hrefs = []

  for link in linx:
    # now get is href
    # print(f'\tfound: {link["href"]}')
    hrefs.append(link['href'])

  for href in hrefs:
    scrap_from_link(http, href, info[0])



def main():
  print('began scraping!')

  http = urllib3.PoolManager()

  pages = []
  pages.append(('Elektronika', 'https://www.olx.pl/d/elektronika/telefony/'))
  pages.append(('Moda', 'https://www.olx.pl/d/moda/ubrania-meskie/?search%5Bfilter_enum_state%5D%5B0%5D=new'))
  pages.append(('Dom', 'https://www.olx.pl/d/dom-ogrod/wykonczenie-wnetrz/?search%5Bfilter_enum_state%5D%5B0%5D=new'))
  pages.append(('Elektronika', 'https://www.olx.pl/d/elektronika/komputery/'))
  pages.append(('Inne', 'https://www.olx.pl/d/uslugi-firmy/uslugi/'))
  pages.append(('Elektronika', 'https://www.olx.pl/d/elektronika/smartwatche-i-opaski/'))
  pages.append(('Dom', 'https://www.olx.pl/d/dom-ogrod/meble/?search%5Bfilter_enum_state%5D%5B0%5D=new'))
  pages.append(('Elektronika', 'https://www.olx.pl/d/elektronika/gry-konsole/'))
  pages.append(('Motoryzacja', 'https://www.olx.pl/d/motoryzacja/samochody/'))
  pages.append(('Moda', 'https://www.olx.pl/d/moda/ubrania-damskie/?search%5Bfilter_enum_state%5D%5B0%5D=new'))
  pages.append(('Motoryzacja', 'https://www.olx.pl/d/motoryzacja/motocykle-skutery/'))

  # url = 'http://e-bazary.ugu.pl/dbgImg.php'
  # response = http.request('GET', url)

  # print(f'contents:\n"{response.data}"\n')

  for inf in pages:
    scrape_from_search(http, inf)


if __name__ == '__main__':
  main()
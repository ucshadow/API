import requests
from bs4 import BeautifulSoup


class BingLogoSearch:
    def __init__(self):
        self.url = 'https://www.bing.com/images/search?q='
        self.cached = []

    def get_image(self, name):

        if self.already_cached(name):
            for i in self.cached:
                if i['name'] == name:
                    return i['src']

        bing_friendly = (name + '+logo').replace(' ', '+')
        print(self.url + bing_friendly)
        r = requests.get(self.url + bing_friendly,
                         headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) '
                                                'AppleWebKit/537.36'
                                                ' (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'})
        soup = BeautifulSoup(r.text, 'html.parser')
        try:
            first_image_div = soup.find('div', {'class': 'imgpt'})
            first_image = first_image_div.find('a', {'class': 'iusc'})
            sp = str(first_image).split('turl')[1]
            first_image_src = sp.split('"')[2]
            obj = {'name': name, 'src': first_image_src}
            self.cached.append(obj)
            return first_image_src
        except:
            return 'https://i.imgur.com/5gO7P9B.png'

    def already_cached(self, name):
        for i in self.cached:
            if i['name'] == name:
                return True
        return False


# g = BingLogoSearch()
# print(g.get_image('Neolution E-Sport International'))
# g.get_image('Neolution E-Sport International')

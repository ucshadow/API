import requests
from bs4 import BeautifulSoup


class Gosu:
    def __init__(self):
        self.url = 'http://www.gosugamers.net/dota2'

    def fetch(self):
        r = requests.get(self.url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                                                          ' (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'})
        soup = BeautifulSoup(r.text, 'html.parser')

        matches = []

        root1 = soup.find_all('span', class_='opp opp1')
        root2 = soup.find_all('span', class_='opp opp2')
        st = soup.find_all('td', class_='status')

        for i in range(5):
            try:
                left = root1[i]
                right = root2[i]
                # status = soup.find('td', class_='status')
                status_ = st[i].find('span', class_='live-in')
                row = {'left': left.get_text().strip(), 'right': right.get_text().strip(), 'status': status_.get_text()}
                matches.append(row)
            except:
                continue
        return matches

    # def fetch2(self):
    #     r = requests.get('http://wiki.teamliquid.net/dota2/Main_Page',
    #                      headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    #                                             ' (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'})
    #     soup = BeautifulSoup(r.text, 'html.parser')
    #
    #     matches = []
    #
    #     a = soup.find_all('table', class_='table table-full-width table-striped infobox_matches_content')
    #     for i in a:
    #         l = i.find_all('span', class_='team-template-team2-short')
    #         r = i.find_all('span', class_='team-template-team-short')
    #         # print(l.get('data-highlightingclass'), ' -- ', r.get('data-highlightingclass'))
    #         for q in range(len(l)):
    #             print(l[q].get('data-highlightingclass'), ' -- ', r[q].get('data-highlightingclass'))


# g = Gosu()
# print(g.fetch())

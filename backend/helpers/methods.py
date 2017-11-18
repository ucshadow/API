from helpers.image_downloader import BingLogoSearch


def add_logo(obj):
    if obj['logo_url'] is None:
        logo_url = BingLogoSearch().get_image(obj['name'])
        obj['logo_url'] = logo_url
        return obj
    return obj
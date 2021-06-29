from django.core.management.base import BaseCommand
from video.models import ShowSource, MovieSource


class Command(BaseCommand):

    def update_sources(self, sources):
        for index, source in enumerate(sources):
            if 'mega.nz' in source.url_source:
                source.server = 'mega'
                source.save()
            if 'blogger.com' in source.url_source:
                source.server = 'blogger'
                source.priority = 1
                source.save()
            if 'vidfast.co' in source.url_source:
                source.server = 'vidfast'
                source.active = False
                source.save()
            if 'uqload.com' in source.url_source:
                source.server = 'uqload'
                source.priority = 5
                source.save()
            if 'movcloud.net' in source.url_source:
                source.server = 'movcloud'
                source.priority = 4
                source.save()
            if 'peliscloud.net' in source.url_source:
                source.server = 'peliscloud'
                source.priority = 5
                source.save()
            if 'animekao.xyz' in source.url_source:
                source.server = 'animekao'
                source.priority = 8
                source.save()
            if 'pelispng.online' in source.url_source:
                source.server = 'pelispng'
                source.priority = 7
                source.save()
            if 'pelispng.online' in source.url_source:
                source.server = 'pelispng'
                source.priority = 7
                source.save()
            if 'gdriveplayer.to' in source.url_source:
                source.server = 'gdriveplayer'
                source.priority = 10
                source.save()
            if 'feurl.com/' in source.url_source:
                source.server = 'feurl'
                source.priority = 8
                source.save()
            if 'v2.zplayer.live' in source.url_source:
                source.server = 'zplayer'
                source.priority = 9
                source.save()
            if 'sendvid.com' in source.url_source:
                source.server = 'sendvid'
                source.priority = 6
                source.save()
            if 'vimeo.com' in source.url_source:
                source.server = 'vimeo'
                source.priority = 1
                source.save()
            if 'drive.google.com' in source.url_source:
                source.server = 'drive'
                source.priority = 2
                source.save()
            if 'ok.ru' in source.url_source:
                source.server = 'ok'
                source.priority = 2
                source.save()
            if 'emax20.com' in source.url_source:
                source.server = 'emax20'
                source.priority = 5
                source.save()

    def handle(self, *args, **options):
        print('...updating movies Sources')
        self.update_sources(MovieSource.objects.all())
        print('updated movies Sources')
        print('...updating Shows Sources')
        self.update_sources(ShowSource.objects.all())
        print('updated Show Sources')
        print('FINISH!')

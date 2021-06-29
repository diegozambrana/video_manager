import json

from django.core.management.base import BaseCommand
from video.models import Show, Chapter, ShowSource


class Command(BaseCommand):

    def add_arguments(self, parser):
        parser.add_argument('--json_path', type=str)
        parser.add_argument('--id_show', type=int)
        parser.add_argument('--load', type=bool)

    def handle(self, *args, **options):
        print('Start load JSON video Data')
        if options['json_path']:
            print(options['json_path'])
            show = Show.objects.get(pk=options['id_show'])
            print(show.name)
            with open(options['json_path'], 'r') as jsonFile:
                json_str = jsonFile.read()
                data = json.loads(json_str)
                for d in data:
                    print(d['title'])
                    # season data
                    if options['load']:
                        try:
                            chapter = Chapter.objects.get(
                                number_chapter=d['chapter'],
                                season=d['season'],
                                show=show,
                            )
                        except Exception:
                            print('------ ERROR')
                            chapter = Chapter(
                                name=d['title'],
                                number_chapter=d['chapter'],
                                season=d['season'],
                                show=show,
                                description=d['description']
                            )
                            chapter.save()
                            pass
                    else:
                        chapter, created = Chapter.objects.get_or_create(
                            name=d['title'],
                            number_chapter=d['chapter'],
                            season=d['season'],
                            show=show,
                            description=d['description']
                        )
                    print(chapter.name)
                    for source in d['sources']:
                        source = ShowSource.objects.get_or_create(
                            url_source=source,
                            chapter=chapter
                        )
                        print(source)

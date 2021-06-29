import csv

from django.core.management.base import BaseCommand
from video.models import Show, Chapter, ShowSource


class Command(BaseCommand):

    def add_arguments(self, parser):
        parser.add_argument('--csv_path', type=str)
        parser.add_argument('--id_show', type=int)

    def handle(self, *args, **options):
        print('Start load CSV video Data')
        if options['csv_path']:
            print(options['csv_path'])
            show = Show.objects.get(pk=options['id_show'])
            print('read show', show.name)
            with open(options['csv_path'], 'r') as tsv_file:
                read_tsv = csv.reader(tsv_file, delimiter="\t")
                next(read_tsv, None)
                # print(json_str)
                for row in read_tsv:
                    title = row[0]
                    description = row[1]
                    season = int(row[2])
                    chapter_numbr = int(row[3])
                    src = row[4]

                    chapter, created = Chapter.objects.get_or_create(
                        name=title,
                        number_chapter=chapter_numbr,
                        season=season,
                        show=show,
                    )
                    print(chapter.name)

                    if created:
                        chapter.description = description
                        chapter.save()
                    source = ShowSource.objects.get_or_create(
                        url_source=src,
                        chapter=chapter
                    )
                    print(source)

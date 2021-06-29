from django.db.models import Max
from rest_framework import viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from video.serializers import (
    ShowSerializer,
    ChapterSetializer,
    CollectionSerializer,
    ShowSourceSerializer,
    MovieSourceSerializer,
    MovieSerializer,
    SliderItemSerializer,
    SliderSerializer,
    GenreSerializer,
)
from video.models import (
    Show,
    Chapter,
    Collection,
    Genre,
    MovieSource,
    ShowSource,
    Movie,
    Slider,
    SliderItem
)


def get_back_chapter(show, episode):
    back = False
    if episode.number_chapter == 1:
        if episode.season == 1:
            filterChapter = Chapter.objects.filter(show=show, season=0)
            if filterChapter.count() > 0:
                back = filterChapter.order_by('-number_chapter')[0]
        else:
            filterChapter = Chapter.objects.filter(
                show=show,
                season=episode.season - 1
            )
            if filterChapter.count() > 0:
                back = filterChapter.order_by('-number_chapter')[0]
    else:
        back_number_chapter = episode.number_chapter - 1
        back = Chapter.objects.get(
            show=show,
            season=episode.season,
            number_chapter=back_number_chapter
        )
    return back


def get_next_chapter(show, episode):
    next_chapter = False
    max_chapter = Chapter.objects.filter(show=show, season=episode.season)\
        .aggregate(Max('number_chapter'))['number_chapter__max']
    if episode.number_chapter == max_chapter:
        filterChapter = Chapter.objects.filter(
            show=show, season=episode.season + 1
        )
        if filterChapter.count() > 0:
            next_chapter = filterChapter.order_by('number_chapter')[0]
    else:
        next_number_chapter = episode.number_chapter + 1
        next_chapter = Chapter.objects.get(
            show=show,
            season=episode.season,
            number_chapter=next_number_chapter
        )
    return next_chapter


def get_related_shows(show):
    related_shows = Show.objects. \
            filter(genres__in=show.genres.values_list('pk')). \
            exclude(pk=show.pk).distinct().order_by('-name')[:4]
    return related_shows


class GenreViewSet(viewsets.ModelViewSet):
    queryset = Genre.objects.all().order_by('name')
    serializer_class = GenreSerializer


class CollectionViewSet(viewsets.ModelViewSet):
    queryset = Collection.objects.filter(active=True)
    serializer_class = CollectionSerializer
    pagination_class = None

    def get(self, request, slugCollection):
        collection = Collection.objects.get(slug=slugCollection)
        data = CollectionSerializer(collection).data
        return Response(data)


class ShowsViewSet(viewsets.ModelViewSet):
    queryset = Show.objects.filter(active=True).order_by('-update_at')
    serializer_class = ShowSerializer

    def list(self, request, *args, **kwargs):
        if(request.GET.get('genre')):
            query = Show.objects.filter(genres__slug=request.GET.get('genre'))
            genre = Genre.objects.get(slug=request.GET.get('genre'))
            page = self.paginate_queryset(query)
            serializer = ShowSerializer(page, many=True)
            response = self.get_paginated_response(serializer.data)
            response.data['genre'] = GenreSerializer(genre).data
            return response
        if(request.GET.get('collection')):
            query = Show.objects.filter(
                collection__slug=request.GET.get('collection')
            )
            page = self.paginate_queryset(query)
            serializer = ShowSerializer(page, many=True)
            response = self.get_paginated_response(serializer.data)
            return response
        else:
            return super().list(request, *args, **kwargs)


class ChapterViewSet(viewsets.ModelViewSet):
    queryset = Chapter.objects.all()
    serializer_class = ChapterSetializer

    def getListByShow(self, request, slug):
        show = Show.objects.get(slug=slug)
        chapters = Chapter.objects.filter(show=show)
        data = ShowSerializer(show).data
        res = {}

        if chapters.filter(season=0).count() > 0:
            res['0'] = ChapterSetializer(chapters.filter(season=0), many=True)\
                .data

        c = 1
        while(chapters.filter(season=c).count() > 0):
            res[c] = ChapterSetializer(chapters.filter(season=c),
                                       many=True).data
            c += 1

        related_shows = get_related_shows(show)
        data['related'] = ShowSerializer(related_shows, many=True).data
        data['data'] = res

        return Response(data)

    def getChapterDetails(self, request, slugShow, slugChapter):
        show = Show.objects.get(slug=slugShow)
        chapter = Chapter.objects.get(show=show, slug=slugChapter)
        back = ''
        data = ChapterSetializer(chapter).data
        sources = ShowSource.objects.filter(chapter=chapter, active=True)
        data['sources'] = ShowSourceSerializer(sources, many=True).data
        data['show'] = ShowSerializer(show).data

        back = get_back_chapter(show, chapter)
        if back:
            data['back'] = ChapterSetializer(back).data

        next_chapter = get_next_chapter(show, chapter)
        if next_chapter:
            data['next'] = ChapterSetializer(next_chapter).data

        related_shows = get_related_shows(show)
        data['related'] = ShowSerializer(related_shows, many=True).data

        return Response(data)


class MoviesViewSet(viewsets.ModelViewSet):
    queryset = Movie.objects.all().order_by('-update_at')
    serializer_class = MovieSerializer

    def get(self, request, slugMovie):
        movie = Movie.objects.get(slug=slugMovie)
        data = MovieSerializer(movie).data
        sources = MovieSource.objects.filter(
            movie=movie,
            active=True,
        )
        data['sources'] = MovieSourceSerializer(sources, many=True).data

        related_movies = Movie.objects. \
            filter(genres__in=movie.genres.values_list('pk')). \
            exclude(pk=movie.pk).distinct().order_by('-title')[:4]

        data['related'] = MovieSerializer(related_movies, many=True).data

        return Response(data)

    def list(self, request, *args, **kwargs):
        if(request.GET.get('genre')):
            query = Movie.objects.filter(genres__slug=request.GET.get('genre'))
            genre = Genre.objects.get(slug=request.GET.get('genre'))
            page = self.paginate_queryset(query)
            serializer = MovieSerializer(page, many=True)
            response = self.get_paginated_response(serializer.data)
            response.data['genre'] = GenreSerializer(genre).data
            return response
        if(request.GET.get('collection')):
            query = Movie.objects.filter(
                collection__slug=request.GET.get('collection')
            )
            page = self.paginate_queryset(query)
            serializer = MovieSerializer(page, many=True)
            response = self.get_paginated_response(serializer.data)
            return response
        else:
            return super().list(request, *args, **kwargs)


class SliderSet(viewsets.ModelViewSet):
    queryset = Slider.objects.all()
    serializer_class = SliderSerializer

    def get(self, request, slugSlider):
        slider = Slider.objects.get(slug=slugSlider)
        data = SliderSerializer(slider).data
        items = SliderItem.objects.filter(slider=slider, active=True)\
            .order_by('order')
        data['items'] = SliderItemSerializer(items, many=True).data
        return Response(data)


@api_view(['GET'])
@permission_classes((AllowAny,))
def search(request):
    query = request.GET['q']

    shows = Show.objects.filter(name__contains=query)
    shows_data = ShowSerializer(shows, many=True).data

    movies = Movie.objects.filter(title__contains=query)
    movies_data = MovieSerializer(movies, many=True).data

    return Response({
        "status": "ok",
        "query": query,
        "shows": shows_data,
        "movies": movies_data
    })

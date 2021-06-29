from django.urls import path
from video.views import (
    ShowsViewSet,
    ChapterViewSet,
    MoviesViewSet,
    SliderSet,
    search,
    GenreViewSet,
    CollectionViewSet,
)


urlpatterns = [
    path('shows', ShowsViewSet.as_view({'get': 'list'}), name='show'),
    path(
        'show/<str:slug>',
        ChapterViewSet.as_view({'get': 'getListByShow'}),
        name='chapters-list'
    ),
    path(
        'show/<str:slugShow>/<str:slugChapter>',
        ChapterViewSet.as_view({'get': 'getChapterDetails'}),
        name='source-chapter'
    ),
    path('movies', MoviesViewSet.as_view({'get': 'list'}), name='movies'),
    path(
        'movie/<str:slugMovie>',
        MoviesViewSet.as_view({'get': 'get'}),
        name='movies'
    ),
    path(
        'slider/<str:slugSlider>',
        SliderSet.as_view({'get': 'get'}),
        name='slider'
    ),
    path('search/', search, name='search'),
    path('genres/', GenreViewSet.as_view({'get': 'list'}), name='genres'),
    path(
        'collections/',
        CollectionViewSet.as_view({'get': 'list'}),
        name='collection'
    ),
    path(
        'collections/<str:slugCollection>',
        CollectionViewSet.as_view({'get': 'get'}),
        name='collection'
    ),
]

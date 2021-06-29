from rest_framework import serializers
from video.models import (
    Show,
    Chapter,
    Collection,
    MovieSource,
    ShowSource,
    Genre,
    Movie,
    Slider,
    SliderItem
)
from django.conf import settings


class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ('name', 'slug')


class CollectionSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = Collection
        fields = (
            'name',
            'slug',
            'description',
            'image',
        )

    def get_image(self, collection):
        if collection.image:
            thumbnail = settings.BASE_MEDIA_S3 + str(collection.image)
            return thumbnail
        return None


class MovieSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    genres = GenreSerializer(read_only=True, many=True)

    class Meta:
        model = Movie
        fields = (
            'title',
            'original_title',
            'slug',
            'description',
            'image',
            'duration',
            'genres',
            'release_year',
            'ads_url',
        )

    def get_image(self, movie):
        if movie.image:
            thumbnail = settings.BASE_MEDIA_S3 + str(movie.image)
            return thumbnail
        return None


class ShowSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    genres = GenreSerializer(read_only=True, many=True)

    class Meta:
        model = Show
        fields = (
            'name',
            'slug',
            'description',
            'image',
            'coming_soon',
            'genres',
            'ads_url',
        )

    def get_image(self, show):
        if show.image:
            thumbnail = settings.BASE_MEDIA_S3 + str(show.image)
            return thumbnail
        return None


class ChapterSetializer(serializers.ModelSerializer):
    class Meta:
        model = Chapter
        fields = (
            'slug',
            'name',
            'season',
            'number_chapter',
            'description',
            'id',
            'ads_url',
        )


class ShowSourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShowSource
        fields = (
            'url_source',
            'type_source',
            'server',
            'priority',
            'hls_source',
            'id',
            'label',
        )


class MovieSourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = MovieSource
        fields = (
            'url_source',
            'type_source',
            'server',
            'priority',
            'hls_source',
            'id',
            'label',
        )


class SliderItemSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = SliderItem
        fields = (
            'name',
            'slug',
            'image',
            'type_slider',
            'show',
            'movie',
            'information',
            'button_text_action',
            'url_action',
            'type_slider_action',
            'order',
        )

    def get_image(self, item):
        if item.image:
            thumbnail = settings.BASE_MEDIA_S3 + str(item.image)
            return thumbnail
        return None


class SliderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Slider
        fields = ('name', 'slug')

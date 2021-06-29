from django.contrib import admin
from video.models import (
    Show,
    Chapter,
    Genre,
    Movie,
    Slider,
    SliderItem,
    ShowSource,
    MovieSource,
    Collection,
)


class ShowAdmin(admin.ModelAdmin):
    list_display = ('name', )
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ('name',)


class CollectionAdmin(admin.ModelAdmin):
    list_display = ('name', )
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ('name',)


class ChapterAdmin(admin.ModelAdmin):
    list_display = ('name', 'number_chapter', 'season', 'show')
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ('name',)


class MovieAdmin(admin.ModelAdmin):
    list_display = ('title', )
    prepopulated_fields = {'slug': ('title',)}
    search_fields = ('title',)


class GenreAdmin(admin.ModelAdmin):
    list_display = ('name', )
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ('name',)


class SliderAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ('name',)


class SliderItemAdmin(admin.ModelAdmin):
    list_display = ('name', 'slider', 'type_slider')
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ('name',)


admin.site.register(Collection, CollectionAdmin)
admin.site.register(Show, ShowAdmin)
admin.site.register(Chapter, ChapterAdmin)
admin.site.register(Movie, MovieAdmin)
admin.site.register(Genre, GenreAdmin)
admin.site.register(Slider, SliderAdmin)
admin.site.register(SliderItem, SliderItemAdmin)
admin.site.register(ShowSource)
admin.site.register(MovieSource)

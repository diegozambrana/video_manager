from django.db import models
from django.template.defaultfilters import slugify
import uuid
slug = models.SlugField(null=False, unique=True)


class Collection(models.Model):
    name = models.CharField(max_length=128)
    slug = models.SlugField(null=False, unique=True)
    description = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to="collection", blank=True, null=True)
    active = models.BooleanField(default=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        return super().save(*args, **kwargs)


class Genre(models.Model):
    name = models.CharField(max_length=128)
    slug = models.SlugField(null=False, unique=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        return super().save(*args, **kwargs)


class Show(models.Model):
    name = models.CharField(max_length=128)
    description = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to="shows", blank=True, null=True)
    slug = models.SlugField(null=False, unique=True)
    active = models.BooleanField(default=True)
    coming_soon = models.BooleanField(default=False)
    genres = models.ManyToManyField(Genre, blank=True)
    update_at = models.DateField(auto_now=True)
    ads_url = models.CharField(
        max_length=56, default="", blank=True, null=True)
    collection = models.ManyToManyField(Collection, blank=True, null=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        return super().save(*args, **kwargs)


class Chapter(models.Model):
    name = models.CharField(max_length=128)
    slug = models.SlugField(null=False, unique=True)
    number_chapter = models.IntegerField()
    description = models.TextField(null=True, blank=True)
    season = models.IntegerField()
    show = models.ForeignKey(Show, on_delete=models.CASCADE)
    ads_url = models.CharField(
        max_length=56, default="", blank=True, null=True)

    def __str__(self):
        return "{} [{}x{}] {}".format(self.show.name, self.season,
                                      self.number_chapter, self.name)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name) + '-' + str(uuid.uuid4())[:4]
        return super().save(*args, **kwargs)


class Movie(models.Model):
    title = models.CharField(max_length=256)
    original_title = models.CharField(max_length=256)
    slug = models.SlugField(null=False, unique=True)
    description = models.TextField(null=True, blank=True)
    image = models.ImageField(upload_to="movies", blank=True, null=True)
    duration = models.IntegerField(default=0)
    genres = models.ManyToManyField(Genre, blank=True)
    release_year = models.DateField(null=True, blank=True)
    is_short = models.BooleanField(default=False)
    update_at = models.DateField(auto_now=True)
    ads_url = models.CharField(
        max_length=56, default="", blank=True, null=True)
    collection = models.ManyToManyField(Collection, blank=True, null=True)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        return super().save(*args, **kwargs)


class SourceBase(models.Model):

    class TypeChoice(models.TextChoices):
        F = 'F', 'iFrame'

    url_source = models.CharField(max_length=1024)
    type_source = models.CharField(
        max_length=1,
        choices=TypeChoice.choices,
        default=TypeChoice.F
    )
    active = models.BooleanField(default=True)
    server = models.CharField(max_length=128, default="")
    priority = models.IntegerField(default=10)
    hls_source = models.CharField(max_length=512, blank=True, null=True)
    label = models.CharField(max_length=64, blank=True, null=True)


class MovieSource(SourceBase):

    movie = models.ForeignKey(
        Movie,
        on_delete=models.CASCADE,
        blank=True,
        null=True
    )

    def __str__(self):
        return "Server: {} - {}".format(
            self.movie.title,
            self.server,
        )


class ShowSource(SourceBase):

    chapter = models.ForeignKey(
        Chapter,
        on_delete=models.CASCADE,
        blank=True,
        null=True
    )

    def __str__(self):
        return "Server: {} [{}x{}] - {} - {}".format(
            self.chapter.show.name,
            self.chapter.season,
            self.chapter.number_chapter,
            self.chapter.name,
            self.server,
        )


class Slider(models.Model):
    name = models.CharField(max_length=56)
    slug = models.SlugField(null=False, unique=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        return super().save(*args, **kwargs)


class SliderItem(models.Model):

    class TypeChoice(models.TextChoices):
        S = 'S', 'Show'
        M = 'M', 'Movie'
        IN = 'IN', 'Information'

    class TypeActionChoice(models.TextChoices):
        P = 'P', 'POP UP'
        R = 'R', 'Redirect'
        N = 'N', 'Open New Link'

    name = models.CharField(max_length=56)
    slug = models.SlugField(null=False, unique=True)
    slider = models.ForeignKey(Slider, on_delete=models.CASCADE)
    type_slider = models.CharField(
        max_length=2,
        choices=TypeChoice.choices,
        default=TypeChoice.S
    )
    show = models.ForeignKey(
        Show,
        on_delete=models.CASCADE,
        blank=True,
        null=True
    )
    movie = models.ForeignKey(
        Movie,
        on_delete=models.CASCADE,
        blank=True,
        null=True
    )
    information = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to="slider", blank=True, null=True)

    button_text_action = models.CharField(max_length=56, blank=True, null=True)
    url_action = models.CharField(max_length=256, blank=True, null=True)
    type_slider_action = models.CharField(
        max_length=2,
        choices=TypeActionChoice.choices,
        default=TypeActionChoice.R
    )

    active = models.BooleanField(default=True)
    order = models.IntegerField(default=5)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        return super().save(*args, **kwargs)

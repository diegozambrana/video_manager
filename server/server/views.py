from django.shortcuts import render
from django.views.generic import TemplateView


class IndexView(TemplateView):
    def get(self, request, **kwargs):
        return render(request, 'index.html', context=None)

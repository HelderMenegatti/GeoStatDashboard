from django.views.generic import TemplateView
from django.contrib.auth.mixins import LoginRequiredMixin

class Dashboard(LoginRequiredMixin, TemplateView):
    template_name = "dashboard/dashboard.html"
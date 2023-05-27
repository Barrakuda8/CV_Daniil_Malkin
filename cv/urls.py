from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from main.views import EducationModelViewSet, ExperienceModelViewSet, PortfolioLinkModelViewSet, SkillModelViewSet

router = DefaultRouter()
router.register('educations', EducationModelViewSet)
router.register('experiences', ExperienceModelViewSet)
router.register('portfolio_links', PortfolioLinkModelViewSet)
router.register('skills', SkillModelViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include(router.urls)),
]

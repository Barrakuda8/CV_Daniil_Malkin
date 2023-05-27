from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import ListModelMixin
from .models import Education, Experience, PortfolioLink, Skill
from .serializers import EducationModelSerializer, ExperienceModelSerializer, PortfolioLinkModelSerializer, SkillModelSerializer


class EducationModelViewSet(ListModelMixin, GenericViewSet):

    queryset = Education.objects.all()
    serializer_class = EducationModelSerializer


class ExperienceModelViewSet(ListModelMixin, GenericViewSet):

    queryset = Experience.objects.all()
    serializer_class = ExperienceModelSerializer


class PortfolioLinkModelViewSet(ListModelMixin, GenericViewSet):

    queryset = PortfolioLink.objects.all()
    serializer_class = PortfolioLinkModelSerializer


class SkillModelViewSet(ListModelMixin, GenericViewSet):

    queryset = Skill.objects.all()
    serializer_class = SkillModelSerializer

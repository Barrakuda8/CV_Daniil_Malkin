from rest_framework.serializers import ModelSerializer
from .models import Education, Experience, PortfolioLink, Skill


class EducationModelSerializer(ModelSerializer):

    class Meta:
        model = Education
        fields = '__all__'


class ExperienceModelSerializer(ModelSerializer):

    class Meta:
        model = Experience
        fields = '__all__'


class PortfolioLinkModelSerializer(ModelSerializer):

    class Meta:
        model = PortfolioLink
        fields = '__all__'


class SkillModelSerializer(ModelSerializer):

    class Meta:
        model = Skill
        fields = '__all__'
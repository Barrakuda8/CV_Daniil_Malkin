import json
from django.conf import settings
from django.core.management.base import BaseCommand
from main.models import Education, Experience, PortfolioLink, Skill


def load_from_json(file_name):
    with open(f'{settings.BASE_DIR}/json/{file_name}.json', 'r', encoding='utf-8') as json_file:
        return json.load(json_file)


class Command(BaseCommand):

    def handle(self, *args, **options):
        educations = load_from_json('educations')
        experiences = load_from_json('experiences')
        portfolio_links = load_from_json('portfolio_links')
        skills = load_from_json('skills')

        Education.objects.all().delete()
        for education in educations:
            education = Education.objects.create(**education)

        Experience.objects.all().delete()
        for experience in experiences:
            experience = Experience.objects.create(**experience)

        PortfolioLink.objects.all().delete()
        for portfolio_link in portfolio_links:
            portfolio_link = PortfolioLink.objects.create(**portfolio_link)

        Skill.objects.all().delete()
        for skill in skills:
            skill = Skill.objects.create(**skill)
            
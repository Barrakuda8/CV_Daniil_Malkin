from django.db import models


class Education(models.Model):

    start_date = models.JSONField()
    end_date = models.JSONField()
    program = models.JSONField()
    institution = models.JSONField()
    city = models.JSONField()
    country = models.JSONField()
    comment = models.JSONField()


class Experience(models.Model):

    start_date = models.JSONField()
    end_date = models.JSONField()
    position = models.JSONField()
    organisation = models.JSONField()
    city = models.JSONField()
    country = models.JSONField()
    comment = models.JSONField()


class PortfolioLink(models.Model):

    link = models.CharField(max_length=64)
    name = models.JSONField()
    comment = models.JSONField()

class Skill(models.Model):

    LANGUAGE = 'language'
    PROGRAMMING = 'programming'
    PERSONAL = 'personal'

    TYPES = {
        (LANGUAGE, 'Language'),
        (PROGRAMMING, 'Programming'),
        (PERSONAL, 'Personal')
    }

    name = models.JSONField()
    type = models.CharField(choices=TYPES, max_length=32)
    comment = models.JSONField()


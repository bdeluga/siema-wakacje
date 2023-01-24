from django.db import models
from django.contrib.auth.models import User

class City(models.Model):
    name = models.CharField(max_length=255)
    country = models.CharField(max_length=255)
    population = models.IntegerField()
    latitude = models.FloatField()
    longitude = models.FloatField()

    def __str__(self):
        return self.name

class Place(models.Model):
    PLACE_TYPE = [
        ('National Park', 'National Park'),
        ('Club', 'Club'),
        ('Sports Facility', 'Sports Facility'),
        ('Museum', 'Museum'),
        ('Restaurant', 'Restaurant'),
        ('Hotel', 'Hotel')
    ]
    name = models.CharField(max_length=255)
    description = models.TextField()
    address = models.CharField(max_length=255)
    image = models.URLField()
    website = models.URLField(blank=True)
    city = models.ForeignKey(City, on_delete=models.CASCADE)
    place_type = models.CharField(max_length=20, choices=PLACE_TYPE)

    def __str__(self):
        return self.name

class Opening_hours(models.Model):
    DAYS_OF_WEEK = [
        (0, 'Monday'),
        (1, 'Tuesday'),
        (2, 'Wednesday'),
        (3, 'Thursday'),
        (4, 'Friday'),
        (5, 'Saturday'),
        (6, 'Sunday')
    ]
    place = models.ForeignKey(Place, on_delete=models.CASCADE)
    day_of_week = models.IntegerField(choices=DAYS_OF_WEEK)
    open_time = models.TimeField()
    close_time = models.TimeField()

    def __str__(self):
        return str(self.day_of_week)

class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    place = models.ForeignKey(Place, on_delete=models.CASCADE)
    rating = models.IntegerField()
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.comment
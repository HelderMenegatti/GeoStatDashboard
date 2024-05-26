from django.db import models

class State(models.Model):
    name = models.CharField(max_length=100)
    region = models.CharField(max_length=100)
    uf = models.CharField(max_length=2)

    def __str__(self):
        return self.name

class County(models.Model):
    name = models.CharField(max_length=100)
    state = models.ForeignKey(State, related_name='counties', on_delete=models.CASCADE)

    def __str__(self):
        return self.name
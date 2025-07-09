from django.db import models
from django.contrib.auth.models import User
class Form(models.Model):
    name = models.CharField(max_length=100, default="Untitled")
    createdBy = models.ForeignKey(User, on_delete=models.CASCADE)

class Question(models.Model):
    form = models.ForeignKey(Form, on_delete=models.CASCADE , related_name='questions')
    question = models.CharField(default="Untitled")
    type = models.CharField(max_length=50, choices=[
        ('Text', 'Text'),
        ('Multiple Choice', 'Multiple Choice'),
        ('Checkbox', 'Checkbox')
    ], default='Text')

class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='choices')
    text = models.CharField(default="Untitled", max_length=100)


class Answer(models.Model):
    response = models.ForeignKey('Response', on_delete=models.CASCADE, related_name='answers')
    question = models.ForeignKey(Question , on_delete=models.CASCADE, related_name='answers',)
    answerText = models.TextField()

class Response(models.Model):
    form = models.ForeignKey(Form, on_delete=models.CASCADE)
    answeredBy = models.ForeignKey(User, on_delete=models.CASCADE, default=None)


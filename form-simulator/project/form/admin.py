from django.contrib import admin
from .models import Form, Question, Answer, Response, Choice

admin.site.register(Form)
admin.site.register(Question)
admin.site.register(Answer)
admin.site.register(Response)
admin.site.register(Choice)



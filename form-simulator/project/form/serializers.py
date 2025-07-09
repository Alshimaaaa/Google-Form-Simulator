from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Form, Question, Answer, Response, Choice

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email"]

class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
        fields = ['id', 'text']

class QuestionSerializer(serializers.ModelSerializer):
    choices = ChoiceSerializer(many=True)
    
    class Meta:
        model = Question
        fields = ['id',  'question', 'type', 'choices']

class FormSerializer(serializers.ModelSerializer):
    createdBy = UserSerializer(read_only=True)
    questions = QuestionSerializer(many=True)
    class Meta:
        model = Form
        fields = ['id', 'name', 'createdBy', 'questions']
        read_only_fields = ['createdBy']
    def create(self, data):
        questionss= data.pop('questions')
        form = Form.objects.create(**data)

        for question in questionss:
            choices= question.pop('choices', [])
            question = Question.objects.create(form=form, **question)
            for choice in choices:
                Choice.objects.create(question=question, **choice)
        return form

class AnswerSerializer(serializers.ModelSerializer):
    question = serializers.PrimaryKeyRelatedField(read_only=False, queryset=Question.objects.all())
    questionText = serializers.CharField(source='question.question', read_only=True)
    class Meta:
        model = Answer
        fields = [ 'answerText', 'question', 'questionText'] 
        read_only_fields = ['response']

class ResponseSerializer(serializers.ModelSerializer):
    answers = AnswerSerializer(many=True)
    answeredBy = UserSerializer(read_only=True)
    class Meta:
        model = Response
        fields = ['id', 'form', 'answeredBy', 'answers']
        read_only_fields = ['answeredBy']
    def create(self,data):
        answerss= data.pop('answers')
        response = Response.objects.create( form= data['form'], answeredBy=self.context['request'].user)
        for answer in answerss:
            question = answer.pop('question')
            Answer.objects.create(response=response, question=question, **answer)
        return response


class SignUpSerializer(serializers.Serializer):
    username = serializers.CharField()
    email = serializers.EmailField()
    password = serializers.CharField()

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()


class SubmitAnswerSerializer(serializers.Serializer):
    question = serializers.IntegerField()
    answer_text = serializers.CharField()

class SubmitResponseSerializer(serializers.Serializer):
    form = serializers.IntegerField()
    answers = SubmitAnswerSerializer(many=True)

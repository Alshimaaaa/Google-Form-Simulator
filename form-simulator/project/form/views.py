from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.response import Response as response
from rest_framework.decorators import api_view
from .models import Form, Question, Answer, Response
from . import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from drf_yasg.utils import swagger_auto_schema



class FormViewSet(viewsets.ModelViewSet):
    queryset = Form.objects.all()
    serializer_class = serializers.FormSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Form.objects.filter(createdBy=self.request.user)
    def perform_create(self, serializer):
        serializer.save(createdBy=self.request.user)

class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = serializers.QuestionSerializer


class AnswerViewSet(viewsets.ModelViewSet):
    queryset = Answer.objects.all()
    serializer_class = serializers.AnswerSerializer

class ResponseViewSet(viewsets.ModelViewSet):
    queryset = Response.objects.all()
    serializer_class = serializers.ResponseSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        return Response.objects.filter(form__createdBy=self.request.user)

    def perform_create(self, serializer):
        serializer.save(answeredBy=self.request.user)

@swagger_auto_schema(method='post', request_body=serializers.SignUpSerializer)
@api_view(['POST'])
def signUp(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')
    if User.objects.filter(username=username).exists():
        return response({'message': 'Username already exists.'},status=400)
    user = User.objects.create_user(username=username, password=password, email=email)
    return response({'message': 'User registered successfully.'},status=201)


@swagger_auto_schema(method='post', request_body=serializers.LoginSerializer)
@api_view(['POST'])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    try:
        user = User.objects.get(username=username)
    except User.DoesNotExist:
        return response({'message': 'User does not exist'}, status=404)

    if not user.check_password(password):
        return response({'message': 'Incorrect password'}, status=400)
    refresh = RefreshToken.for_user(user)
    return response({
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    })



@swagger_auto_schema(method='post', request_body=serializers.SubmitResponseSerializer)
@api_view(['POST'])
def submitResponse(request):
    form = request.data.get('form')
    if not Form.objects.filter(id=form).exists():
        return response({'Error': 'Form does not exist'}, status=404)
    form = Form.objects.get(id=form)
    responseObj = Response.objects.create(form=form, answeredBy=request.user)
    answers = request.data.get('answers')
    for answer in answers:
        question = answer.get('question')
        text = answer.get('answer')
        if not Question.objects.filter(id=question, form=form).exists():
            return response({'Error': 'This question does not exist in this form.'}, status=400)
        answerObj = Answer.objects.create(response=responseObj, answerText=text)
    return response({'Message': 'Response submitted successfully!'}, status=201)


@api_view(['GET'])
def viewAllForms(request):
    forms = Form.objects.exclude(createdBy=request.user)
    serializer = serializers.FormSerializer(forms, many=True)
    return response(serializer.data)

@api_view(['GET'])
def getForm(request, pk):
    form = get_object_or_404(Form, pk=pk)
    serializer = serializers.FormSerializer(form)
    return response(serializer.data)

@api_view(['GET'])
def viewResponses(request, id):
    form = get_object_or_404(Form, pk=id)
    responses = Response.objects.filter(form=form)
    serializer = serializers.ResponseSerializer(responses, many=True)
    return response(serializer.data)



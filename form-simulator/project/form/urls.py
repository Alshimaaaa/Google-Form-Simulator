from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register('forms', views.FormViewSet)
router.register('questions', views.QuestionViewSet)
router.register('answers', views.AnswerViewSet)
router.register('responses', views.ResponseViewSet)

urlpatterns = [
    path('signUp/', views.signUp, name='signUp'),
    path('login/', views.login, name='login'),
    path('createForm/', views.FormViewSet.as_view({'post': 'create'}), name='createForm'),
    path('viewMyForms/', views.FormViewSet.as_view({'get': 'list'}), name='viewMyForms'),
    path('viewForm/<int:pk>/', views.getForm, name='viewForm'),
    path('viewAllForms/', views.viewAllForms, name='viewAllForms'),
    path('submitResponse/', views.ResponseViewSet.as_view({'post': 'create'}), name='submitResponse'),
    path('viewResponses/<int:id>/', views.viewResponses, name='viewResponses'),
    path('', include(router.urls)),

]


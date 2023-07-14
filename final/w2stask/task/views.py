from django.shortcuts import render

# Create your views here.
from rest_framework import permissions
from .models import User
from rest_framework.authentication import BasicAuthentication, TokenAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializer import *
from rest_framework import status, generics


class AuthUserRegistrationView(APIView):
    serializer_class = UserRegistrationSerializer
    permission_classes = (AllowAny, )

    def post(self, request):
        print("ssssssssss",request.data)
        serializer = self.serializer_class(data=request.data)
        valid = serializer.is_valid(raise_exception=True)
        if valid:
            serializer.save()
            status_code = status.HTTP_201_CREATED

            response = {
                'success': True,
                'statusCode': status_code,
                'message': 'User successfully registered!',
                'user': serializer.data
            }

            return Response(response)
    def get (self,request):
        value=User.objects.all()
        serializer=UserRegistrationSerializer(value,many=True)
        value=serializer.data
        # status_code = status.HTTP_200
        response = {
                'success': True,
                # 'statusCode': status_code,
                'message': 'User get succesfully',
                'user': value
            }

        return Response(response)

class AuthUserLoginView(APIView):
    serializer_class = UserLoginSerializer
    permission_classes = (AllowAny, )

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        valid = serializer.is_valid(raise_exception=True)
        # data = copy.deepcopy(serializer.data)
        data =serializer.data   
        print("oooooooooooooooooo",data) 
        username = data['email'].split('@')[0]
        if valid:
            status_code = status.HTTP_200_OK
            response = {
                'success': True,
                'statusCode': status_code,
                'message': 'User logged in successfully',
                'accessToken': data['access'],
                'refresh': data['refresh'],
                'email': data['email'],
                'role': data['role'],
                'username':username
            
                }
            return Response(response, status=status_code)
        return Response( 'status')


class TaskApiView(APIView):
    serializer_class = TaskSerializer
    permission_classes = (AllowAny, )
    # permission_classes = [permissions.Allowany]

    def get(self,request,Pk=None,*args, **kwargs):
        if Pk:
            try:
                task = Task.objects.get(id=Pk)

                serializer = TaskSerializer(task)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Task.DoesNotExist:
                return Response('Task not found', status=status.HTTP_404_NOT_FOUND)
        else:
            task = Task.objects.all()
            serializer = TaskSerializer(task, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request,*args, **kwargs):
        # data = {
        #     'title': request.data.get('title'), 
        #     'description': request.data.get('description'), 
        #     'completed': request.data.get('completed'), 
        #     'user': request.user.id
        # }
        print("uuuuuuuuuuuuuuuu",request.data)
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def put(self, request, Pk, *args, **kwargs):
        task_instance = self.get_object(Pk, request.user.id)
        if not task_instance:
            return Response(
                {"res": "Object with todo id does not exists"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        data = {
            'completed': True, 
            'user': request.user.id
        }
        serializer = TaskSerializer(instance = task_instance, data=data, partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, Pk):
        try:
            task = Task.objects.get(id=Pk)
            task.delete()
            return Response('Task deleted successfully', status=status.HTTP_204_NO_CONTENT)
        except Task.DoesNotExist:
            return Response('Task not found', status=status.HTTP_404_NOT_FOUND)
        
class emp_name(APIView):
    serializer_class = userviewser
    permission_classes = (AllowAny, )

    def get(self,request):
        all_instances = User.objects.filter(role='employee')
        column_values = all_instances.values_list('email', flat=True)
        return Response(column_values)

class emp_uni_task(APIView):
    serializer_class = TaskSerializer
    permission_classes = (AllowAny, )

    def get(self,request):
        email = request.GET.get('email')
        print("rrrrrrrrrrr",email)
        task_list = Task.objects.filter(Assigent_employeename=str(email))
        # task_list = Task.objects.filter(Assigent_employeename='test1@gmail.com')
        print("fffffffffffffffffffff",task_list)
        serializer = TaskSerializer(task_list, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
        
class dash_user_count(APIView):
    serializer_class = userviewser
    permission_classes = (AllowAny, )   
    def get(self, request):
        count_list = []
        distinct_values = User.objects.values('role').distinct()
        for value in distinct_values:
            count = User.objects.filter(role=value['role']).count()
            count_list.append({"Role": value['role'], 'count': count})
        return Response(count_list)
    

class sheculeTASK(APIView):
    serializer_class = TaskSerializer
    permission_classes = (AllowAny, )

    def get(self,request):
        email = request.GET.get('email')
        print("rrrrrrrrrrr",email)
        task_list = Task.objects.filter(Assigent_employeename=str(email)).last()
        print("fffffffffffffffffffff",task_list)
        serializer = TaskSerializer(task_list, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

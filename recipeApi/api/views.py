from api.models import Recipe, Ingredient, RecipeIngredientLink, RecipeStep, Unit
from api.serializers import RecipeSerializer, IngredientSerializer, UnitSerializer
from rest_framework import generics, permissions
from rest_framework.response import Response
import json


#Create and List
class RecipeList(generics.ListCreateAPIView):
    #overrides and settings
    permission_classes = [permissions.AllowAny]
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer

    def list(self, request):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    def perform_create(self, serializer):
        # if self.request.user.is_authenticated:
        #     recipeObj = serializer.save(author=self.request.user)
        # else:
        #     recipeObj = serializer.save(author=None)
        try:
            image = self.request.data['image']
        except:
            image = None
        data = json.loads(self.request.data['fields'])
        ingredients = data['ingredients']
        steps = data['steps']
        recipeObj = serializer.save(
            author=None,
            title=data['title'],
            description=data['description'],
            image=image
        )
        # get list of ingredients from request, and add them to link table
        try:
            for ingredient in ingredients:
                unitObj = Unit.objects.get(id=ingredient['unitId'])
                ingredientObj = Ingredient.objects.get(
                    id=ingredient['ingredientId'])
                recipeIngredientLink = RecipeIngredientLink(
                    recipe=recipeObj,
                    ingredient=ingredientObj,
                    unit=unitObj,
                    quantity=ingredient['quantity'],)
                recipeIngredientLink.save()
        except ValueError:
            print('no ingredients')

        # get list of steps from request, and add them to link table
        try:
            for step in steps:
                recipeStep = RecipeStep(
                    recipe=recipeObj, number=step['number'], instruction=step['instruction'])
                recipeStep.save()
        except ValueError:
            print('no steps')


# Retrieve, Update, and Destroy
class RecipeDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    def perform_update(self, serializer):
        try:
            image = self.request.data['image']
        except:
            image = None
        data = json.loads(self.request.data['fields'])
        ingredients = data['ingredients']
        steps = data['steps']
        recipeObj = serializer.save(
            author=None,
            title=data['title'],
            description=data['description'],
            image=image
        )

class IngredientList(generics.ListCreateAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer


class IngredientDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer



class UnitList(generics.ListCreateAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Unit.objects.all()
    serializer_class = UnitSerializer
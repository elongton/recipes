from api.models import Recipe, Ingredient, RecipeIngredientLink
from api.serializers import RecipeSerializer, IngredientSerializer
from rest_framework import generics, permissions
from rest_framework.response import Response


#Create and List
class RecipeList(generics.ListCreateAPIView):
    #overrides and settings
    permission_classes = [permissions.AllowAny]
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer

    # custom vars
    # ingredientsList = Ingredient.objects.all()
    def list(self, request):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)


    def perform_create(self, serializer):
        if self.request.user.is_authenticated:
            recipeItem = serializer.save(author=self.request.user)
        else:
            recipeItem = serializer.save(author=None)

        #get list of ingredients from request, and add them to link table
        for ingredient in self.request.data['ingredients']:
            ingredientObj = Ingredient.objects.get(
                id=ingredient['ingredientId'])
            tempLink = RecipeIngredientLink(
                recipe=recipeItem, ingredient=ingredientObj)
            tempLink.save()


# Retrieve, Update, and Destroy
class RecipeDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer


class IngredientList(generics.ListCreateAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer


class IngredientDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer

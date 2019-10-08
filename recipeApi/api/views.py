from api.models import Recipe, Ingredient, RecipeIngredientLink
from api.serializers import RecipeSerializer, IngredientSerializer
from rest_framework import generics, permissions


#Create and List
class RecipeList(generics.ListCreateAPIView):
    #overrides and settings
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer

    # custom vars
    # ingredientsList = Ingredient.objects.all()

    def perform_create(self, serializer):
        recipeItem = serializer.save(author=self.request.user)
        for ingredient in self.request.data['ingredients']:
            ingredientObj = Ingredient.objects.get(
                id=ingredient['ingredientId'])
            tempLink = RecipeIngredientLink(
                recipe=recipeItem, ingredient=ingredientObj)
            tempLink.save()


# Retrieve, Update, and Destroy
class RecipeDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer


class IngredientList(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer


class IngredientDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer

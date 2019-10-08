from api.models import Recipe, Ingredient
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
        serializer.save(author=self.request.user)
        for ingredient in self.request.data['ingredients']:
            print(Ingredient.objects.get(id=ingredient['ingredientId']))


# Retrieve, Update, and Destroy
class RecipeDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer


class IngredientList(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer

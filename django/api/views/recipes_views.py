from api.models import (Recipe, 
                        RecipeIngredientLink, 
                        RecipeStep, )
from api.serializers import (RecipeSerializer,)
from rest_framework import generics, permissions, status
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from ..helpers.recipe_helpers import *
import json




#Create and List
class RecipeList(generics.ListCreateAPIView):
    #overrides and settings
    permission_classes = [permissions.AllowAny]
    # authentication_classes = [SessionAuthentication]
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer

    def list(self, request):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    def perform_create(self, serializer):
        print(serializer.validated_data)
        print('trying trying trying')
        try:
            image = self.request.data['imageToUpload']
        except:
            image = None
        data = json.loads(self.request.data['fields'])
        ingredient_sections = data['ingredient_sections']
        steps = data['steps']
        tags = data['tags']
        recipeObj = serializer.save(
            author=None,
            title=data['title'],
            description=data['description'],
            notes = data['notes'],
        )

        recipeObj.image = image
        recipeObj.save()
        # ingredient sections
        try:
            for ingredient_section in ingredient_sections:
                recipeSectionObj = create_recipe_ingredient_section(ingredient_section, recipeObj)
                for ingredient in ingredient_section['ingredients']:
                    create_ingredient_link(ingredient, recipeSectionObj)
        except ValueError:
            print('no ingredients, or issue creating')
        # get list of steps from request, and add them to link table
        try:
            for step in steps:
                create_step_link(recipeObj, step)
        except ValueError:
            print('no steps, or issue creating')

        try:
            for tag in tags:
                create_tag_link(tag, recipeObj)
        except ValueError:
            print('no tags, or issue creating')


# Retrieve, Update, and Destroy
class RecipeDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    def perform_update(self, serializer):
        data = json.loads(self.request.data['fields'])
        ingredient_sections = data['ingredient_sections']
        steps = data['steps']
        tags = data['tags']

        pk = self.request.parser_context['kwargs']['pk']
        existingImage = Recipe.objects.get(id=pk).image
        image = self.request.data['imageToUpload']
        
        # update top level fields
        recipeObj = serializer.save(
            author=None,
            title=data['title'],
            description=data['description'],
            notes=data['notes'],
        )
        # handle image upload
        if not image:
            recipeObj = serializer.save(image = existingImage)
        else:
            recipeObj = serializer.save(image = image)


        # print(recipeObj.image.url)
        # delete and then create new set of ingredients
        delete_recipe_ingredient_sections(recipeObj)
        for ingredient_section in ingredient_sections:
            recipeSectionObj = create_recipe_ingredient_section(ingredient_section, recipeObj)
            for ingredient in ingredient_section['ingredients']:
                create_ingredient_link(ingredient, recipeSectionObj)
        # delete and then create new set of steps
        delete_recipe_step_links(recipeObj)
        for step in steps:
            create_step_link(recipeObj, step)

        # delete and then create new set of tags
        delete_recipe_tag_links(recipeObj)
        try:
            for tag in tags:
                create_tag_link(tag, recipeObj)
        except ValueError:
            print('no tags, or issue creating')



# class RecipeList(APIView):
#     permission_classes = [permissions.AllowAny]
#     # authentication_classes=[SessionAuthentication]
#     def get(self, request, fomrat=None):
#         responseData = []
#         return Response(responseData, status=status.HTTP_201_CREATED)
#     def post(self, request, format=None):
#         print('trying trying trying')
#         try:
#             image = self.request.data['image']
#             print('got the image')
#         except:
#             image = None
#         data = json.loads(self.request.data['fields'])
#         ingredient_sections = data['ingredient_sections']
#         steps = data['steps']
#         tags = data['tags']
#         recipeObj = Recipe(
#             author=None,
#             title=data['title'],
#             description=data['description'],
#             notes = data['notes'],
#             image=image
#         )
#         recipeObj.save()
#         # ingredient sections
#         try:
#             for ingredient_section in ingredient_sections:
#                 recipeSectionObj = create_recipe_ingredient_section(ingredient_section, recipeObj)
#                 for ingredient in ingredient_section['ingredients']:
#                     create_ingredient_link(ingredient, recipeSectionObj)
#         except ValueError:
#             print('no ingredients, or issue creating')
#         # get list of steps from request, and add them to link table
#         try:
#             for step in steps:
#                 create_step_link(recipeObj, step)
#         except ValueError:
#             print('no steps, or issue creating')

#         try:
#             for tag in tags:
#                 create_tag_link(tag, recipeObj)
#         except ValueError:
#             print('no tags, or issue creating')

#         responseData = 'success'
#         return Response(responseData, status=status.HTTP_202_ACCEPTED)
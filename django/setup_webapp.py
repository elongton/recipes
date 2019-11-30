import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'recipeApi.settings')

import django
django.setup()

from api.models import User

if not User.objects.filter(username='elongton').exists(): #if the user does not exist
    user = User.objects.create_superuser(username='elongton', email="", password='M3087puttie')
    user.save()
    print('(ADDED) ' + str(user))
else:
    user = User.objects.get(username='elongton')
    print(str(user))
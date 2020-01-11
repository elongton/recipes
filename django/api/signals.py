from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import User, UserData


@receiver(post_save, sender=User)
def create_user_meta(sender, instance, created, **kwargs):
    if created:
        UserData.objects.create(
        user=instance, 
        meta={"viewed_recipes": []},
        recipe_book={"recipes": []},
        shopping_list={"recipes": []},
        meal_planner={"date_range": None, "recipes": []}
        )
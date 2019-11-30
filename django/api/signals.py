from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import User, UserMeta


@receiver(post_save, sender=User)
def create_user_meta(sender, instance, created, **kwargs):
    print('create_user_meta fired')
    if created:
        UserMeta.objects.create(user=instance)
# Generated by Django 3.0.1 on 2019-12-27 20:39

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_userdata_shopping_cart'),
    ]

    operations = [
        migrations.RenameField(
            model_name='userdata',
            old_name='shopping_cart',
            new_name='shopping_list',
        ),
    ]

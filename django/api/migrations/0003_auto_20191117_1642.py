# Generated by Django 2.2.6 on 2019-11-17 16:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_auto_20191117_1029'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='recipeingredientlink',
            name='quantity',
        ),
        migrations.AddField(
            model_name='recipeingredientlink',
            name='ingredient_quantity',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='recipeingredientlink',
            name='recipe_quantity',
            field=models.FloatField(blank=True, null=True),
        ),
    ]

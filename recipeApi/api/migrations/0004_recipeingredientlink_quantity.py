# Generated by Django 2.2.6 on 2019-10-11 03:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_auto_20191010_1441'),
    ]

    operations = [
        migrations.AddField(
            model_name='recipeingredientlink',
            name='quantity',
            field=models.FloatField(default=1),
            preserve_default=False,
        ),
    ]

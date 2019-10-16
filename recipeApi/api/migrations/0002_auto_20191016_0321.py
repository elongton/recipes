# Generated by Django 2.2.6 on 2019-10-16 03:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ingredient',
            name='unitType',
            field=models.CharField(choices=[('W', 'Wet'), ('D', 'Dry'), ('P', 'Poultry'), ('S', 'Singular')], default='D', max_length=1),
        ),
    ]

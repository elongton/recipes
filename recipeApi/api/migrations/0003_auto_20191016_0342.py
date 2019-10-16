# Generated by Django 2.2.6 on 2019-10-16 03:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_auto_20191016_0321'),
    ]

    operations = [
        migrations.AlterField(
            model_name='unit',
            name='unitType',
            field=models.CharField(choices=[('W', 'Wet'), ('D', 'Dry'), ('P', 'Poultry'), ('S', 'Singular')], default='D', max_length=1),
        ),
    ]

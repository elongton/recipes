# Generated by Django 2.2.6 on 2019-10-27 01:21

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_auto_20191026_2109'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='unit',
            name='base_unit',
        ),
        migrations.AddField(
            model_name='unittype',
            name='base_unit',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='base_unit', to='api.Unit'),
        ),
    ]

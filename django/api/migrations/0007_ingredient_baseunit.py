# Generated by Django 2.2.6 on 2019-10-21 00:57

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_auto_20191016_0436'),
    ]

    operations = [
        migrations.AddField(
            model_name='ingredient',
            name='baseUnit',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='unit', to='api.Unit'),
        ),
    ]

# Generated by Django 2.2.1 on 2019-05-05 22:03

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('trip', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='trip',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='trip',
            name='updated_at',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.CreateModel(
            name='TripUser',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('role', models.CharField(choices=[('owner', 'Owner'), ('collaborator', 'Collaborator')], max_length=100, verbose_name='role')),
                ('trip', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='trip.Trip')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'trip user',
                'verbose_name_plural': 'trips users',
                'db_table': 'trip_trip_user',
            },
        ),
        migrations.AddField(
            model_name='trip',
            name='users',
            field=models.ManyToManyField(related_name='trips', through='trip.TripUser', to=settings.AUTH_USER_MODEL),
        ),
    ]

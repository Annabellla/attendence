# Generated by Django 2.0.3 on 2018-03-28 08:47

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Users',
            fields=[
                ('aid', models.AutoField(primary_key=True, serialize=False)),
                ('addr', models.CharField(max_length=100)),
                ('account', models.CharField(max_length=16)),
                ('password', models.CharField(max_length=16)),
            ],
        ),
    ]

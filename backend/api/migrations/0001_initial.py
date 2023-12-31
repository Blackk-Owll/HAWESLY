# Generated by Django 4.1.4 on 2022-12-30 18:21

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Admin',
            fields=[
                ('adminId', models.AutoField(primary_key=True, serialize=False)),
                ('email', models.EmailField(max_length=100)),
                ('mdps', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Annonce',
            fields=[
                ('annonceId', models.AutoField(primary_key=True, serialize=False)),
                ('description', models.TextField()),
                ('adresse', models.CharField(max_length=500)),
                ('categorie', models.CharField(choices=[('VNT', 'vente'), ('ECG', 'echange'), ('LCT', 'locatio'), ('LCV', 'location pour vacance')], default='VNT', max_length=3)),
                ('date', models.DateField(auto_now=True)),
                ('mapX', models.IntegerField()),
                ('mapY', models.IntegerField()),
                ('zoom', models.FloatField()),
            ],
        ),
        migrations.CreateModel(
            name='Photo',
            fields=[
                ('photoId', models.AutoField(primary_key=True, serialize=False)),
                ('url', models.CharField(max_length=500)),
            ],
        ),
        migrations.CreateModel(
            name='Position',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('x', models.IntegerField()),
                ('y', models.IntegerField()),
                ('zoom', models.FloatField()),
            ],
        ),
        migrations.CreateModel(
            name='Type',
            fields=[
                ('typeId', models.AutoField(primary_key=True, serialize=False)),
                ('type', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('userId', models.AutoField(primary_key=True, serialize=False)),
                ('username', models.CharField(max_length=100)),
                ('email', models.EmailField(max_length=100)),
                ('password', models.CharField(max_length=100)),
                ('nom', models.CharField(max_length=200)),
                ('prenom', models.CharField(max_length=200)),
                ('phone', models.DecimalField(decimal_places=10, max_digits=10)),
            ],
        ),
        migrations.CreateModel(
            name='Wilaya',
            fields=[
                ('wilayaId', models.AutoField(primary_key=True, serialize=False)),
                ('nom', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='MessgeOffre',
            fields=[
                ('messgeOffreId', models.AutoField(primary_key=True, serialize=False)),
                ('Annonce', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.annonce')),
                ('emetteur', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='api.user')),
            ],
        ),
        migrations.CreateModel(
            name='Favori',
            fields=[
                ('favoriId', models.AutoField(primary_key=True, serialize=False)),
                ('annonce', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.annonce')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.user')),
            ],
        ),
        migrations.CreateModel(
            name='Commune',
            fields=[
                ('communeId', models.AutoField(primary_key=True, serialize=False)),
                ('nom', models.CharField(max_length=100)),
                ('wilaya', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.wilaya')),
            ],
        ),
        migrations.AddField(
            model_name='annonce',
            name='commune',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.commune'),
        ),
        migrations.AddField(
            model_name='annonce',
            name='type',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.type'),
        ),
        migrations.AddField(
            model_name='annonce',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.user'),
        ),
        migrations.AddField(
            model_name='annonce',
            name='wilaya',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.wilaya'),
        ),
    ]

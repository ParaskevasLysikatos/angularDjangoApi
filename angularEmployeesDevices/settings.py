"""
Django settings for angularEmployeesDevices project.

Generated by 'django-admin startproject' using Django 4.0.

For more information on this file, see
https://docs.djangoproject.com/en/4.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.0/ref/settings/
"""

import django_heroku
from pathlib import Path
import os
# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'dddd'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['*']


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'corsheaders',
    'EmployeesDevicesApi',
    'storages'
   
]

# If this is used then `CORS_ORIGIN_WHITELIST` will not have any effect
CORS_ORIGIN_ALLOW_ALL = True
CORS_ALLOW_CREDENTIALS = True

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.http.ConditionalGetMiddleware',
    'django.middleware.common.CommonMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    #'django.middleware.csrf.CsrfViewMiddleware',
    'corsheaders.middleware.CorsPostCsrfMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'angularEmployeesDevices.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'angularEmployeesDevices.wsgi.application'


REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': (
    # 'rest_framework.permissions.IsAuthenticated',
    'rest_framework.permissions.AllowAny',
    # 'rest_framework.permissions.IsAdminUser',
    #  'rest_framework.permissions.IsAuthenticatedOrReadOnly',
    # 'rest_framework.permissions.DjangoModelPermissions',

     ),
    # 'DEFAULT_RENDERER_CLASSES': (
    #         'rest_framework.renderers.JSONRenderer',
    #)
   	'DEFAULT_AUTHENTICATION_CLASSES': [
           # 'rest_framework.authentication.TokenAuthentication',
        ]
}


# Database
# https://docs.djangoproject.com/en/4.0/ref/settings/#databases

# DATABASES = {
#    'default': {
#             'ENGINE': 'django.db.backends.postgresql_psycopg2',
#         'NAME': 'test', 
#         'USER': 'postgres', 
#         'PASSWORD': '1',
#         'HOST': '127.0.0.1', 
#         'PORT': '5432',
#         }
# }


DATABASES = {
    'default': {
            'ENGINE': 'django.db.backends.postgresql_psycopg2',
            'NAME': 'dddd',
            'USER': 'ddd',
            'PASSWORD': 'dddd',
            'HOST': 'ec2-18-202-156-92.eu-west-1.compute.amazonaws.com',
            'PORT': '5432',
        }
    }


# Password validation
# https://docs.djangoproject.com/en/4.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    # {
    #     'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    # },
    # {
    #     'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    # },
]


# Internationalization
# https://docs.djangoproject.com/en/4.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.0/howto/static-files/

# STATIC_URL = 'static/'
# STATIC_ROOT = os.path.join(BASE_DIR,  'angularEmployeesDevices/static')

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Static files(CSS, JavaScript, Images)
# https: //docs.djangoproject.com/en/1.9/howto/static-files/

# STATIC_ROOT = os.path.join(BASE_DIR, 'static')
# STATIC_URL = '/static/'
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# # Extra placesfor collectstatic to find static files.
# STATICFILES_DIRS = (
#     os.path.join(BASE_DIR, 'static'),
# )

#USE_S3 = os.getenv('USE_S3') == 'TRUE'
USE_S3=True


if USE_S3:
    # aws settings
   
    # s3 static settings
    # STATIC_LOCATION='static'
    # AWS_LOCATION = 'static'
    # STATIC_URL = f'https://{AWS_S3_CUSTOM_DOMAIN}/{STATIC_LOCATION}/'
    # STATICFILES_STORAGE = 'EmployeesDevicesApi.storage_backends.StaticStorage'
    # s3 public media settings
    PUBLIC_MEDIA_LOCATION = 'media'
    MEDIA_URL = f'https://{AWS_S3_CUSTOM_DOMAIN}/{PUBLIC_MEDIA_LOCATION}/'
    DEFAULT_FILE_STORAGE = 'EmployeesDevicesApi.storage_backends.PublicMediaStorage'
else:
   
    MEDIA_URL = '/mediafiles/'
    MEDIA_ROOT = os.path.join(BASE_DIR, 'mediafiles')

STATIC_URL = '/staticfiles/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATICFILES_DIRS = (os.path.join(BASE_DIR, 'static'),)




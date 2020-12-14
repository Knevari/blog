from django.db import models
from django.conf import settings
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth.models import User


class OwnerModel(models.Model):
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )

    class Meta:
        abstract = True


class Tag(models.Model):
    title = models.CharField(
        _('tag title'),
        max_length=50,
        blank=False,
        null=False
    )

    def __str__(self):
        return self.title


class Post(OwnerModel):
    tag = models.ManyToManyField(Tag, blank=True)

    title = models.CharField(
        _("post title"),
        max_length=200,
        blank=False,
        null=False
    )

    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class Comment(OwnerModel):
    post = models.ForeignKey(
        Post,
        on_delete=models.CASCADE
    )

    content = models.CharField(max_length=300)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.content)[:30]


class UserProfile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )
    avatar = models.ImageField(upload_to='images', null=True, blank=True)

    def delete(self):
        self.user.delete()

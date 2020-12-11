from django.db import models
from django.conf import settings


class Tag(models.Model):
    title = models.CharField(
        max_length=50,
        blank=False,
        null=False
    )

    def __str__(self):
        return self.title


class Post(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )

    tag = models.ManyToManyField(Tag)
    title = models.CharField(max_length=200, blank=False, null=False)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class Comment(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )
    post = models.ForeignKey(
        Post,
        on_delete=models.CASCADE
    )

    content = models.CharField(max_length=300)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.content)[:30]

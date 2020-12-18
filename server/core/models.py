from django.db import models
from django.conf import settings
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth.models import User
from django.template.defaultfilters import slugify


class UserProfile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )
    avatar = models.ImageField(upload_to='images', null=True, blank=True)

    def delete(self):
        self.user.delete()

    def __str__(self):
        return self.user.username


class OwnerModel(models.Model):
    owner = models.ForeignKey(
        UserProfile,
        on_delete=models.CASCADE,
        blank=False,
        null=False,
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
    color = models.CharField(
        _('tag color'),
        max_length=20,
        blank=True,
        null=True
    )
    slug = models.SlugField(
        _('tag slug'),
        max_length=50,
        blank=False,
        null=False,
        default=None
    )

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        self.slug = slugify(self.title)

        super(Tag, self).save(*args, **kwargs)


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

    def count_comments(self):
        return Comment.objects.filter(post=self.id).count()

    def count_likes(self):
        return Like.objects.filter(like_post=self.id).count()


class Like(OwnerModel):
    post = models.OneToOneField(Post, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        # Should check if the user already liked the post
        if not Like.objects.filter(owner=self.owner).exists():
            super(Like, self).save(*args, **kwargs)

class Comment(OwnerModel):
    post = models.ForeignKey(
        Post,
        on_delete=models.CASCADE
    )

    content = models.CharField(max_length=300)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.content)[:30]

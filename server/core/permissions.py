from rest_framework import permissions


class IsOwner(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        if 'owner' in request.data:
            return (request.user.id == request.data['owner'] or request.user.username == request.data['owner'])

        return True

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.owner == request.user


class IsUser(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in ["GET", "POST", "OPTIONS"]:
            return True

        return request.user.id == obj.id

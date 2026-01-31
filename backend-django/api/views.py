import os
import datetime
import jwt
from django.http import JsonResponse
from django.views.decorators.http import require_GET

JWT_SECRET = os.environ.get('JWT_SECRET', 'dev-secret')
JWT_ALGO = os.environ.get('JWT_ALGO', 'HS256')

@require_GET
def ping(request):
    return JsonResponse({'pong': True})

@require_GET
def demo_auth(request):
    role = request.GET.get('role', 'ADMIN')
    # create demo user payload
    payload = {
        'email': f'{role.lower()}.demo@kingdomx.local',
        'name': f'{role.capitalize()} Demo',
        'role': role,
        'iat': datetime.datetime.utcnow(),
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=365)
    }
    token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGO)
    return JsonResponse({'token': token, 'user': payload})
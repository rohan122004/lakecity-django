import json
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST

from .models import Inquiry


def home(request):
    # Sirf page render karega (no saving here)
    success = request.GET.get("success")
    return render(request, "transport/home.html", {"success": success})


def simple_api(request):
    return JsonResponse({"message": "Hello Rohan", "api": "working"})


@csrf_exempt
@require_POST
def inquiry_api(request):
    try:
        body = json.loads(request.body.decode("utf-8"))
    except Exception:
        return JsonResponse({"status": "error", "message": "Invalid JSON"}, status=400)

    name = (body.get("name") or "").strip()
    phone = (body.get("phone") or "").strip()
    message = (body.get("message") or "").strip()

    pickup_city = (body.get("pickup_city") or "").strip()
    drop_city = (body.get("drop_city") or "").strip()
    load_type = (body.get("load_type") or "").strip()

    if not phone.isdigit() or len(phone) != 10:
        return JsonResponse({"status": "error", "message": "Enter valid 10 digit phone"}, status=400)

    Inquiry.objects.create(
        name=name,
        phone=phone,
        message=message,
        pickup_city=pickup_city,
        drop_city=drop_city,
        load_type=load_type,
    )
    return JsonResponse({"status": "success", "message": "Saved in DB ✅"})


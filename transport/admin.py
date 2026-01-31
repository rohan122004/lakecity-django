from django.contrib import admin
from .models import Inquiry


@admin.register(Inquiry)
class InquiryAdmin(admin.ModelAdmin):

    # Admin list view me columns
    list_display = (
        "name",
        "phone",
        "pickup_city",
        "drop_city",
        "load_type",
        "status",
        "created_at",
    )

    # Search box
    search_fields = (
        "name",
        "phone",
        "pickup_city",
        "drop_city",
        "load_type",
        "message",
    )

    # Right side filters
    list_filter = ("status", "created_at")

    # Default ordering
    ordering = ("-created_at",)

    # Status ko direct edit kar sako
    list_editable = ("status",)

    # Admin form layout
    fieldsets = (
        ("Customer Details", {
            "fields": ("name", "phone"),
        }),
        ("Transport Details", {
            "fields": ("pickup_city", "drop_city", "load_type"),
        }),
        ("Message", {
            "fields": ("message",),
        }),
        ("Status", {
            "fields": ("status",),
        }),
        ("Meta", {
            "fields": ("created_at",),
        }),
    )

    readonly_fields = ("created_at",)

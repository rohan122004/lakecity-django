from django.db import models

class Inquiry(models.Model):
    STATUS_CHOICES = [
        ("new", "New"),
        ("contacted", "Contacted"),
        ("booked", "Booked"),
        ("closed", "Closed"),
    ]

    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)
    message = models.TextField()

    pickup_city = models.CharField(max_length=80, blank=True)
    drop_city = models.CharField(max_length=80, blank=True)
    load_type = models.CharField(max_length=80, blank=True)  # e.g. household, marble, etc.

    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="new")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.phone}"

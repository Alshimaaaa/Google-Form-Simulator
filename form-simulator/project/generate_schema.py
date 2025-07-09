import os
import django
import json

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "project.settings")  # 🔁 update 'project' to your settings module name
django.setup()

from drf_yasg.generators import OpenAPISchemaGenerator
from drf_yasg import openapi

schema_generator = OpenAPISchemaGenerator(
    info=openapi.Info(
        title="Form Simulator API",
        default_version="v1",
        description="Swagger JSON schema for the Form Simulator project",
    )
)

schema = schema_generator.get_schema(request=None, public=True)

with open("schema.json", "w") as f:
    json.dump(schema, f, indent=2)

print("✅ Swagger schema exported to schema.json")

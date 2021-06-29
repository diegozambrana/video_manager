from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from mailer.email_template_sender import send_contact_mail


@api_view(['POST'])
@permission_classes((AllowAny,))
def recommend(request):
    data_message = {
            "fullname": request.data["fullname"],
            "email": request.data["email"],
            "message": request.data["message"],
            "source": "Recomendación",
    }
    send_contact_mail(data_message)
    return Response({"status": "ok"})


@api_view(['POST'])
@permission_classes((AllowAny,))
def report(request):
    data_message = {
            "fullname": request.data["fullname"],
            "email": request.data["email"],
            "message": request.data["message"],
            "link": request.data["link"],
            "source": "Reporte/Error",
    }
    send_contact_mail(data_message)
    return Response({"status": "ok"})

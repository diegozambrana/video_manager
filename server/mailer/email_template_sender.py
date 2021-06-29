import smtplib
from email.mime.image import MIMEImage
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from django.conf import settings
from django.template import loader
from .constants import EMAIL_MAX_LENGTH


def _render_template(context, template):
    if template:
        t = loader.get_template(template)
        return t.render(dict(context))
    return context


def _named(mail, name):
    if name:
        return '%s <%s>' % (name, mail)
    return mail


def send_html_mail(subject, msg, sender, recipient,
                   recipient_name='', template='',
                   text_template='', text_msg='',
                   images=tuple(), images_dir=settings.MEDIA_ROOT,
                   sender_name='', charset='utf-8'):

    html = _render_template(msg, template)
    if len(html) > EMAIL_MAX_LENGTH:
        html = html[:EMAIL_MAX_LENGTH]
    msg_root = MIMEMultipart('related')
    msg_root['Subject'] = subject
    msg_root['From'] = _named(sender, sender_name)
    msg_root['To'] = _named(recipient, recipient_name)

    msg_alternative = MIMEMultipart('alternative')
    msg_root.attach(msg_alternative)
    msg_alternative.attach(MIMEText(html, 'html', _charset=charset))

    print('send_html_mail')
    if text_template or text_msg:
        text = _render_template((text_msg or msg), text_template)
        if len(text) > EMAIL_MAX_LENGTH:
            text = text[:EMAIL_MAX_LENGTH]
        msg_alternative.attach(MIMEText(text, _charset=charset))

    for img in images:
        fp = open(images_dir.rstrip('/') + '/%s' % img, 'rb')
        msg_image = MIMEImage(fp.read())
        fp.close()
        msg_image.add_header('Content-ID', '<' + img + '>')
        msg_root.attach(msg_image)

    tries = 3
    error = None
    while tries > 0:
        try:
            # errors can occur on any of the lines below.
            mail = smtplib.SMTP(settings.EMAIL_HOST, settings.EMAIL_PORT)
            mail.starttls()
            mail.login(settings.EMAIL_HOST_USER, settings.EMAIL_HOST_PASSWORD)
            mail.sendmail(sender, recipient, msg_root.as_string())
            mail.quit()
            break
        except Exception as e:
            tries -= 1
            error = e

    if error:
        raise error


def send_contact_mail(message_data):
    subject = "[{}]: Mensaje de {}".format(
            message_data['source'],
            message_data['fullname']
        )
    print(message_data)
    send_html_mail(
            subject=subject,
            sender=settings.ADMIN_EMAIL_ADDRESS,
            sender_name=message_data['fullname'],
            recipient='mrtrvideos@gmail.com',
            template='email_template.html',
            msg=dict(message_data, **settings.CODE_INFO)
        )

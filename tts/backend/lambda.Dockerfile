FROM public.ecr.aws/docker/library/python:3.12.1-slim
COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:0.8.1 /lambda-adapter /opt/extensions/lambda-adapter
WORKDIR /var/task
COPY . .
RUN python -m pip install -r requirements.txt
# CMD ["gunicorn", "-b=:8080", "-w=1", "app:app"]
CMD ["gunicorn", "src.app:app", "-b=:8080", "-w=1", "-c", "./gunicorn.conf.py"]
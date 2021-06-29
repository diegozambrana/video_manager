# Public Video Manager

## SERVER

### Comandos de app

#### Subir json para series

* **--json_path**: la ruta del archivo json que se quiere subir.
* **--id_show**: El pk del show al que se relacionará el json.
* **--load**: Boolean si es true cargará json a un show que ya existe con datos.

```
python manage.py load_json_video_data --json_path=<path_json_file> --id_show=<id_show>
```

#### Actualizar prioridad de sources

los sources tienen una prioridad de cual mostrarse primero. para actualizar todos despues de cargar datos se debe correr el siguiente comando.

```
python manage.py update_sources
```

## FRONTEND

update spa fronted

```
yarn build-dj
```

## AWS


### Supervisord

START

```
sudo supervisord -c /etc/supervisor/supervisord.conf
```

STOP

```
sudo pkill -QUIT supervisord
```

RESTART

```
sudo pkill -HUP supervisord
```

STATUS

```
sudo supervisorctl status
```

### NGINX

reload 

```
sudo nginx -c /home/ubuntu/conf/nginx.conf
```

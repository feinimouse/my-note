

# vsftpd.md

by 菲尼莫斯 2019年01月26日

---

## vsftpd 在docker中启动失败的问题

问题状况：
```bash
root@8c69b4d46e09:/etc/init.d# ./vsftpd start
 * Starting FTP server vsftpd
 * vsftpd failed - probably invalid config.
```

解决办法：

在`/etc/init.d/vsftpd`中加入1秒的延迟

原代码：

```sh
# ........

fi

start-stop-daemon --start --background -m --oknodo --pidfile /var/run/vsftpd/vsftpd.pid --exec ${DAEMON}

n=0
while [ ${n} -le 5 ]
do

# ........
```

更改后：

```sh
# ........

fi

start-stop-daemon --start --background -m --oknodo --pidfile /var/run/vsftpd/vsftpd.pid --exec ${DAEMON}

sleep 1

n=0
while [ ${n} -le 5 ]
do

# ........
```

可能是由于进程冲突造成的启动失败

[原博客见此](http://www.owsiak.org/vsftpd-and-nasty-vsftpd-failed-probably-invalid-config/)



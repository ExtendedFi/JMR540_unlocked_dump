#! /bin/sh

# Copyright (c) 2014 Foxconn Technologies, Inc.  All Rights Reserved.
# Foxconn Technologies Proprietary and Confidential.

set -e
SDCardMode=`cfg -v SDCardMode`
if [ "$SDCardMode" = "" ]; then
  cfg -a SDCardMode="wifi"
  SDCardMode='wifi'
fi	
case "$1" in
  start)
        echo -n "Starting thttpd: "
		iptables -A INPUT -i bridge0 -p tcp --dport 80 -j ACCEPT
		iptables -A INPUT -i bridge0 -p tcp --dport 443 -j ACCEPT
		/sbin/thttpd -C /etc/thttpd/thttpd.conf -m ${SDCardMode}
        echo "done"
        ;;
  stop)
        echo -n "Stopping thttpd: "
		iptables -D INPUT -i bridge0 -p tcp --dport 80 -j ACCEPT
		iptables -D INPUT -i bridge0 -p tcp --dport 443 -j ACCEPT
        start-stop-daemon -K -n thttpd
        echo "done"
        ;;
  restart)
        $0 stop
        $0 start
        ;;
  *)
        echo "Usage thttpd { start | stop | restart}" >&2
        exit 1
        ;;
esac

exit 0

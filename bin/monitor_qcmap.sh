#!/bin/sh
# --------------------------------------------------------------
# Copyright (c) 2012 Qualcomm Technologies, Inc.
# All Rights Reserved.
# Qualcomm Technologies Proprietary and Confidential.
# --------------------------------------------------------------

while [ 1 ]
do
if [ $(ps aux | grep QCMAP_ConnectionManager | wc -l) -lt 2 ]; then
echo "QCMAP disappear, reboot DUT on $(date)" > /cache/qcmap_log
cp /var/log/message* /cache/
dmesg > /cache/dmesg_log
sync
sys_reboot
fi
sleep 2
done



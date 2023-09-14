#!/bin/sh
# Copyright (c) 2014, The Linux Foundation. All rights reserved.
#
# Redistribution and use in source and binary forms, with or without
# modification, are permitted provided that the following conditions are
# met:
#     * Redistributions of source code must retain the above copyright
#       notice, this list of conditions and the following disclaimer.
#     * Redistributions in binary form must reproduce the above
#       copyright notice, this list of conditions and the following
#       disclaimer in the documentation and/or other materials provided
#       with the distribution.
#     * Neither the name of The Linux Foundation nor the names of its
#       contributors may be used to endorse or promote products derived
#       from this software without specific prior written permission.
#
# THIS SOFTWARE IS PROVIDED "AS IS" AND ANY EXPRESS OR IMPLIED
# WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
# MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT
# ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS
# BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
# CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
# SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR
# BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
# WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE
# OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN
# IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
#
# find_partitions        init.d script to dynamically find partitions
#

ModemRecovery()
{
	echo "DBG: modem is corrupted, recovery it." >> /dev/kmsg
	bootfrom=`upgrade -g | tail -n 1 | awk '{print $4}'`
	echo "DBG: image boot from bank $bootfrom." >> /dev/kmsg
	good_modem_mtd=11
	if [ ${bootfrom} -eq 2 ]; then
		good_modem_mtd=10
	fi
	ubiattach -m $good_modem_mtd -s 1 -d 3 /dev/ubi_ctrl
	while [ 1 ]
	do
		if [ -c /dev/ubi3_0 ]
		then
			break
		else
			sleep 0.010
		fi
	done
	dd if=/dev/ubi3_0 of=/foxtmp/modem.ubi
	ubimkvol /dev/ubi1 -S 348 -N modem -n 0
	while [ 1 ]
	do
		if [ -c /dev/ubi1_0 ]
		then
			ubiupdatevol /dev/ubi1_0 /foxtmp/modem.ubi
			break
		else
			sleep 0.010
		fi
	done
	rm -f /foxtmp/modem.ubi
	ubidetach -d 3
}

FindAndMountUBI () {
   partition=$1
   dir=$2

   counter=0

   #Foxconn, Jacky Kao modified (start), 2016/02/02 --- To avoid finding same partition name twice
   #mtd_block_number=`cat $mtd_file | grep -i $partition | sed 's/^mtd//' | awk -F ':' '{print $1}'`
   #mtd_block_number=`cat $mtd_file | grep -i "\"$partition\"" | sed 's/^mtd//' | awk -F ':' '{print $1}'`
   mtd_block_number=`cat $mtd_file | grep -w "\"$partition\"" | sed 's/^mtd//' | awk -F ':' '{print $1}'`
   #Foxconn, Jacky Kao modified (end), 2016/02/02 --- To avoid finding same partition name twice

   echo "MTD : Detected block device : $dir for $partition"
   mkdir -p $dir

   ubiattach -m $mtd_block_number -d 1 /dev/ubi_ctrl
   device=/dev/ubi1_0
   while [ 1 ]
    do
        if [ -c $device ]
        then
### Foxconn modify start, Min-Chang, for the property of /firmware/* , 01-28-2016
            mount -t ubifs -o ro /dev/ubi1_0 $dir -o bulk_read
            if [ $? -ne 0 ]; then
            	echo "DBG: mounting modem failed, recovery it." >> /dev/kmsg
            	ModemRecovery
            	mount -t ubifs -o ro /dev/ubi1_0 $dir -o bulk_read
            fi
#            mount -t ubifs /dev/ubi1_0 $dir -o bulk_read
### Foxconn modify end, Min-Chang, for the property of /firmware/* , 01-28-2016
            break
        else
            sleep 0.010
            counter=$(( $counter + 1 ))
			if [ ${counter} -ge 500 ]; then
				ModemRecovery
				counter=0
			fi
        fi
    done
}

FindAndMountVolumeUBI () {
   volume_name=$1
   dir=$2
   if [ ! -d $dir ]
   then
       mkdir -p $dir
   fi
   mount -t ubifs ubi0:$volume_name $dir -o bulk_read
}
##Foxconn add start, Wen-Fei 2016-11-10 recovery Foxuser partition
FormatFoxUserUBI () {
##ubidetach -d 2 # if ecc error in foxuser ubi, this command will stuck. 
  ubidetach -m 20
  ubiformat /dev/mtd20 -y
  ubiattach -m 20 -d 2 /dev/ubi_ctrl
  ubimkvol /dev/ubi2 -s 4MiB -n 0 -N foxfs
  mount -t ubifs /dev/ubi2_0 /foxusr
}

FormatUBI () {
	partition=$1
	dir=$2
	d=$3
	volname=$4
	device=/dev/ubi${d}_0
	counter=0
	mtd_block_number=`cat $mtd_file | grep -w "\"$partition\"" | sed 's/^mtd//' | awk -F ':' '{print $1}'`
	echo "===========Partition has some errors, start to format $partition=============" >> /dev/kmsg
	ubidetach -m $mtd_block_number
	ubiformat /dev/mtd${mtd_block_number} -y
	ubiattach -m $mtd_block_number -d ${d} /dev/ubi_ctrl
	ubimkvol /dev/ubi${d} -m -n 0 -N $volname
	while [ 1 ]
	do
		if [ -c $device ]
		then
			mount -t ubifs /dev/ubi${d}_0 $dir
			break
		else
			sleep 0.010
			counter=$(( $counter + 1 ))
			if [ ${counter} -ge 600 ]; then
				echo b > /proc/sysrq-trigger
			fi
		fi
	done
}

##Foxconn add end, Wen-Fei 2016-11-10 recovery Foxuser partition
##Foxconn add start, S.K.Yang 2016/04/01 Make Foxuser partition
FindAndMountFOXVolumeUBI () {
	 partition=$1
   dir=$2
##Foxconn add start, Wen-Fei 2016-11-10 recovery Foxuser partition
   counter=0
##Foxconn add end, Wen-Fei 2016-11-10 recovery Foxuser partition

   mtd_block_number=`cat $mtd_file | grep -w "\"$partition\"" | sed 's/^mtd//' | awk -F ':' '{print $1}'`

   echo "MTD : Detected block device : $dir for $partition"
   #mkdir -p $dir

	foxusr_ecc_error=`cfg -v FOXUSR_ECC_ERROR`
	if [ -n "$foxusr_ecc_error" ]; then
		if [ ${foxusr_ecc_error} -eq 1 ]; then
			cfg -a FOXUSR_ECC_ERROR=0
			cfg -c
			FormatUBI foxusr /foxusr 2 foxfs
			return
		fi
	fi
	
   ubiattach -m $mtd_block_number -d 2 /dev/ubi_ctrl
   device=/dev/ubi2_0
   while [ 1 ]
    do
        if [ -c $device ]
        then
            echo "foxusr: wait count = $counter" >> /dev/kmsg
            foxusr_error_count=`cfg -v FOXUSR_ERROR`
			if [ -n "$foxusr_error_count" ]; then
				if [ ${foxusr_error_count} -ge 1 ]; then
					cfg -a FOXUSR_ERROR=0
					cfg -c
				fi
			fi
            mount -t ubifs  /dev/ubi2_0 $dir
            if mountpoint -q $dir
            then
				echo "Partition: foxusr mount successfully" >> /dev/kmsg
				break
			else
				echo "===========foxusr ubiattach success but mount fail due to ECC error - Prepare to format foxusr=============" >> /dev/kmsg
				cfg -a FOXUSR_ECC_ERROR=1
				cfg -c
				echo b > /proc/sysrq-trigger
				break
            fi
        else
#            echo "==========sleep due to foxfs volume (/dev/ubi2_0) is not ready========="
            sleep 0.010
##Foxconn add start, Wen-Fei 2016-11-10 recovery Foxuser partition
            counter=$(( $counter + 1 ))
            if [ ${counter} -ge 600 ]; then
            	foxusr_error_count=`cfg -v FOXUSR_ERROR`
            	foxusr_error_count=$(( $foxusr_error_count + 1 ))
            	echo "WSNDEBUG: foxusr_error_count = $foxusr_error_count"
            	if [ ${foxusr_error_count} -gt 3 ]; then
	            	echo "$counter: ===========format foxusr UBI==================" >> /dev/kmsg
	            	FormatUBI foxusr /foxusr 2 foxfs
	                break
	            else
	            	echo "===========foxusr UBI mount fail - reboot==================" >> /dev/kmsg
	            	cfg -a FOXUSR_ERROR=$foxusr_error_count
	            	cfg -c
	            	echo b > /proc/sysrq-trigger
	            	break
	            fi
            fi
##Foxconn add end, Wen-Fei 2016-11-10 recovery Foxuser partition
        fi
    done
}
##Foxconn add end, S.K.Yang 2016/04/01 Make Foxuser partition

mtd_file=/proc/mtd

fstype="UBI"
#Foxconn marked, wen-fei, 2016-08-24 for no usrfs volume data
#eval FindAndMountVolume${fstype} usrfs /data

eval FindAndMount${fstype} modem /firmware

eval FindAndMountFOXVolume${fstype} foxusr /foxusr
exit 0

#!/bin/bash

output=$PWD
input=$1

case “$1“ in
	-o | —output-dir ) output=$2
	input=$3
	;;
esac

mkdir -p $output

ffmpeg -re -v 0 -i $input -vcodec copy -vbsf:v h264_mp4toannexb -acodec copy -f mpgets - | ffmpeg -y -i udp://127.0.0.1:5555 -map 0 -f segment -segment_time 10 -segment_format mpegts -segment_list $output/prog_index.m3u8 -segment_list_size 3 -segment_list_flags +live -segment_list_type m3u8 output$/fileSequence%d.ts $output

ffmpeg -re -i Desktop/BigBuckBunny/big_buck_bunny_1080p_h264.mov -vcodec copy -vbsf:v h264_mp4toannexb -acodec copy -f mpegts udp://127.0.0.1:5555 

mediastreamsegmenter -program -f /Users/joelblumer/Desktop/Destination_File_Segmenter/Live_Streaming/ 127.0.0.1:5555

1. befehl ausführen und pipen in den 2. teil. Udp entfernen
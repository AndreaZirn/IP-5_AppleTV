#!/bin/bash

output=$PWD
input=$1

case “$1“ in
	-o | —output-dir ) output=$2
	input=$3
	;;
esac

mkdir -p $output

ffmpeg -re -v 0 -i $input -vcodec copy -vbsf:v h264_mp4toannexb -acodec copy -f mpgets - | mediastreamsegmenter -f $output

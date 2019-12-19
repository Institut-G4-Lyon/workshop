#!/bin/bash
END=20;
for i in $(seq 1 $END);
do
   echo "Welcome $i times" >> time$i.txt
done


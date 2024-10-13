#!/bin/bash

while getopts ":d:" opt; do
  case $opt in
    d) dir="$OPTARG"
    ;;
    \?) echo "Invalid option -$OPTARG" >&2
    ;;
  esac
done

if [ -z "$dir" ]; then
  echo "No directory specified"
  exit 1
fi

echo "-> Importing Architecture Icons"
services_json=$(
  jq -n '{}'
)
mkdir -p "public/data/aws/2022/services/icons"
for i in $dir/*; do
  category=${i##*/Arch_}
  echo " -> Category: $category"
  mkdir -p "public/data/aws/2022/services/icons/$category"
  for ii in $i/Arch_$category-16/*.svg; do
    service_filename=${ii##*/Arch_}
    service=${service_filename%_16.svg}
    echo "  -> Service: $service"
    # cp "$ii" "public/data/aws/2022/services/icons/$service.2022.16.svg"
    cp "$ii" "public/data/aws/2022/services/icons/$category/$service.2022.16.svg"
    services_json=$(
      echo "$services_json" | jq ".\"$service\".categories += [\"$category\"]"
    )
  done
done

echo "$services_json" > "public/data/aws/2022/services/services.json"

#for i in $dir/*.svg; do
#  mv "$i" "${i/Arch\_/}"
#  mv "$i" "${i/_16.svg/.svg}"
#done
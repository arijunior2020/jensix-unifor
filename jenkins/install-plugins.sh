#!/bin/bash

set -e

# Verifica se o arquivo plugins.txt está vazio
if [ "$(cat /usr/share/jenkins/ref/plugins.txt | wc -l)" -eq 0 ]; then
  echo "Nenhum plugin encontrado para instalar."
  exit 0
fi

# Loop para instalar os plugins
while IFS=':' read -r plugin version || [[ -n "$plugin" && -n "$version" ]]; do
  echo "Instalando o plugin $plugin na versão $version"
  /usr/local/bin/install-plugins.sh $plugin:$version
done < /usr/share/jenkins/ref/plugins.txt
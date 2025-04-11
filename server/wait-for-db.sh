#!/bin/sh
# wait-for-db.sh

set -e

host="$1"
shift
cmd="$@"

until mysql -h "$host" -u user -ppassword --skip-ssl -e 'SELECT 1'; do
  >&2 echo "MySQL ainda não está disponível - aguardando..."
  sleep 5
done

>&2 echo "MySQL está pronto - executando comando"
exec $cmd 
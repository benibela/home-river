#/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
source $DIR/../../../manageUtils.sh

githubProject home-river

BASE=$HGROOT/programs/data/homespring

case "$1" in
mirror)
  syncHg  
;;
esac

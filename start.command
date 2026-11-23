#!/bin/bash
# Double-click to open the study site at http://127.0.0.1:8765
cd "$(dirname "$0")"
(sleep 1 && open "http://127.0.0.1:8765") &
echo "Study site running at http://127.0.0.1:8765 (close this window to stop)"
python3 -m http.server 8765 --bind 127.0.0.1

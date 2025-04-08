#!/bin/bash
echo "🔧 Running Vivado HLS end-to-end..."
vivado_hls -f hls_script.tcl
python3 main.py

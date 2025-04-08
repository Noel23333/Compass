@echo off
REM Windows batch script to run Vitis HLS and generate YAML

echo Setting up Vitis HLS...
call "E:\vitis\Vitis_HLS\2022.1\settings64.bat"

echo Running Vitis HLS...
vitis_hls -f hls_script.tcl

echo Running Python YAML generator...
python main.py

pause

#!/bin/bash

# Set up Vitis HLS environment
source /home/noel/Programs/Xilinx/Vitis_HLS/2022.1/settings64.sh

# Define variables
C_FILE="adder.c"  # Replace with the full path if the file is not in the same directory
TOP_FUNCTION="add"  # Updated to match the function name in adder.c
PROJECT_NAME="hls_project"
SOLUTION_NAME="solution1"
CLOCK_PERIOD=10  # Clock period in ns
FPGA_PART="xc7vx485tffg1761-2"  # Replace with your target FPGA part number

# Check if the C file exists
if [ ! -f "$C_FILE" ]; then
    echo "Error: C file '$C_FILE' not found. Please provide the correct path."
    exit 1
fi

# Check if the top function exists in the C file
if ! grep -q "\(int\|void\) $TOP_FUNCTION" "$C_FILE"; then
    echo "Error: Top function '$TOP_FUNCTION' not found in '$C_FILE'. Please ensure the function exists."
    exit 1
fi

# Create and run Vitis HLS project
vitis_hls -f << EOF
open_project -reset $PROJECT_NAME
set_top $TOP_FUNCTION
add_files $C_FILE
open_solution -reset $SOLUTION_NAME
set_part $FPGA_PART
create_clock -period $CLOCK_PERIOD -name default
csynth_design
export_design -format ip_catalog
exit
EOF

# Check if RTL generation was successful
if [ -d "$PROJECT_NAME/$SOLUTION_NAME/impl/ip" ]; then
    echo "RTL code generated successfully. Saved in $PROJECT_NAME/$SOLUTION_NAME/impl/ip."
else
    echo "RTL code generation failed. Please check the error logs."
fi
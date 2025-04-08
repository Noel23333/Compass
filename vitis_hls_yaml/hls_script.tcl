open_project my_project
set_top my_adder
add_files input/my_adder.cpp
open_solution "solution1"
set_part {xc7z020clg400-1}
create_clock -period 10 -name default
csynth_design
export_design -rtl verilog -format ip_catalog
exit

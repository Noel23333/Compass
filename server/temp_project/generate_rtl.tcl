
    open_project -reset hls_project
    set_top top_function
    add_files /home/noel/React/temp/temp_code.c
    open_solution -reset solution1
    set_part xc7vx485tffg1761-2
    create_clock -period 10 -name default
    csynth_design
    export_design -format ip_catalog
    exit
  
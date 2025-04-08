import subprocess
import os
from parse_ports import parse_verilog_ports
from generate_yaml import generate_pin_yaml

def run_hls():
    print("🔧 Running Vitis HLS...")
    subprocess.run(['vitis_hls', '-f', 'hls_script.tcl'])

def main():
    run_hls()

    verilog_file = 'my_project/solution1/syn/verilog/my_adder.v'
    if not os.path.exists(verilog_file):
        raise FileNotFoundError(f"⚠️ Verilog file not found: {verilog_file}")

    ports = parse_verilog_ports(verilog_file)
    os.makedirs('output', exist_ok=True)
    generate_pin_yaml(ports, output_file='output/pinout.yaml')
    print("✅ YAML file generated at output/pinout.yaml")

if __name__ == '__main__':
    main()

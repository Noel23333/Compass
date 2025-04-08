import re

def parse_verilog_ports(verilog_file):
    ports = []
    with open(verilog_file, 'r') as f:
        content = f.read()

    pattern = r'(input|output|inout)\\s+(?:\\[\\s*(\\d+)\\s*:\\s*(\\d+)\\s*\\]\\s+)?(\\w+)\\s*[,;)]'
    matches = re.findall(pattern, content)

    for direction, msb, lsb, name in matches:
        width = 1 if not msb else abs(int(msb) - int(lsb)) + 1
        ports.append({
            'name': name,
            'direction': direction,
            'width': width
        })
    return ports

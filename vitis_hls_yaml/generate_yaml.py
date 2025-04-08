import yaml

def generate_pin_yaml(ports, output_file='output/pinout.yaml'):
    pin_data = []
    for port in ports:
        pin_entry = {
            'name': port['name'],
            'direction': port['direction'],
            'width': port['width'],
            'pin': f"<AUTO_ASSIGN_{port['name']}>"
        }
        pin_data.append(pin_entry)

    with open(output_file, 'w') as f:
        yaml.dump(pin_data, f)

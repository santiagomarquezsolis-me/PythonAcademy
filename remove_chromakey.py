from PIL import Image
import sys

def remove_chroma(input_path, output_path):
    print(f"Abriendo {input_path}...")
    img = Image.open(input_path).convert("RGBA")
    datas = img.getdata()

    newData = []
    # Usualmente los bordes son el color verde chromakey, lo detectamos en el primer píxel (0,0)
    bg_color = datas[0]
    
    print(f"Color de fondo detectado en [0,0]: {bg_color}")
    
    for item in datas:
        # Evaluamos distancias al color de chromakey. 
        # Si es suficientemente cercano al chromakey, lo hacemos transparente.
        # (Esto ayuda a lidiar con artefactos de compresión sutiles)
        if abs(item[0] - bg_color[0]) < 30 and \
           abs(item[1] - bg_color[1]) < 30 and \
           abs(item[2] - bg_color[2]) < 30:
            newData.append((0, 0, 0, 0)) # Transparente total
        else:
            newData.append(item) 

    img.putdata(newData)
    img.save(output_path, "PNG")
    print(f"Guardado como PNG Transparente en {output_path}")

if __name__ == '__main__':
    in_file = sys.argv[1]
    out_file = sys.argv[2]
    remove_chroma(in_file, out_file)

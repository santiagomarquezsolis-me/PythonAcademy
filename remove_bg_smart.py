from PIL import Image, ImageDraw
import sys

def remove_bg(input_path, output_path):
    print(f"Procesando {input_path} con FloodFill inteligente...")
    img = Image.open(input_path).convert("RGBA")
    
    # Hacemos floodfill (cubo de pintura) desde las esquinas exteriores
    # Pintamos el fondo exterior de un color fucsia chillón que seguro no está en la nave (255, 0, 255)
    w, h = img.size
    ImageDraw.floodfill(img, xy=(0, 0), value=(255, 0, 255, 255), thresh=50)
    ImageDraw.floodfill(img, xy=(w-1, 0), value=(255, 0, 255, 255), thresh=50)
    ImageDraw.floodfill(img, xy=(0, h-1), value=(255, 0, 255, 255), thresh=50)
    ImageDraw.floodfill(img, xy=(w-1, h-1), value=(255, 0, 255, 255), thresh=50)

    # Ahora convertimos todo lo que sea fucsia exterior a transparente
    datas = img.getdata()
    newData = []
    for item in datas:
        if item[0] == 255 and item[1] == 0 and item[2] == 255:
            newData.append((0, 0, 0, 0)) # Transparente total
        else:
            newData.append(item) # Mantener color original (aunque fuera negro interior)
            
    img.putdata(newData)
    img.save(output_path, "PNG")
    print("Malla exterior eliminada conservando líneas interiores.")

if __name__ == '__main__':
    in_file = sys.argv[1]
    out_file = sys.argv[2]
    remove_bg(in_file, out_file)

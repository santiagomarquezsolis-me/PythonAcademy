from PIL import Image
import os

def make_transparent(img_path):
    print(f"Abriendo {img_path}...")
    img = Image.open(img_path)
    img = img.convert("RGBA")
    datas = img.getdata()

    newData = []
    # Usamos el pixel [0,0] (esquina superior izquierda) como color de fondo
    bg_color = datas[0]
    
    print(f"Color de fondo detectado: {bg_color}")

    for item in datas:
        # Tolerancia para compresión jpeg/arte
        if abs(item[0] - bg_color[0]) < 20 and \
           abs(item[1] - bg_color[1]) < 20 and \
           abs(item[2] - bg_color[2]) < 20:
            newData.append((255, 255, 255, 0)) # Transparente
        else:
            newData.append(item)

    img.putdata(newData)
    img.save(img_path, "PNG")
    print("Fondo eliminado con éxito.")

if __name__ == '__main__':
    target = os.path.abspath(os.path.join(os.path.dirname(__file__), 'frontend', 'public', 'alien_mothership.png'))
    make_transparent(target)

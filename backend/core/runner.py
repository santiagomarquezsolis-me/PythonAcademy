import tempfile
import subprocess
import os

def run_user_code_with_test(user_code: str, test_code: str) -> dict:
    """
    Ejecuta de manera sencilla el código del usuario junto al script de test 
    en un archivo temporal usando pytest.
    (MVP - No usa sandboxing dockerizado real, asume que no hay inputs maliciosos de momento)
    """
    with tempfile.TemporaryDirectory() as tmpdirname:
        # Escribimos el código del usuario como un módulo a importar
        user_module_path = os.path.join(tmpdirname, "user_solution.py")
        with open(user_module_path, "w", encoding="utf-8") as f:
            f.write(user_code)
            
        # Escribimos el test inyectando un import al módulo del usuario
        test_path = os.path.join(tmpdirname, "test_level.py")
        
        # Preparamos el test asumiendo que el test_code importara lo que necesite de 'user_solution'
        with open(test_path, "w", encoding="utf-8") as f:
            f.write("import user_solution\n")
            f.write(test_code)
            
        # Ejecutamos pytest
        try:
            result = subprocess.run(
                ["pytest", "test_level.py", "--tb=short"],
                cwd=tmpdirname,
                capture_output=True,
                text=True,
                timeout=5
            )
            
            # 0 significa que los tests pasaron, 1 que fallaron, 2 error general
            return {
                "success": result.returncode == 0,
                "output": result.stdout if result.returncode == 0 else result.stdout + result.stderr,
                "exit_code": result.returncode
            }
        except subprocess.TimeoutExpired:
            return {
                "success": False,
                "output": "Error: Timeout. El código tardó demasiado en ejecutarse (posible bucle infinito).",
                "exit_code": -1
            }
        except Exception as e:
            return {
                "success": False,
                "output": f"Error interno al ejecutar el test: {str(e)}",
                "exit_code": -1
            }

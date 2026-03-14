import pytest
import user_solution
import inspect

def test_funcion_creada_y_funciona():
    assert hasattr(user_solution, 'verificar_acceso'), "No se encontró la función 'verificar_acceso'."
    
    funcion = user_solution.verificar_acceso
    assert inspect.isfunction(funcion), "'verificar_acceso' debe ser una función (def)."
    
    # Probando con clave correcta
    assert funcion(999) is True, "verificar_acceso(999) debería devolver True."
    
    # Probando con claves incorrectas
    assert funcion(123) is False, "verificar_acceso(123) debería devolver False."
    assert funcion(998) is False, "verificar_acceso(998) debería devolver False."

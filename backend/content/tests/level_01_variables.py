import pytest
import user_solution

def test_energia_variable_exists_and_is_100():
    assert hasattr(user_solution, 'energia'), "La variable 'energia' no está definida u ocurrió un error de sintaxis."
    assert user_solution.energia == 100, f"Se esperaba que 'energia' fuera 100, pero tiene el valor {user_solution.energia}"

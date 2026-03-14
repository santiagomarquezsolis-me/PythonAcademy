import pytest
import user_solution

def test_lista_pasajeros_ordenada():
    assert hasattr(user_solution, 'pasajeros'), "La variable 'pasajeros' desapareció."
    assert type(user_solution.pasajeros) == list, "'pasajeros' debe seguir siendo una lista."
    
    # La validación correcta independiente de si lo mutó o reasignó
    esperado = ['Alice', 'Bob', 'Zark']
    assert user_solution.pasajeros == esperado, f"La lista no está ordenada alfabéticamente. Tu resultado: {user_solution.pasajeros}"

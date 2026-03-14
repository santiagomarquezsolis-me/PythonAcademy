import pytest
import user_solution

def test_bucles_añadio_cinco_elementos():
    assert hasattr(user_solution, 'combustible'), "La variable 'combustible' no existe."
    assert len(user_solution.combustible) == 5, f"Se esperaban 5 elementos, pero hay {len(user_solution.combustible)}."

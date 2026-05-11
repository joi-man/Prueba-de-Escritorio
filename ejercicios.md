**Propósito:** desarrollar manualmente operaciones básicas de realce en el dominio espacial y de mejora por histograma, aplicadas a matrices que representan imágenes en escala de grises.

**Indicaciones generales para el estudiante:**

- Trabajar sin padding; por tanto, al aplicar una ventana 5×5 sobre una imagen 10×10, la salida válida será de tamaño 6×6.
- Mostrar procedimiento: submatriz seleccionada, operación aplicada, suma o mediana según corresponda, y valor final.
- Redondear a dos decimales cuando el resultado no sea entero.
- En la ecualización, utilizar L = 8 niveles de gris y N = 225 píxeles.

---

# Ejercicio 1. Realce espacial mediante filtro promedio 5×5

Dada la siguiente matriz imagen en escala de grises:

**Matriz imagen I:**

```
52  55  61  59  79  61  76  61  62  59
55 104  65  66  70  61  68  64  73  85
62  59  55 113 109  85  69  72  66  70
59  62  57  60  63  98  95  65  66  69
62  58  61  65  67  70  72  75  78  82
60  59  62  64  68 120 124  76  79  83
58  61  63  65  69  72  74  77  80  85
59  62  64  66  70  73  75  78  82  86
60  63  65  68  72  75  78  80  84  88
62  65  68  70  74  77  80  83  87  90
```

**Kernel promedio:**

```
K = 1/25 *
1  1  1  1  1
1  1  1  1  1
1  1  1  1  1
1  1  1  1  1
1  1  1  1  1
```

Se pide:

> **1.** Aplicar el filtro promedio de forma manual, sin padding.
>
> **2.** Obtener la matriz resultante válida de tamaño 6×6.
>
> **3.** Mostrar al menos el cálculo completo del primer píxel filtrado.
>
> **4.** Redondear el resultado final a dos decimales.

**Ejemplo del primer cálculo:** se toma la submatriz 5×5 ubicada en la esquina superior izquierda:

```
52  55  61  59  79
55 104  65  66  70
62  59  55 113 109
59  62  57  60  63
62  58  61  65  67
```

La suma de los 25 valores es 1678. Por tanto:

```
1678 / 25 = 67.12
```

---

# Ejercicio 2. Realce espacial mediante filtro gaussiano 5×5

Dada la siguiente matriz imagen:

**Matriz imagen I:**

```
10  10  12  12  15  20  50  52  53  55
10  11  12  15  18  22  51  53  54  56
11  12  14  18  22  25  52  54  56  58
12  13  16  20  24  28  54  56  58  60
13  15  18  22 255  30  55  58  60  62
14  16  20  24  28  32  57  60  62  64
15  18  22  26  30  34  59  62  64  66
16  20  24  28  32  36  61  64  66  68
18  22  26  30  34  38  63  66  68  70
20  24  28  32  36  40  65  68  70  72
```

**Kernel gaussiano:**

```
K = 1/273 *
1   4   7   4   1
4  16  26  16   4
7  26  41  26   7
4  16  26  16   4
1   4   7   4   1
```

Se pide:

> **1.** Aplicar el filtro gaussiano de forma manual, sin padding.
>
> **2.** Obtener la matriz resultante válida de tamaño 6×6.
>
> **3.** Mostrar el cálculo completo del primer píxel filtrado.
>
> **4.** Explicar qué efecto produce el filtro gaussiano sobre el valor atípico 255 ubicado en la imagen.

**Orientación:** multiplicar cada valor de la vecindad 5×5 por el peso correspondiente del kernel, sumar todos los productos y dividir entre 273.

---

# Ejercicio 3. Realce espacial mediante filtro de mediana 5×5

Dada la siguiente matriz imagen con ruido impulsivo tipo sal y pimienta:

**Matriz imagen I:**

```
22  23  24  25  26  27  28  29  30  31
23  24  25 255  27  28  29  30  31  32
24  25   0  27  28  29  30 255  32  33
25  26  27  28  29  30  31  32  33  34
26  27  28  29   0  31  32  33  34  35
27  28  29  30  31  32 255  34  35  36
28  29  30  31  32  33  34  35   0  37
29  30  31  32  33  34  35  36  37  38
30  31 255  33  34  35  36  37  38  39
31  32  33  34  35  36  37  38  39  40
```

Aplicar una ventana de mediana 5x5.

Se pide:

> **1.** Tomar cada vecindad 5x5.
>
> **2.** Ordenar los 25 valores de menor a mayor.
>
> **3.** Seleccionar el valor central, es decir, el valor ubicado en la posición 13.
>
> **4.** Obtener la matriz filtrada válida de tamaño 6x6.
>
> **5.** Explicar por qué el filtro de mediana es útil para eliminar valores 0 y 255 en este tipo de imágenes.

---

# Ejercicio 4. Histograma y ecualización de una imagen 15×15

Dada la siguiente matriz imagen de 15×15 con niveles de gris entre 0 y 7:

**Matriz imagen I:**

```
1  1  1  1  1  1  1  1  2  2  2  2  2  2  2
2  2  2  2  2  2  2  2  2  2  2  2  2  2  2
2  2  2  2  2  2  2  2  2  2  2  2  2  2  2
2  2  2  2  2  2  2  2  3  3  3  3  3  3  3
3  3  3  3  3  3  3  3  3  3  3  3  3  3  3
3  3  3  3  3  3  3  3  3  3  3  3  3  3  3
3  3  3  3  3  3  3  3  3  3  3  3  3  3  3
3  3  3  3  3  3  3  3  3  3  3  3  3  3  3
3  3  3  3  3  3  3  3  3  4  4  4  4  4  4
4  4  4  4  4  4  4  4  4  4  4  4  4  4  4
4  4  4  4  4  4  4  4  4  4  4  4  4  4  4
4  4  4  4  4  4  4  4  4  4  4  4  4  4  4
4  4  4  4  5  5  5  5  5  5  5  5  5  5  5
5  5  5  5  5  5  5  5  5  5  5  5  5  5  5
5  5  5  5  6  6  6  6  6  6  6  6  7  7  7
```

**Considerar:** L = 8 niveles de gris y N = 15 × 15 = 225 píxeles.

Se pide:

> **1.** Construir el histograma de la imagen.
>
> **2.** Calcular la probabilidad de cada nivel de gris.
>
> **3.** Calcular la frecuencia acumulada.
>
> **4.** Aplicar la ecualización mediante `s_k = floor((L - 1) × CDF)`.
>
> **5.** Construir la tabla de transformación.
>
> **6.** Obtener la nueva matriz ecualizada.
>
> **7.** Comparar visualmente el histograma original con el histograma ecualizado.

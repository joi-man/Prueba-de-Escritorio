import { Injectable } from '@angular/core';

export interface Step {
  id: number;
  title: string;
  description: string;
  matrix?: number[][];
  calculation?: string;
  calculationDetails?: CalculationDetail[];
  result?: number;
  position?: { row: number; col: number };
  submatrix?: number[][];
  kernel?: number[][];
  kernelValues?: number[];
  sortedValues?: number[];
  medianPosition?: number;
  histogram?: number[];
  probabilities?: number[];
  cdf?: number[];
  transformation?: number[];
  showFinal?: boolean;
  formulaOriginal?: string;
  formulaApplied?: string;
}

export interface CalculationDetail {
  label: string;
  value: string;
  highlight?: boolean;
}

@Injectable({ providedIn: 'root' })
export class ImageProcessingService {

  getExercise1Data() {
    const matrix = [
      [52, 55, 61, 59, 79, 61, 76, 61, 62, 59],
      [55, 104, 65, 66, 70, 61, 68, 64, 73, 85],
      [62, 59, 55, 113, 109, 85, 69, 72, 66, 70],
      [59, 62, 57, 60, 63, 98, 95, 65, 66, 69],
      [62, 58, 61, 65, 67, 70, 72, 75, 78, 82],
      [60, 59, 62, 64, 68, 120, 124, 76, 79, 83],
      [58, 61, 63, 65, 69, 72, 74, 77, 80, 85],
      [59, 62, 64, 66, 70, 73, 75, 78, 82, 86],
      [60, 63, 65, 68, 72, 75, 78, 80, 84, 88],
      [62, 65, 68, 70, 74, 77, 80, 83, 87, 90]
    ];
    return { name: 'Filtro Promedio 5×5', matrix, kernel: Array(5).fill(null).map(() => Array(5).fill(1)), description: 'El filtro promedio suaviza la imagen calculando la media de vecindades 5x5.' };
  }

  getExercise2Data() {
    const matrix = [
      [10, 10, 12, 12, 15, 20, 50, 52, 53, 55],
      [10, 11, 12, 15, 18, 22, 51, 53, 54, 56],
      [11, 12, 14, 18, 22, 25, 52, 54, 56, 58],
      [12, 13, 16, 20, 24, 28, 54, 56, 58, 60],
      [13, 15, 18, 22, 255, 30, 55, 58, 60, 62],
      [14, 16, 20, 24, 28, 32, 57, 60, 62, 64],
      [15, 18, 22, 26, 30, 34, 59, 62, 64, 66],
      [16, 20, 24, 28, 32, 36, 61, 64, 66, 68],
      [18, 22, 26, 30, 34, 38, 63, 66, 68, 70],
      [20, 24, 28, 32, 36, 40, 65, 68, 70, 72]
    ];
    return { name: 'Filtro Gaussiano 5×5', matrix, kernel: [[1,4,7,4,1],[4,16,26,16,4],[7,26,41,26,7],[4,16,26,16,4],[1,4,7,4,1]], description: 'El filtro gaussiano aplica ponderación con distribución normal.' };
  }

  getExercise3Data() {
    const matrix = [
      [22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
      [23, 24, 25, 255, 27, 28, 29, 30, 31, 32],
      [24, 25, 0, 27, 28, 29, 30, 255, 32, 33],
      [25, 26, 27, 28, 29, 30, 31, 32, 33, 34],
      [26, 27, 28, 29, 0, 31, 32, 33, 34, 35],
      [27, 28, 29, 30, 31, 32, 255, 34, 35, 36],
      [28, 29, 30, 31, 32, 33, 34, 35, 0, 37],
      [29, 30, 31, 32, 33, 34, 35, 36, 37, 38],
      [30, 31, 255, 33, 34, 35, 36, 37, 38, 39],
      [31, 32, 33, 34, 35, 36, 37, 38, 39, 40]
    ];
    return { name: 'Filtro de Mediana 5×5', matrix, kernel: Array(5).fill(null).map(() => Array(5).fill(1)), description: 'El filtro de mediana reemplaza cada píxel por el valor central de la vecindad 5x5.' };
  }

  getExercise5Data() {
    const matrix = [
      [22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
      [23, 24, 25, 255, 27, 28, 29, 30, 31, 32],
      [24, 25, 0, 27, 28, 29, 30, 255, 32, 33],
      [25, 26, 27, 28, 29, 30, 31, 32, 33, 34],
      [26, 27, 28, 29, 0, 31, 32, 33, 34, 35],
      [27, 28, 29, 30, 31, 32, 255, 34, 35, 36],
      [28, 29, 30, 31, 32, 33, 34, 35, 0, 37],
      [29, 30, 31, 32, 33, 34, 35, 36, 37, 38],
      [30, 31, 255, 33, 34, 35, 36, 37, 38, 39],
      [31, 32, 33, 34, 35, 36, 37, 38, 39, 40]
    ];
    return { name: 'Filtro Mínimo 5×5', matrix, kernel: Array(5).fill(null).map(() => Array(5).fill(1)), description: 'El filtro mínimo reemplaza cada píxel por el valor mínimo de la vecindad 5x5.' };
  }

  getExercise6Data() {
    const matrix = [
      [22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
      [23, 24, 25, 255, 27, 28, 29, 30, 31, 32],
      [24, 25, 0, 27, 28, 29, 30, 255, 32, 33],
      [25, 26, 27, 28, 29, 30, 31, 32, 33, 34],
      [26, 27, 28, 29, 0, 31, 32, 33, 34, 35],
      [27, 28, 29, 30, 31, 32, 255, 34, 35, 36],
      [28, 29, 30, 31, 32, 33, 34, 35, 0, 37],
      [29, 30, 31, 32, 33, 34, 35, 36, 37, 38],
      [30, 31, 255, 33, 34, 35, 36, 37, 38, 39],
      [31, 32, 33, 34, 35, 36, 37, 38, 39, 40]
    ];
    return { name: 'Filtro Máximo 5×5', matrix, kernel: Array(5).fill(null).map(() => Array(5).fill(1)), description: 'El filtro máximo reemplaza cada píxel por el valor máximo de la vecindad 5x5.' };
  }

  getExercise7Data() {
    const matrix = [
      [50, 50, 50, 50, 50, 50, 50, 50, 50, 50],
      [50, 100, 100, 100, 100, 100, 100, 100, 100, 50],
      [50, 100, 150, 150, 150, 150, 150, 150, 100, 50],
      [50, 100, 150, 200, 200, 200, 200, 150, 100, 50],
      [50, 100, 150, 200, 220, 220, 200, 150, 100, 50],
      [50, 100, 150, 200, 220, 220, 200, 150, 100, 50],
      [50, 100, 150, 200, 200, 200, 200, 150, 100, 50],
      [50, 100, 150, 150, 150, 150, 150, 150, 100, 50],
      [50, 100, 100, 100, 100, 100, 100, 100, 100, 50],
      [50, 50, 50, 50, 50, 50, 50, 50, 50, 50]
    ];
    const kernel = [[0, -1, 0], [-1, 4, -1], [0, -1, 0]];
    return { name: 'Filtro Laplaciano 3×3', matrix, kernel, description: 'El filtro laplaciano detecta bordes highlightdo la diferencia entre un píxel y sus vecinos.' };
  }

  getExercise4Data() {
    const matrix = [
      [1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2],
      [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
      [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
      [2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3],
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4],
      [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
      [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
      [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
      [4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
      [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
      [5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 7, 7, 7]
    ];
    return { name: 'Ecualización de Histograma', matrix, L: 8, N: 225, description: 'La ecualización redistribuye los niveles de gris para maximizar el contraste.' };
  }

  generateAverageSteps(matrix: number[][], kernel: number[][]): Step[] {
    const steps: Step[] = [];
    steps.push({ id: 1, title: 'Imagen Original 10x10', description: 'Matriz 10x10 píxeles. Sin padding, kernel 5x5 produce salida 6x6.', matrix, formulaOriginal: 'I(x,y) = valor píxel en escala de grises', formulaApplied: 'Salida: 10-5+1 = 6 → matriz 6x6' });
    steps.push({ id: 2, title: 'Kernel Promedio', description: 'Kernel 5x5 con valores = 1. Normalización: 1/25 para obtener promedio.', kernel, formulaOriginal: 'K(i,j) = 1/25 para todo i,j', formulaApplied: 'K = [[1,1,1,1,1], [1,1,1,1,1], [1,1,1,1,1], [1,1,1,1,1], [1,1,1,1,1]] / 25' });
    
    let stepNum = 3;
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 6; j++) {
        const submatrix = this.getSubmatrix(matrix, i, j, 5);
        const values = this.flatten(submatrix);
        const sum = values.reduce((a: number, b: number) => a + b, 0);
        const avg = parseFloat((sum / 25).toFixed(2));
        steps.push({ id: stepNum, title: `Cálculo Posición (${i},${j})`, description: `Aplicar kernel promedio a vecindad 5x5 en (${i},${j}). Sumar 25 valores y dividir por 25.`, position: { row: i, col: j }, submatrix, formulaOriginal: 'I_new(x,y) = Σ I(x+i, y+j) × K(i,j)', formulaApplied: `Suma = ${sum}, Promedio = ${sum}/25 = ${avg}`, calculationDetails: [{ label: 'Suma', value: `${sum}`, highlight: true }, { label: '÷25', value: `${avg}`, highlight: true }], result: avg });
        stepNum++;
      }
    }
    steps.push({ id: 99, title: 'Matriz Resultante Final', description: 'Filtro promedio aplicado a todas las posiciones. Matriz resultado 6x6.', matrix: this.applyAverageFilter(matrix), showFinal: true, formulaOriginal: 'I_filtrada = KernelPromedio * ImagenOriginal', formulaApplied: 'Cada píxel = promedio de 25 vecinos' });
    return steps;
  }

  generateGaussianSteps(matrix: number[][], kernel: number[][]): Step[] {
    const steps: Step[] = [];
    steps.push({ id: 1, title: 'Imagen Original 10x10', description: 'Matriz 10x10 con valor atípico 255 (ruido) en posición (4,4).', matrix, formulaOriginal: 'I(x,y) = valor píxel en escala de grises (0-255)', formulaApplied: 'Notar: valor 255 en posición (4,4) es ruido' });
    steps.push({ id: 2, title: 'Kernel Gaussiano 5x5', description: 'Kernel con ponderación gaussiana. Mayor peso en el centro, menor en los bordes. Suma = 273.', kernel, formulaOriginal: 'K(i,j) = (1/273) × e^(-(i²+j²)/2)', formulaApplied: 'K = [[1,4,7,4,1], [4,16,26,16,4], [7,26,41,26,7], [4,16,26,16,4], [1,4,7,4,1]] / 273' });

    let stepNum = 3;
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 6; j++) {
        const submatrix = this.getSubmatrix(matrix, i, j, 5);
        let weightedSum = 0;
        for (let ki = 0; ki < 5; ki++) {
          for (let kj = 0; kj < 5; kj++) {
            weightedSum += submatrix[ki][kj] * kernel[ki][kj];
          }
        }
        const result = parseFloat((weightedSum / 273).toFixed(2));
        steps.push({ id: stepNum, title: `Cálculo Posición (${i},${j})`, description: `Multiplicar cada píxel por su peso del kernel gaussiano y dividir por 273.`, position: { row: i, col: j }, submatrix, kernel, formulaOriginal: 'I_new = Σ I(i,j) × K(i,j) / 273', formulaApplied: `Suma ponderada = ${weightedSum}, Resultado = ${weightedSum}/273 = ${result}`, calculationDetails: [{ label: 'Σ pond', value: `${weightedSum}`, highlight: true }, { label: '÷273', value: `${result}`, highlight: true }], result });
        stepNum++;
      }
    }
    steps.push({ id: 99, title: 'Matriz Resultante Final', description: 'Filtro gaussiano aplicado. El valor atípico 255 ha sido suavizado.', matrix: this.applyGaussianFilter(matrix, kernel), showFinal: true, formulaOriginal: 'I_filtrada = KernelGaussiano * ImagenOriginal', formulaApplied: 'Suavizado con preservación de bordes' });
    return steps;
  }

  generateMedianSteps(matrix: number[][]): Step[] {
    const steps: Step[] = [];
    steps.push({ id: 1, title: 'Imagen con Ruido Impulsivo', description: 'Valores 0 (sal) y 255 (pimienta) son ruido impulsivo.', matrix, formulaOriginal: 'I(x,y) con ruido = valores 0 o 255', formulaApplied: 'Ruido: 0 (sal) y 255 (pimienta)' });
    steps.push({ id: 2, title: 'Filtro de Mediana', description: 'Para cada píxel: extraer vecindad 5x5, ordenar 25 valores, tomar el valor central (posición 13).', formulaOriginal: 'I_new(x,y) = median{I(i,j) para i,j en vecindad 5x5}', formulaApplied: 'Mediana = valor en posición 13 de valores ordenados' });

    let stepNum = 3;
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 6; j++) {
        const submatrix = this.getSubmatrix(matrix, i, j, 5);
        const values = this.flatten(submatrix);
        const sorted = values.sort((a, b) => a - b);
        const median = sorted[12];
        steps.push({ id: stepNum, title: `Mediana Posición (${i},${j})`, description: `Ordenar los 25 valores y tomar el valor central (posición 13).`, position: { row: i, col: j }, submatrix, sortedValues: sorted, medianPosition: 12, formulaOriginal: 'Mediana = sorted[12] de los 25 valores', formulaApplied: `Valores ordenados: [${sorted.slice(0,5).join(',')}...${sorted.slice(-5).join(',')}], Mediana = ${median}`, calculationDetails: [{ label: 'min', value: `${sorted[0]}`, highlight: false }, { label: `[13]`, value: `${median}`, highlight: true }, { label: 'max', value: `${sorted[24]}`, highlight: false }], result: median });
        stepNum++;
      }
    }
    steps.push({ id: 99, title: 'Matriz Resultante Final', description: 'Ruido impulsivo eliminado: valores 0 y 255 removidos.', matrix: this.applyMedianFilter(matrix), showFinal: true, formulaOriginal: 'I_sin_ruido = mediana(I_vecindad_5x5)', formulaApplied: 'Todos los valores 0 y 255 fueron reemplazados por valores válidos' });
    return steps;
  }

  generateMinimumSteps(matrix: number[][]): Step[] {
    const steps: Step[] = [];
    steps.push({ id: 1, title: 'Imagen con Ruido Impulsivo', description: 'Valores 0 (sal) y 255 (pimienta) son ruido impulsivo. El filtro mínimo toma el valor más bajo.', matrix, formulaOriginal: 'I(x,y) con ruido = valores 0 o 255', formulaApplied: 'Filtro mínimo: tomar valor mínimo de la vecindad' });
    steps.push({ id: 2, title: 'Filtro Mínimo', description: 'Para cada píxel: extraer vecindad 5x5, ordenar 25 valores, tomar el valor mínimo (posición 1).', formulaOriginal: 'I_new(x,y) = min{I(i,j) para i,j en vecindad 5x5}', formulaApplied: 'Mínimo = primer valor de valores ordenados' });

    let stepNum = 3;
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 6; j++) {
        const submatrix = this.getSubmatrix(matrix, i, j, 5);
        const values = this.flatten(submatrix);
        const sorted = values.sort((a, b) => a - b);
        const min = sorted[0];
        steps.push({ id: stepNum, title: `Mínimo Posición (${i},${j})`, description: `Ordenar los 25 valores y tomar el valor mínimo (posición 1).`, position: { row: i, col: j }, submatrix, sortedValues: sorted, medianPosition: 0, formulaOriginal: 'Mínimo = sorted[0] de los 25 valores', formulaApplied: `Valores ordenados: [${sorted.slice(0,5).join(',')}...${sorted.slice(-5).join(',')}], Mínimo = ${min}`, calculationDetails: [{ label: 'min', value: `${min}`, highlight: true }, { label: `[1]`, value: `${min}`, highlight: true }, { label: 'max', value: `${sorted[24]}`, highlight: false }], result: min });
        stepNum++;
      }
    }
    steps.push({ id: 99, title: 'Matriz Resultante Final', description: 'Filtro mínimo aplicado. El ruido impulsivo (valores 0) se ha propagado.', matrix: this.applyMinimumFilter(matrix), showFinal: true, formulaOriginal: 'I_filtrada = mínimo(I_vecindad_5x5)', formulaApplied: 'Valores mínimos tomados de cada vecindad' });
    return steps;
  }

  generateMaximumSteps(matrix: number[][]): Step[] {
    const steps: Step[] = [];
    steps.push({ id: 1, title: 'Imagen con Ruido Impulsivo', description: 'Valores 0 (sal) y 255 (pimienta) son ruido impulsivo. El filtro máximo toma el valor más alto.', matrix, formulaOriginal: 'I(x,y) con ruido = valores 0 o 255', formulaApplied: 'Filtro máximo: tomar valor máximo de la vecindad' });
    steps.push({ id: 2, title: 'Filtro Máximo', description: 'Para cada píxel: extraer vecindad 5x5, ordenar 25 valores, tomar el valor máximo (posición 25).', formulaOriginal: 'I_new(x,y) = max{I(i,j) para i,j en vecindad 5x5}', formulaApplied: 'Máximo = último valor de valores ordenados' });

    let stepNum = 3;
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 6; j++) {
        const submatrix = this.getSubmatrix(matrix, i, j, 5);
        const values = this.flatten(submatrix);
        const sorted = values.sort((a, b) => a - b);
        const max = sorted[24];
        steps.push({ id: stepNum, title: `Máximo Posición (${i},${j})`, description: `Ordenar los 25 valores y tomar el valor máximo (posición 25).`, position: { row: i, col: j }, submatrix, sortedValues: sorted, medianPosition: 24, formulaOriginal: 'Máximo = sorted[24] de los 25 valores', formulaApplied: `Valores ordenados: [${sorted.slice(0,5).join(',')}...${sorted.slice(-5).join(',')}], Máximo = ${max}`, calculationDetails: [{ label: 'min', value: `${sorted[0]}`, highlight: false }, { label: `[25]`, value: `${max}`, highlight: true }, { label: 'max', value: `${max}`, highlight: true }], result: max });
        stepNum++;
      }
    }
    steps.push({ id: 99, title: 'Matriz Resultante Final', description: 'Filtro máximo aplicado. El ruido impulsivo (valores 255) se ha propagado.', matrix: this.applyMaximumFilter(matrix), showFinal: true, formulaOriginal: 'I_filtrada = máximo(I_vecindad_5x5)', formulaApplied: 'Valores máximos tomados de cada vecindad' });
    return steps;
  }

  generateLaplacianSteps(matrix: number[][], kernel: number[][]): Step[] {
    const steps: Step[] = [];
    steps.push({ id: 1, title: 'Imagen Original con Bordes', description: 'Imagen con zonas de diferente intensidad para detectar bordes.', matrix, formulaOriginal: 'I(x,y) = valor píxel en escala de grises', formulaApplied: 'Zonas: fondo=50, interior=100-220' });
    steps.push({ id: 2, title: 'Kernel Laplaciano 3x3', description: 'Kernel para detección de bordes. Resalta cambios rápidos de intensidad.', kernel, formulaOriginal: 'Laplaciano: [0,-1,0; -1,4,-1; 0,-1,0]', formulaApplied: 'Centro: 4, Vecinos: -1 cada uno' });

    let stepNum = 3;
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        const submatrix = this.getSubmatrix(matrix, i, j, 3);
        let sum = 0;
        for (let ki = 0; ki < 3; ki++) {
          for (let kj = 0; kj < 3; kj++) {
            sum += submatrix[ki][kj] * kernel[ki][kj];
          }
        }
        const normalized = Math.max(0, Math.min(255, sum));
        steps.push({ id: stepNum, title: `Laplaciano Posición (${i},${j})`, description: `Aplicar kernel laplaciano 3x3. La fórmula: L = 4*I(i,j) - I(arriba) - I(abajo) - I(izq) - I(der).`, position: { row: i, col: j }, submatrix, kernel, formulaOriginal: 'L(x,y) = 4*I(x,y) - I(x-1,y) - I(x+1,y) - I(x,y-1) - I(x,y+1)', formulaApplied: `Suma ponderada = ${sum}, Normalizado = clamp(${sum}, 0, 255) = ${normalized}`, calculationDetails: [{ label: '4×centro', value: `${submatrix[1][1] * 4}`, highlight: true }, { label: '-vecinos', value: `${-1 * (submatrix[0][1] + submatrix[2][1] + submatrix[1][0] + submatrix[1][2])}`, highlight: true }, { label: 'Resultado', value: `${sum}`, highlight: true }], result: normalized });
        stepNum++;
      }
    }
    steps.push({ id: 99, title: 'Matriz Resultante Final', description: 'Filtro laplaciano aplicado. Los bordes aparecen como valores altos (255) y las zonas suaves como valores bajos (0).', matrix: this.applyLaplacianFilter(matrix, kernel), showFinal: true, formulaOriginal: 'I_bordes = Laplaciano(I_original)', formulaApplied: 'Bordes detectados: transiciones de intensidad' });
    return steps;
  }

  generateHistogramSteps(matrix: number[][], L: number, N: number): Step[] {
    const steps: Step[] = [];
    steps.push({ id: 1, title: 'Imagen Original 15x15', description: '225 píxeles (15x15) con niveles de gris 0-7. El objetivo es ecualizar para mejorar el contraste.', matrix, formulaOriginal: 'Imagen original: valores de gris entre 0 y 7', formulaApplied: 'N = 225 píxeles, L = 8 niveles' });

    const histogram = new Array(L).fill(0);
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        histogram[matrix[i][j]]++;
      }
    }

    steps.push({ id: 2, title: 'Paso 1: Construir Histograma', description: 'Contar cuántos píxeles hay de cada nivel de gris (0 a 7). La suma debe ser 225.', histogram, formulaOriginal: 'h(rₖ) = número de píxeles con nivel rₖ', formulaApplied: `h(0)=${histogram[0]}, h(1)=${histogram[1]}, ..., h(7)=${histogram[7]}`, calculationDetails: histogram.map((c, i) => ({ label: `nivel ${i}`, value: `${c} píxeles`, highlight: c > 0 })) });

    const probabilities = histogram.map(count => count / N);
    steps.push({ id: 3, title: 'Paso 2: Calcular Probabilidades P(rₖ)', description: 'Dividir el conteo de cada nivel entre el total (225) para obtener la probabilidad.', probabilities, formulaOriginal: 'P(rₖ) = h(rₖ) / N', formulaApplied: 'P(rₖ) = conteo / 225', calculationDetails: probabilities.map((p, i) => ({ label: `P(r${i})`, value: `${histogram[i]}/225 = ${p.toFixed(4)}`, highlight: true })) });

    const cdf: number[] = [];
    let cumulative = 0;
    for (let i = 0; i < L; i++) {
      cumulative += probabilities[i];
      cdf.push(cumulative);
    }

    steps.push({ id: 4, title: 'Paso 3: Calcular CDF (Frecuencia Acumulada)', description: 'La CDF es la suma acumulada de las probabilidades. CDF(rₖ) = Σ P(rⱼ) para j ≤ k.', cdf, formulaOriginal: 'CDF(rₖ) = Σ P(rⱼ) para j=0 hasta k', formulaApplied: 'CDF(rₖ) = P(r₀) + P(r₁) + ... + P(rₖ)', calculationDetails: cdf.map((c, i) => ({ label: `CDF(${i})`, value: c.toFixed(4), highlight: true })) });

    const transformation: number[] = [];
    for (let i = 0; i < L; i++) {
      transformation.push(Math.floor((L - 1) * cdf[i]));
    }

    steps.push({ id: 5, title: 'Paso 4: Calcular Transformación sₖ', description: 'Aplicar la fórmula de ecualización para mapear niveles originales a nuevos niveles.', transformation, formulaOriginal: 'sₖ = floor((L-1) × CDF(rₖ))', formulaApplied: 'sₖ = floor(7 × CDF(rₖ))', calculationDetails: transformation.map((t, i) => ({ label: `s${i}`, value: `floor(7×${cdf[i].toFixed(4)})=${t}`, highlight: true })) });

    steps.push({ id: 6, title: 'Tabla de Transformación', description: 'Mapeo de niveles originales a niveles ecualizados. Cada valor se reemplaza según esta tabla.', transformation, formulaOriginal: 'Tabla: rₖ → sₖ', formulaApplied: transformation.map((t, i) => `${i}→${t}`).join(', ') });

    const equalizedMatrix = matrix.map(row => row.map(val => transformation[val]));
    steps.push({ id: 7, title: 'Paso 5: Aplicar Transformación', description: 'Reemplazar cada píxel de la imagen original por su nuevo valor según la tabla.', matrix: equalizedMatrix, formulaOriginal: 'Nueva imagen: s(rₖ) = tabla[rₖ]', formulaApplied: 'Cada valor se reemplaza usando la tabla de transformación' });

    const newHistogram = new Array(L).fill(0);
    for (let i = 0; i < equalizedMatrix.length; i++) {
      for (let j = 0; j < equalizedMatrix[i].length; j++) {
        newHistogram[equalizedMatrix[i][j]]++;
      }
    }

    steps.push({ id: 8, title: 'Paso 6: Nuevo Histograma Ecualizado', description: 'Después de ecualizar, los niveles están más uniformemente distribuidos, mejorando el contraste.', histogram: newHistogram, formulaOriginal: 'Histograma ecualizado: distribución uniforme', formulaApplied: `Nuevo histograma: [${newHistogram.join(', ')}]`, calculationDetails: newHistogram.map((c, i) => ({ label: `nivel ${i}`, value: `${c} píxeles`, highlight: true })) });

    steps.push({ id: 99, title: 'Imagen Ecualizada Final', description: 'La imagen ecualizada tiene un contraste mejorado.', matrix: equalizedMatrix, showFinal: true, formulaOriginal: 'I_ecualizada = transformación(I_original)', formulaApplied: 'Contraste maximizado' });
    return steps;
  }

  private getSubmatrix(matrix: number[][], startRow: number, startCol: number, size: number): number[][] {
    const submatrix: number[][] = [];
    for (let i = 0; i < size; i++) {
      submatrix.push(matrix[startRow + i].slice(startCol, startCol + size));
    }
    return submatrix;
  }

  private flatten(arr: number[][]): number[] {
    return arr.reduce((acc: number[], row: number[]) => acc.concat(row), []);
  }

  applyAverageFilter(matrix: number[][]): number[][] {
    const size = 5, rows = matrix.length - size + 1, cols = matrix[0].length - size + 1, result: number[][] = [];
    for (let i = 0; i < rows; i++) {
      const row: number[] = [];
      for (let j = 0; j < cols; j++) {
        let sum = 0;
        for (let ki = 0; ki < size; ki++) {
          for (let kj = 0; kj < size; kj++) {
            sum += matrix[i + ki][j + kj];
          }
        }
        row.push(parseFloat((sum / 25).toFixed(2)));
      }
      result.push(row);
    }
    return result;
  }

  applyGaussianFilter(matrix: number[][], kernel: number[][]): number[][] {
    const size = 5, kernelSum = 273, rows = matrix.length - size + 1, cols = matrix[0].length - size + 1, result: number[][] = [];
    for (let i = 0; i < rows; i++) {
      const row: number[] = [];
      for (let j = 0; j < cols; j++) {
        let weightedSum = 0;
        for (let ki = 0; ki < size; ki++) {
          for (let kj = 0; kj < size; kj++) {
            weightedSum += matrix[i + ki][j + kj] * kernel[ki][kj];
          }
        }
        row.push(parseFloat((weightedSum / kernelSum).toFixed(2)));
      }
      result.push(row);
    }
    return result;
  }

  applyMedianFilter(matrix: number[][]): number[][] {
    const size = 5, rows = matrix.length - size + 1, cols = matrix[0].length - size + 1, result: number[][] = [];
    for (let i = 0; i < rows; i++) {
      const row: number[] = [];
      for (let j = 0; j < cols; j++) {
        const values: number[] = [];
        for (let ki = 0; ki < size; ki++) {
          for (let kj = 0; kj < size; kj++) {
            values.push(matrix[i + ki][j + kj]);
          }
        }
        const sorted = values.sort((a, b) => a - b);
        row.push(sorted[12]);
      }
      result.push(row);
    }
    return result;
  }

  applyMinimumFilter(matrix: number[][]): number[][] {
    const size = 5, rows = matrix.length - size + 1, cols = matrix[0].length - size + 1, result: number[][] = [];
    for (let i = 0; i < rows; i++) {
      const row: number[] = [];
      for (let j = 0; j < cols; j++) {
        const values: number[] = [];
        for (let ki = 0; ki < size; ki++) {
          for (let kj = 0; kj < size; kj++) {
            values.push(matrix[i + ki][j + kj]);
          }
        }
        const sorted = values.sort((a, b) => a - b);
        row.push(sorted[0]);
      }
      result.push(row);
    }
    return result;
  }

  applyMaximumFilter(matrix: number[][]): number[][] {
    const size = 5, rows = matrix.length - size + 1, cols = matrix[0].length - size + 1, result: number[][] = [];
    for (let i = 0; i < rows; i++) {
      const row: number[] = [];
      for (let j = 0; j < cols; j++) {
        const values: number[] = [];
        for (let ki = 0; ki < size; ki++) {
          for (let kj = 0; kj < size; kj++) {
            values.push(matrix[i + ki][j + kj]);
          }
        }
        const sorted = values.sort((a, b) => a - b);
        row.push(sorted[24]);
      }
      result.push(row);
    }
    return result;
  }

  applyLaplacianFilter(matrix: number[][], kernel: number[][]): number[][] {
    const size = 3, rows = matrix.length - size + 1, cols = matrix[0].length - size + 1, result: number[][] = [];
    for (let i = 0; i < rows; i++) {
      const row: number[] = [];
      for (let j = 0; j < cols; j++) {
        let sum = 0;
        for (let ki = 0; ki < size; ki++) {
          for (let kj = 0; kj < size; kj++) {
            sum += matrix[i + ki][j + kj] * kernel[ki][kj];
          }
        }
        row.push(Math.max(0, Math.min(255, sum)));
      }
      result.push(row);
    }
    return result;
  }
}
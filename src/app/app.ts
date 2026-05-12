import { Component, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageProcessingService, Step } from './services/image-processing.service';

interface ExerciseData {
  name: string;
  matrix: number[][];
  kernel?: number[][];
  kernelName?: string;
  description: string;
  L?: number;
  N?: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected currentExercise = signal<number>(1);
  protected currentStep = signal<number>(0);
  protected isPlaying = signal<boolean>(false);
  protected exerciseData = signal<ExerciseData | null>(null);
  protected steps = signal<Step[]>([]);
  protected resultMatrix = signal<number[][] | null>(null);
  protected stepKey = signal<number>(0);

  private playInterval: any;

  readonly exercises = [
    { id: 1, title: 'Filtro Promedio', icon: '▦', desc: 'Suaviza la imagen calculando la media de vecindades 5x5' },
    { id: 2, title: 'Filtro Gaussiano', icon: '◐', desc: 'Aplica ponderación gaussiana para suavizado con preservación de bordes' },
    { id: 3, title: 'Filtro Mediana', icon: '◑', desc: 'Elimina ruido impulsivo (sal y pimienta) usando la mediana' },
    { id: 4, title: 'Ecualización', icon: '📊', desc: 'Mejora el contraste redistribuyendo los niveles de gris' },
    { id: 5, title: 'Filtro Mínimo', icon: '▼', desc: 'Toma el valor mínimo de la vecindad 5x5' },
    { id: 6, title: 'Filtro Máximo', icon: '▲', desc: 'Toma el valor máximo de la vecindad 5x5' },
    { id: 7, title: 'Filtro Laplaciano', icon: '◉', desc: 'Detecta bordes highlightdo diferencias de intensidad' }
  ];

  constructor(private imageService: ImageProcessingService) {
    this.loadExercise(1);
  }

  loadExercise(exerciseId: number) {
    this.currentExercise.set(exerciseId);
    this.currentStep.set(0);
    this.isPlaying.set(false);
    this.stopPlayback();

    switch (exerciseId) {
      case 1:
        const data1 = this.imageService.getExercise1Data();
        this.exerciseData.set(data1);
        this.steps.set(this.imageService.generateAverageSteps(data1.matrix, data1.kernel!));
        this.resultMatrix.set(this.imageService.applyAverageFilter(data1.matrix));
        break;
      case 2:
        const data2 = this.imageService.getExercise2Data();
        this.exerciseData.set(data2);
        this.steps.set(this.imageService.generateGaussianSteps(data2.matrix, data2.kernel!));
        this.resultMatrix.set(this.imageService.applyGaussianFilter(data2.matrix, data2.kernel!));
        break;
      case 3:
        const data3 = this.imageService.getExercise3Data();
        this.exerciseData.set(data3);
        this.steps.set(this.imageService.generateMedianSteps(data3.matrix));
        this.resultMatrix.set(this.imageService.applyMedianFilter(data3.matrix));
        break;
      case 4:
        const data4 = this.imageService.getExercise4Data();
        this.exerciseData.set(data4);
        this.steps.set(this.imageService.generateHistogramSteps(data4.matrix, data4.L!, data4.N!));
        this.resultMatrix.set(null);
        break;
      case 5:
        const data5 = this.imageService.getExercise5Data();
        this.exerciseData.set(data5);
        this.steps.set(this.imageService.generateMinimumSteps(data5.matrix));
        this.resultMatrix.set(this.imageService.applyMinimumFilter(data5.matrix));
        break;
      case 6:
        const data6 = this.imageService.getExercise6Data();
        this.exerciseData.set(data6);
        this.steps.set(this.imageService.generateMaximumSteps(data6.matrix));
        this.resultMatrix.set(this.imageService.applyMaximumFilter(data6.matrix));
        break;
      case 7:
        const data7 = this.imageService.getExercise7Data();
        this.exerciseData.set(data7);
        this.steps.set(this.imageService.generateLaplacianSteps(data7.matrix, data7.kernel!));
        this.resultMatrix.set(this.imageService.applyLaplacianFilter(data7.matrix, data7.kernel!));
        break;
    }
    this.stepKey.update(k => k + 1);
  }

  nextStep() {
    const maxStep = this.steps().length - 1;
    if (this.currentStep() < maxStep) {
      this.currentStep.update(s => s + 1);
      this.stepKey.update(k => k + 1);
    } else {
      this.stopPlayback();
    }
  }

  prevStep() {
    if (this.currentStep() > 0) {
      this.currentStep.update(s => s - 1);
      this.stepKey.update(k => k + 1);
    }
  }

  goToStep(step: number) {
    this.currentStep.set(step);
    this.stepKey.update(k => k + 1);
  }

  play() {
    this.isPlaying.set(true);
    this.playInterval = setInterval(() => {
      const maxStep = this.steps().length - 1;
      if (this.currentStep() < maxStep) {
        this.nextStep();
      } else {
        this.stopPlayback();
      }
    }, 2500);
  }

  stop() {
    this.stopPlayback();
  }

  private stopPlayback() {
    this.isPlaying.set(false);
    if (this.playInterval) {
      clearInterval(this.playInterval);
    }
  }

  getCurrentStepData(): Step | null {
    return this.steps()[this.currentStep()] || null;
  }

  getStepProgress(): string {
    return `${this.currentStep() + 1} / ${this.steps().length}`;
  }

  getProgressPercentage(): number {
    const total = this.steps().length;
    if (total <= 1) return 0;
    return (this.currentStep() / (total - 1)) * 100;
  }

  getValueColor(value: number): string {
    const v = Math.min(255, Math.max(0, value));
    return `rgb(${v}, ${v}, ${v})`;
  }

  getValueTextColor(value: number): string {
    const v = Math.min(255, Math.max(0, value));
    return v > 128 ? 'black' : 'white';
  }

  getCellColor(row: number, col: number): string {
    const data = this.exerciseData();
    if (!data) return 'rgb(0,0,0)';
    return this.getValueColor(data.matrix[row][col]);
  }

  isNoiseValue(value: number): boolean {
    return value === 0 || value === 255;
  }

  isCellHighlighted(row: number, col: number): boolean {
    const step = this.getCurrentStepData();
    if (!step?.position) return false;
    const { row: startRow, col: startCol } = step.position;
    const windowSize = this.currentExercise() === 7 ? 3 : 5;
    return row >= startRow && row < startRow + windowSize && col >= startCol && col < startCol + windowSize;
  }

  getMatrixRows(): number[] {
    return [0,1,2,3,4,5,6,7,8,9];
  }

  getMatrixCols(): number[] {
    return [0,1,2,3,4,5,6,7,8,9];
  }

  getMatrixFlat(): number[][] {
    const data = this.exerciseData();
    return data ? data.matrix : [];
  }

  getKernelMax(): number {
    return 41;
  }

  getKernelColor(value: number): string {
    const v = Math.min(255, (value / 41) * 255);
    return `rgb(${v}, ${v*0.8}, ${v*0.6})`;
  }

  getPartialResultMatrix(): number[][] | null {
    const data = this.exerciseData();
    if (!data) return null;
    
    const step = this.getCurrentStepData();
    if (!step) return null;
    
    if (step.showFinal && step.matrix) {
      return step.matrix;
    }
    
    if (this.currentExercise() === 4) {
      return null;
    }
    
    if (!step.position) return null;
    
    const matrix = data.matrix;
    const kernel = data.kernel;
    const isGaussian = this.currentExercise() === 2;
    const isMedian = this.currentExercise() === 3;
    const isMinimum = this.currentExercise() === 5;
    const isMaximum = this.currentExercise() === 6;
    const isLaplacian = this.currentExercise() === 7;
    const offset = isLaplacian ? 2 : 4;
    const rows = matrix.length - offset;
    const cols = matrix[0].length - offset;
    const result: number[][] = [];
    const currentPos = step.position;
    const currentResult = step.result;
    
    for (let i = 0; i < rows; i++) {
      const row: number[] = [];
      for (let j = 0; j < cols; j++) {
        if (i > currentPos.row || (i === currentPos.row && j > currentPos.col)) {
          row.push(-1);
        } else if (i === currentPos.row && j === currentPos.col && currentResult !== undefined) {
          row.push(currentResult);
        } else if (i < currentPos.row || (i === currentPos.row && j < currentPos.col)) {
          if (isMinimum) {
            const values: number[] = [];
            for (let ki = 0; ki < 5; ki++) {
              for (let kj = 0; kj < 5; kj++) {
                values.push(matrix[i + ki][j + kj]);
              }
            }
            const sorted = values.sort((a, b) => a - b);
            row.push(sorted[0]);
          } else if (isMaximum) {
            const values: number[] = [];
            for (let ki = 0; ki < 5; ki++) {
              for (let kj = 0; kj < 5; kj++) {
                values.push(matrix[i + ki][j + kj]);
              }
            }
            const sorted = values.sort((a, b) => a - b);
            row.push(sorted[24]);
          } else if (isLaplacian && kernel) {
            let sum = 0;
            for (let ki = 0; ki < 3; ki++) {
              for (let kj = 0; kj < 3; kj++) {
                sum += matrix[i + ki][j + kj] * kernel[ki][kj];
              }
            }
            row.push(Math.max(0, Math.min(255, sum)));
          } else if (isMedian) {
            const values: number[] = [];
            for (let ki = 0; ki < 5; ki++) {
              for (let kj = 0; kj < 5; kj++) {
                values.push(matrix[i + ki][j + kj]);
              }
            }
            const sorted = values.sort((a, b) => a - b);
            row.push(sorted[12]);
          } else if (isGaussian && kernel) {
            let sum = 0;
            for (let ki = 0; ki < 5; ki++) {
              for (let kj = 0; kj < 5; kj++) {
                sum += matrix[i + ki][j + kj] * kernel[ki][kj];
              }
            }
            row.push(parseFloat((sum / 273).toFixed(2)));
          } else {
            let sum = 0;
            for (let ki = 0; ki < 5; ki++) {
              for (let kj = 0; kj < 5; kj++) {
                sum += matrix[i + ki][j + kj];
              }
            }
            row.push(parseFloat((sum / 25).toFixed(2)));
          }
        } else {
          row.push(-1);
        }
      }
      result.push(row);
    }
    return result;
  }

  isCurrentCell(row: number, col: number): boolean {
    const step = this.getCurrentStepData();
    if (!step?.position) return false;
    const pos = step.position;
    return row === pos.row && col === pos.col;
  }

  getWindowPosition(): { top: number; left: number } {
    const step = this.getCurrentStepData();
    if (!step?.position) return { top: 0, left: 0 };
    const pos = step.position;
    const cellSize = 33;
    const paddingGrid = 2;
    const containerPadding = 4;
    const labelHeight = 18;
    const offsetX = containerPadding + paddingGrid;
    const offsetY = containerPadding + labelHeight + paddingGrid;
    const top = pos.row * cellSize + offsetY;
    const left = pos.col * cellSize + offsetX;
    return { top, left };
  }

  getWindowSize(): number {
    return this.currentExercise() === 7 ? 3 : 5;
  }

  getWindowBoxStyle(): any {
    const size = this.getWindowSize();
    const cellSize = 33;
    const boxSize = size * cellSize;
    return {
      width: `${boxSize}px`,
      height: `${boxSize}px`
    };
  }

  ngOnDestroy() {
    this.stopPlayback();
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.code === 'ArrowLeft') {
      event.preventDefault();
      this.prevStep();
    } else if (event.code === 'ArrowRight') {
      event.preventDefault();
      this.nextStep();
    } else if (event.code === 'Space') {
      event.preventDefault();
      this.isPlaying() ? this.stop() : this.play();
    }
  }
}
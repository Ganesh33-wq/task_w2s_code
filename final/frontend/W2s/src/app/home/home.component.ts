import Chart from 'chart.js/auto';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { TaskService } from '../_services/task.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
@ViewChild('chartCanvas') chartCanvasRef!: ElementRef;
  @ViewChild('graphCanvas') graphCanvasRef!: ElementRef;
  private chart!: Chart;
  private graph!: Chart;
  ctx:any;
  user_count:any;
  constructor(private taskService: TaskService) {
  }

  ngOnInit() {
    this.taskService.das_user_count().subscribe(
      data => {
        this.user_count=data
        console.log("nameeeeeeeeeeeeeeeee",data)
      });
    
  }

  ngAfterViewInit() {
    this.createChart();
    this.createGraph();
  }

  createChart() {
    const chartCanvas: HTMLCanvasElement = this.chartCanvasRef.nativeElement;
    this.ctx = chartCanvas.getContext('2d');
    this.chart = new Chart(this.ctx, {
      type: 'bar',
      data: {
        labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5'],
        datasets: [
          {
            label: 'Chart Title',
            data: [10, 20, 30, 40, 50],
            backgroundColor: 'rgba(54, 162, 235, 0.5)'
          }
        ]
      },
      options: {}
    });
  }

  createGraph() {
    const graphCanvas: HTMLCanvasElement = this.graphCanvasRef.nativeElement;
    this.ctx = graphCanvas.getContext('2d');
    this.graph = new Chart(this.ctx, {
      type: 'line',
      data: {
        labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5'],
        datasets: [
          {
            label: 'Graph Title',
            data: [10, 20, 30, 40, 50],
            borderColor: 'rgba(255, 99, 132, 1)',
            fill: false
          }
        ]
      },
      options: {}
    });
  }
}
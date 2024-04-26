import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MasterService } from './service/master.service';
import { ApiResponseModel, ITask, Task } from './model/task';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DatePipe, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  
  title(title: any) {
    throw new Error('Method not implemented.');
  }
 

  taskObj: Task = new Task();
  taskList: ITask[] = [];
  masterService = inject(MasterService);
 
 

  ngOnInit(): void {
    this.loadAllTask();
  }

  loadAllTask() {
    this.masterService.getAllTaskList().subscribe((res: ApiResponseModel) => {
      this.taskList = res.data;
    });
  }
  
  addTask() {
    this.masterService.addNewTask(this.taskObj).subscribe(
      (res: ApiResponseModel) => {
        if (res.result) {
          Swal.fire('Success', 'Task Created Successfully', 'success');
          this.loadAllTask();
          this.taskObj = new Task();
        }
      },
      (error) => {
        Swal.fire('Error', 'API call error', 'error');
      }
    );
  }

  updateTask() {
    this.masterService.updateTask(this.taskObj).subscribe(
      (res: ApiResponseModel) => {
        if (res.result) {
          Swal.fire('Success', 'Task Updated Successfully', 'success');
          this.loadAllTask();
          this.taskObj = new Task();
        }
      },
      (error) => {
        Swal.fire('Error', 'API call error', 'error');
      }
    );
  }

  onDelete(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this task!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.masterService.deleteTask(id).subscribe(
          (res: ApiResponseModel) => {
            if (res.result) {
              Swal.fire('Deleted!', 'Your task has been deleted.', 'success');
              this.loadAllTask();
            }
          },
          (error) => {
            Swal.fire('Error', 'API call error', 'error');
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your task is safe :)', 'info');
      }
    });
  }


  onEdit(item: Task) {
    this.taskObj = item;
    setTimeout(() => {
      const dat = new Date(this.taskObj.dueDate);
      const day = ('0' + dat.getDate()).slice(-2);
      const month = ('0' + dat.getMonth() + 1).slice(-2);
      const today = dat.getFullYear() + '-' + month + '-' + day;
      (<HTMLInputElement>document.getElementById('textDate')).value = today;
    }, 1000);
  }
}



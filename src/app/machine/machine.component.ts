import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MachineService } from './machine.service';

@Component({
  selector: 'app-machine',
  templateUrl: './machine.component.html',
  styleUrls: ['./machine.component.scss']
})
export class MachineComponent implements OnInit {
  machines: any = [];
  constructor(public api: MachineService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getMachines();
  }
  getMachines() {
    this.machines = [];
    this.api.getMachines().subscribe((data: {}) => {
      console.log(data);
      this.machines = data;
    });
  }

}

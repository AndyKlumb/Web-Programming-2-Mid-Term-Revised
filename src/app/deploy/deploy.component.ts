import { Component, OnInit } from '@angular/core';

import { Trooper } from '../trooper';
import { DeployedTrooper } from '../deployedTrooper';
import { TrooperService } from '../trooper.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-troopers',
  templateUrl: './deploy.component.html',
  styleUrls: ['./deploy.component.scss']
})
export class DeployComponent implements OnInit {
  troopers: Trooper[] = [];
  deployedTroopers: DeployedTrooper[] = [];

  constructor(private trooperService: TrooperService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getTroopers();
  }

  getTroopers(): void {
    this.trooperService.getTroopers()
    .subscribe(troopers => this.troopers = troopers);
  }

  getDeployedTroopers(deployedTrooper1: string, deployedTrooper2: string): void {
    let troops = this.troopers;
    var i = troops.length - 1;
    var i2 = troops.length - 1;

    var firstTrooper = null;
    var secondTrooper = null;

    if(troops.length > 0){
      // Starts the while loop to see if the the troops length is greater than 0.
      while (i >= 0)
      {
        if(troops[i].name === deployedTrooper1)
        {
          firstTrooper = troops[i];
          break;
        }
        i--;
      } // ends the while loop.

      while(i2 >= 0)
      {
          if(troops[i2].name === deployedTrooper2)
            {
              secondTrooper = troops[i2];
              break;
            }
        i2--;
      }
      if(firstTrooper != null)
      {
        this.getDeployedTroopersHealth(firstTrooper as Trooper, secondTrooper as Trooper);
      }
    }
    else
    {
      alert("The first trooper is null.");
    }
  }

  /// Gets the health of the trooper.
  getDeployedTroopersHealth(firstTrooper: Trooper, secondTrooper: Trooper): void
  {
    this.getTrooperWithMostHealth(firstTrooper, secondTrooper);
  }

  getTrooperWithMostHealth(firstTrooper: Trooper, secondTrooper: Trooper): void
  {
    while(firstTrooper.health >= 0 || secondTrooper.health >= 0)
    {
      if(firstTrooper.health > 0)
      {
        firstTrooper.health -= secondTrooper.damage;

        if(secondTrooper.health > 0)
        {
          secondTrooper.health -= firstTrooper?.damage;
        }
        if(firstTrooper.health <= 0 || secondTrooper.health <= 0)
        {
          break;
        }
      }
      else{break;}
    }

    if(firstTrooper?.health <= 0)
    {
      this.logTrooper(secondTrooper.name + " defeated " + firstTrooper?.name + "!");
    }
    else if(secondTrooper?.health <= 0)
    {
      this.logTrooper(firstTrooper.name + " defeated " + secondTrooper?.name + "!");
    }
  } 

  /** Log a TrooperService message with the MessageService */
  private logTrooper(message: string) {
    this.messageService.add(`TrooperService: ${message}`);
  }
}
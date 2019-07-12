import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BeteService } from "src/app/bete.service";
import { Bete } from "../bete.model";
import {
  AlertController,
  PopoverController,
  LoadingController
} from "@ionic/angular";
import { VenteComponent } from "../vente/vente.component";

@Component({
  selector: "app-bete-detail",
  templateUrl: "./bete-detail.page.html",
  styleUrls: ["./bete-detail.page.scss"]
})
export class BeteDetailPage implements OnInit {
  beteItem: Bete;

  constructor(
    private activatedRoute: ActivatedRoute,
    private beteService: BeteService,
    private router: Router,
    private alertController: AlertController,
    private popoverController: PopoverController,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has("beteId")) {
        //redirect
        return;
      }
      const beteId = paramMap.get("beteId");
      this.beteItem = this.beteService.getBete(beteId);
    });
  }

  onDeleteBete() {
    this.alertController
      .create({
        header: "Etes-vous sur ?",
        message:
          "Voulez-vous vraiment supprimer " + this.beteItem.reference + " ?",
        buttons: [
          {
            text: "Annuler",
            role: "cancel"
          },
          {
            text: "Supprimer",
            handler: () => {
              this.beteService.deleteBete(this.beteItem.reference);
              this.router.navigate(["/betail"]);
            }
          }
        ]
      })
      .then(alertEl => {
        alertEl.present();
      });
  }

  onSell() {
    this.popoverController
      .create({
        component: VenteComponent,
        cssClass: "popover_class",
        translucent: true,
        componentProps: { selectedBete: this.beteItem }
      })
      .then(popEl => {
        popEl.present();
        return popEl.onWillDismiss();
      })
      .then(resultData => {
        if (resultData.role === "confirm") {
          this.loadingCtrl
            .create({
              keyboardClose: true,
              message: "Changement de proprietaire..."
            })
            .then(loadingEl => {
              loadingEl.present();
              setTimeout(() => {
                this.loadingCtrl.dismiss();
              }, 1500);
            });
          console.log(resultData.data.newProp);
          this.beteItem.proprietaire = resultData.data.newProp;
        }
      });
  }

  onKill(){
    this.alertController
    .create({
      header: "Confirmation de l'abattage",
      message:
        "Confirmez-vous que " + this.beteItem.reference + " a bien été envoyé a l'abatoire ? ",
      buttons: [
        {
          text: "Annuler",
          role: "cancel"
        },
        {
          text: "Confirmer",
          handler: () => {
            this.beteService.deleteBete(this.beteItem.reference);
            this.router.navigate(["/betail"]);
          }
        }
      ]
    })
    .then(alertEl => {
      alertEl.present();
    });
  }
}

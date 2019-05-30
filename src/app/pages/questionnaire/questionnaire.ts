import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatFormFieldModule } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { Login, Group, Role, Questionnaire, Question, QuestionnaireGame } from '../../shared/models/index';
import { AppConfig } from '../../app.config';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingService, UtilsService, GroupService, AlertService, QuestionnaireService } from '../../shared/services/index';
import { SelectionModel } from '@angular/cdk/collections';

export interface DialogViewQuestionnaires {
}
@Component({
  selector: 'app-viewquestionnairesdialog',
  templateUrl: 'viewQuestionnairesDialog.html',
  styleUrls: ['./questionnaire.scss']
})
export class ViewQuestionnairesDialogComponent {
  public Questions: Array<Question>;
  constructor(
    public dialogRef: MatDialogRef<ViewQuestionnairesDialogComponent>,
    public questionnaireService: QuestionnaireService,
    public alertService: AlertService,
    public loadingService: LoadingService,

    @Inject(MAT_DIALOG_DATA) public data: DialogViewQuestionnaires) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  public getInformation(id: string) {
    console.log(id);
    this.questionnaireService.getQuestionsofQuestionnaire(id).subscribe(
      ((Questions: Array<Question>) => {
        this.Questions = Questions;
        console.log(this.Questions);
      }),
      ((error: Response) => {
        this.loadingService.hide();
        this.alertService.show(error.toString());
      }));

  }

}

export interface DialogViewQuestions {
}
@Component({
  selector: 'app-viewquestionsdialogcomponent',
  templateUrl: 'viewQuestionsDialogComponent.html',
  styleUrls: ['./questionnaire.scss']
})
export class ViewQuestionsDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ViewQuestionsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogViewQuestions) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

export interface DialogCreateQuestionnaires {

}
@Component({
  selector: 'app-createquestionnairesdialogcomponent',
  templateUrl: 'createQuestionnairesDialogComponent.html',
  styleUrls: ['./questionnaire.scss']
})
export class CreateQuestionnairesDialogComponent {
  public option1: boolean;
  public option2: boolean;
  constructor(
    public dialogRef: MatDialogRef<CreateQuestionnairesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogCreateQuestionnaires) {
    this.option1 = false;
    this.option2 = false;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  public myFn(id: string) {
    console.log(id);
  }
}

export interface DialogCreateQuestions { }
@Component({
  selector: 'app-createquestionsdialogcomponent',
  templateUrl: 'createQuestionsDialogComponent.html',
  styleUrls: ['./questionnaire.scss']
})
export class CreateQuestionsDialogComponent {
  public option1: boolean;
  public option2: boolean;
  public respuesta1: boolean;
  public respuesta2: boolean;
  public respuesta3: boolean;
  public respuesta4: boolean;
  public respuesta5: boolean;
  public respuesta6: boolean;
  dificultad = 'ESCOJA UNA DIFICULTAD';
  constructor(
    public dialogRef: MatDialogRef<CreateQuestionsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogCreateQuestions) {
    this.option1 = false;
    this.option2 = false;
    this.respuesta1 = false;
    this.respuesta2 = false;
    this.respuesta3 = false;
    this.respuesta4 = false;
    this.respuesta5 = false;
    this.respuesta6 = false;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  public eleccion0() {
    this.option1 = false;
    this.option2 = false;
  }
  public eleccion1() {
    this.option1 = true;
    this.option2 = false;
  }
  public eleccion2() {
    this.option1 = false;
    this.option2 = true;
  }

  public numrespuestas(i: number) {
    console.log(i);
    switch (i) {
      case 0:
        this.respuesta1 = false;
        this.respuesta2 = false;
        this.respuesta3 = false;
        this.respuesta4 = false;
        this.respuesta5 = false;
        this.respuesta6 = false;
        break;
      case 1:
        this.respuesta1 = true;
        this.respuesta2 = false;
        this.respuesta3 = false;
        this.respuesta4 = false;
        this.respuesta5 = false;
        this.respuesta6 = false;
        break;
      case 2:
        this.respuesta1 = true;
        this.respuesta2 = true;
        this.respuesta3 = false;
        this.respuesta4 = false;
        this.respuesta5 = false;
        this.respuesta6 = false;
        break;
      case 3:
        this.respuesta1 = true;
        this.respuesta2 = true;
        this.respuesta3 = true;
        this.respuesta4 = false;
        this.respuesta5 = false;
        this.respuesta6 = false;
        break;
      case 4:
        this.respuesta1 = true;
        this.respuesta2 = true;
        this.respuesta3 = true;
        this.respuesta4 = true;
        this.respuesta5 = false;
        this.respuesta6 = false;
        break;
      case 5:
        this.respuesta1 = true;
        this.respuesta2 = true;
        this.respuesta3 = true;
        this.respuesta4 = true;
        this.respuesta5 = true;
        this.respuesta6 = false;
        break;
      case 6:
        this.respuesta1 = true;
        this.respuesta2 = true;
        this.respuesta3 = true;
        this.respuesta4 = true;
        this.respuesta5 = true;
        this.respuesta6 = true;
        break;
    }
  }
}

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.html',
  styleUrls: ['./questionnaire.scss']
})
export class QuestionnaireComponent implements OnInit {

  public questionnaires: Array<Questionnaire>;
  public question: Array<Question>;
  public animal: string;
  public QuestionnaireNumber: string;
  public QuestionParameters: Array<string>;
  public QuestionForm: FormGroup;


  //public myQuestions: Array<Question>;
  //public snackbar: MatSnackBar;
  //private returnUrl: string;
  //public questionnaireId: string;
  // tslint:disable-next-line:no-any
  //private sub: any;
  //public items: string[] = [];

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public alertService: AlertService,
    public utilsService: UtilsService,
    public loadingService: LoadingService,
    public questionnaireService: QuestionnaireService,
    public dialog: MatDialog,
    private _formBuilder: FormBuilder) {
    this.utilsService.currentUser = Login.toObject(localStorage.getItem(AppConfig.LS_USER));
    this.utilsService.role = Number(localStorage.getItem(AppConfig.LS_ROLE));
  }
  public openViewQuestionnairesDialog(): void {
    this.getMyQuestionnaires();
    const dialogRef = this.dialog.open(ViewQuestionnairesDialogComponent,
      {
        height: 'auto',
        width: '700px',
        position: {
          top: '70px',
          right: '300px'
        },
        data: { questionnaireshtml: this.questionnaires }
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //RECOGER DATOS AL CERRAR
    });

  }
  public openViewQuestionsDialog(): void {
    this.getMyQuestions();
    const dialogRef = this.dialog.open(ViewQuestionsDialogComponent,
      {
        height: '500px',
        width: '700px',
        position: {
          top: '70px',
          right: '300px'
        },
        data: { questionshtml: this.question }
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //RECOGER DATOS AL CERRAR
    });

  }

  public openCreateQuestionnairesDialog(): void {
    const dialogRef = this.dialog.open(CreateQuestionnairesDialogComponent,
      {
        height: '500px',
        width: '700px',
        position: {
          top: '70px',
          right: '300px'
        },
        data: { questionshtml: this.question }
      });

    dialogRef.afterClosed().subscribe(result => {
      //RECOGER DATOS AL CERRAR
      console.log(result);
      if (result != undefined) {
        var idquestions = result['questionId'];
        var intidquestions = [];
        console.log(idquestions);
        for (let i = 0; i < idquestions.length; i++) {
          intidquestions[i] = parseInt(idquestions[i]);
        }
        console.log(intidquestions);
        result['teacherId'] = this.utilsService.currentUser.userId;
        result['questionId'] = intidquestions;
        this.questionnaireService.saveQuestionnaire(result).subscribe(
          (() => {
            this.getMyQuestionnaires();
          }),
          ((error: Response) => {
            this.loadingService.hide();
            this.alertService.show(error.toString());
          }));
      }
    });
  }

  public openCreateQuestionsDialog(): void {
    const dialogRef = this.dialog.open(CreateQuestionsDialogComponent,
      {
        height: 'auto',
        width: '500px',
        position: {
          top: '70px',
          right: '400px'
        },
        data: {}
      });

    dialogRef.backdropClick().subscribe(() => {
      // Close the dialog
      console.log("CLOSE");
      dialogRef.close();
    })

    dialogRef.afterClosed().subscribe(result => {
      console.log('The CreateQuestionsDialogComponent was closed');
      console.log(result);

      if (result != undefined) {
        //var obj = Object.values(result);
        result['teacherId'] = this.utilsService.currentUser.userId;
        if (result['answer2']) {
          if (result['correctanswer'].length > 1) {
            result['type'] = 'multiAnswer';
          }
          else {
            result['type'] = 'classic';
          }
        }
        else {
          result['type'] = 'openQuestion';
          result['correctanswer'] = result['answer1'];
        }

        this.questionnaireService.saveQuestion(result).subscribe(
          (() => {
            this.getMyQuestions();
          }),
          ((error: Response) => {
            this.loadingService.hide();
            this.alertService.show(error.toString());
          }));
      }
    });

  }

  public saveQuestion() {
    console.log("SAVE");
  }
  public ngOnInit(): void {

    this.getMyQuestionnaires();
    this.getMyQuestions();

    // Defining 3 forms:
    this.QuestionForm = this._formBuilder.group({
      statement: ['', Validators.required],
      image: ['', Validators.required],
      difficulty: ['', Validators.required],
      category: ['', Validators.required],
      explantion: ['', Validators.required],
      respuesta: ['', Validators.required]
    });
  }

  public getMyQuestionnaires() {

    this.questionnaireService.getMyQuestionnaires(String(this.utilsService.currentUser.userId)).subscribe(
      ((Questionnaires: Questionnaire[]) => {
        this.questionnaires = Questionnaires;
        console.log(this.questionnaires);
      }),
      ((error: Response) => {
        this.loadingService.hide();
        this.alertService.show(error.toString());
      }));
  }

  public getMyQuestions() {
    console.log("getMYQUESTIONS");
    this.questionnaireService.getMyQuestions(String(this.utilsService.currentUser.userId)).subscribe(
      ((Question: Question[]) => {
        this.question = Question;
        console.log(this.question);
      }),
      ((error: Response) => {
        this.loadingService.hide();
        this.alertService.show(error.toString());
      }));
  }

}

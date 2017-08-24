//This service handles the situation recap (jeconsultemonbilan)

//Built-in
import { OnInit } from '@angular/core';
import { Injectable } from '@angular/core';

//Hand-made
import { bilantask } from './bilantask.model';
import { NavigationService } from './navigation.service';
import { DbuserinfoService } from './dbuserinfo.service';

@Injectable()
export class BilanService implements OnInit {
    
    
    //isinarray = multiple values to be checked (in expectedvalued) in an array (in experiencefield)
    //isvalue = is this the value of the experiencefield ?
    
    public bilanitemrepository_selected = {};//a selection of items which correspond to the choices of the user
    public levelitems = [];
    public totalcount = {};
    
    constructor(
        public navigationservice : NavigationService,
        public dbuserinfoservice : DbuserinfoService
    ){
    }
    
    public assesslevel():void {
        this.navigationservice.preparejefaislepointitems();//sets up the list of button in the monplanning menu.
        this.levelitems = this.navigationservice.jefaislepointitems;//take all available levels (=jefaislepointitems)
        //tempy everything
        this.bilanitemrepository_selected = []
        this.totalcount = {
            temoin : {},
            beneficiaire : {}
        };
        
        for (let i = 0; i < this.levelitems.length; i++) {
            this.bilanitemrepository_selected[this.levelitems[i].formodule]={
                temoin : [],
                beneficiaire : [],
                jeveuxensavoirplus : []
            };
            this.levelitems[i]['beneficiairecount']=0;
            this.levelitems[i]['temoincount']=0;
            this.totalcount['temoin'][this.levelitems[i].formodule]=0;
            this.totalcount['beneficiaire'][this.levelitems[i].formodule]=0;            
        }
        
        for (let i = 0; i < this.bilanitemrepository.length; i++) {
            let tempisinarray:boolean=false;
            let tempisvalue:boolean=false;
            
            //Validation type isinarray
            if(this.bilanitemrepository[i].validationtype==="isinarray"){
                console.log("isinarray!");
                let temparray:any[] = [];
                if (Array.isArray(this.dbuserinfoservice.userinfo.experience[this.bilanitemrepository[i].experiencefield])){
                    //experiencefield is an array
                    temparray = this.dbuserinfoservice.userinfo.experience[this.bilanitemrepository[i].experiencefield];
                    console.log("it is an array!");
                }else{
                    //experiencefield is not an array
                    temparray.push(this.dbuserinfoservice.userinfo.experience[this.bilanitemrepository[i].experiencefield]);
                    console.log("it is NOT an array!");
                }
                for (let i2 = 0; i2 < temparray.length; i2++) {
                    for (let i3 = 0; i3 < this.bilanitemrepository[i].expectedvalue.length; i3++) {
                        if (temparray[i2].toString()===this.bilanitemrepository[i].expectedvalue[i3].toString()) {
                            tempisinarray = true;
                            break;
                        }
                    }
                    if(tempisinarray){break;}
                }
            }
            
            
            //Validation type isvalue
            if(this.bilanitemrepository[i].validationtype==="isvalue"){
                console.log("isvalue!");
                if (this.bilanitemrepository[i].expectedvalue.toString() === this.dbuserinfoservice.userinfo.experience[this.bilanitemrepository[i].experiencefield].toString()){
                    tempisvalue = true;
                }
            }
            
            if (tempisinarray || tempisvalue){
                this.bilanitemrepository_selected[this.bilanitemrepository[i].modulelevel][this.bilanitemrepository[i].assignedto].push(this.bilanitemrepository[i]);
                this.totalcount[this.bilanitemrepository[i].assignedto][this.bilanitemrepository[i].modulelevel]+=this.bilanitemrepository[i].impact;
            }
            
            
        }
        
        
        
        for (let i = 0; i < this.levelitems.length; i++) {
            let total = (this.totalcount['beneficiaire'][this.levelitems[i].formodule] + this.totalcount['temoin'][this.levelitems[i].formodule]);
            if (total===0) {total = 100};
            this.levelitems[i].beneficiairecount=Math.round(100* this.totalcount['beneficiaire'][this.levelitems[i].formodule]/total);
            this.levelitems[i].temoincount=Math.round(100*this.totalcount['temoin'][this.levelitems[i].formodule]/total);
        }
        
        console.log("this.totalcount");
        console.log(this.totalcount);
        console.log("this.levelitems");
        console.log(this.levelitems);
        console.log("this.bilanitemrepository_selected");
        console.log(this.bilanitemrepository_selected);
        
        
    }
    
    public bilanitemrepository =  [
        new bilantask(
            "isinarray",//validationtype
            "J'ai indiqué vouloir exercer une activité d'indépendant ou d'entrepreneur.",//name
            "Lunchtime s'adresse actuellement aux personnes souhaitant se reconvertir dans une activité salariée. D'autres organismes proposent un accompagnement dédiés aux personnes souhaitant développer leur propre activité",//message
            "",//route
            "etapejeconstruismonprojet",//modulelevel
            1,//step
            "jeconstruismonprojetstep1values",//experiencefield
            [4,5,6],//expectedvalue
            "temoin",//assignedto
            -99,//impact
            "mdi mdi-24px mdi-block-helper",//iconclass
        ),
        new bilantask(
            "isinarray",//validationtype
            "J'ai indiqué vouloir exercer une activité salariée",//name
            "",//message
            "",//route
            "etapejeconstruismonprojet",//modulelevel
            1,//step
            "jeconstruismonprojetstep1values",//experiencefield
            [1,2,3],//expectedvalue
            "temoin",//assignedto
            99,//impact
            "",//iconclass
        ),    
        new bilantask(
            "isinarray",//validationtype
            "Je ne sais pas encore quel type d'activité je souhaite exercer.",//name
            "Lunchtime s'adresse actuellement aux personnes souhaitant se reconvertir dans une activité salariée. D'autres organismes proposent un accompagnement dédiés aux personnes souhaitant développer leur propre activité. L'un de vos objectifs sera donc de savoir si vous penchez plutôt pour une activité salariée ou un lancement dans le freelance ou l'entrepreuriat.",//message
            "",//route
            "etapejeconstruismonprojet",//modulelevel
            1,//step
            "jeconstruismonprojetstep1values",//experiencefield
            [7],//expectedvalue
            "beneficiaire",//assignedto
            3,//impact
            "mdi mdi-24px mdi-help",//iconclass
        ),
        new bilantask(
            "isvalue",//validationtype
            "Je n'ai pas encore fait le point sur mes centres d'intérêts ainsi que les causes et domaines qui m'intéressent.",//name
            "A vous de jouer ! De nombreux tests existent pour mieux cerner ses centres d'intérêts. Vous n'avez pas besoin de solliciter un témoin Lunchtime pour les identifier. En revanche, vous pouvez partir à la rencontre de professionnels de différents secteurs en prenant contact par exemple sur des réseaux sociaux tels que LinkedIn ou Meetup. Des applications mobiles (Shapr, Never Eat Alone, etc.) vous proposent également de rencontrer des professionnels en fonction de vos intérêts. Ces rencontres pourront vous aider à confirmer vos domaines professionnels de prédilection ou à en trouver d'autres.",//message
            "",//route
            "etapejeconstruismonprojet",//modulelevel
            4,//step
            "jeconstruismonprojetstep4avalues",//experiencefield
            "non",//expectedvalue
            "beneficiaire",//assignedto
            3,//impact
            "mdi mdi-24px mdi-pencil",//iconclass
        ),
        new bilantask(
            "isvalue",//validationtype
            "Je n'ai pas encore fait de bilan des compétences.",//name
            "C'est une tâche que je peux accomplir sans avoir recours à un témoin. En faisant un bilan de compétences, on fait le point sur ses expériences passées. On prend du recul par rapport à son parcours et on lui donne du sens en s'interrogeant notamment sur les activités qu'on a appréciées.",//message
            "",//route
            "etapejeconstruismonprojet",//modulelevel
            4,//step
            "jeconstruismonprojetstep4bvalues",//experiencefield
            "non",//expectedvalue
            "beneficiaire",//assignedto
            2,//impact
            "mdi mdi-24px mdi-pencil",//iconclass
        ),
        new bilantask(
            "isvalue",//validationtype
            "Je ne sais pas encore comment évaluer mes chances d'obtenir un travail dans un domaine.",//name
            "Il y a au moins des approches permettant d'évaluer ses chances dans un domaine. D'une part, il s'agit de savoir si tel ou tel métier recrute. D'autre part, on peut essayer de déterminer si on dispose de bonnes cartes pour être embauché dans ce métier. Se documenter sur l'offre et la demande dans un domaine relève du travail à faire soi-même. Il s'agit alors de consulter les Informations marché du travail de Pôle emploi. Cet outil vous indique, entre autres, combien de candidats existent en moyenne pour un poste.",//message
            "",//route
            "etapejeconstruismonprojet",//modulelevel
            5,//step
            "jeconstruismonprojetstep5avalues",//experiencefield
            "non",//expectedvalue
            "beneficiaire",//assignedto
            1,//impact
            "mdi mdi-24px mdi-search-web",//iconclass
        ),
        new bilantask(
            "isvalue",//validationtype
            "Je ne sais pas encore comment évaluer mes chances d'obtenir un travail dans un domaine.",//name
            "Il y a deux approches permettant d'évaluer ses chances dans un domaine. D'une part, il s'agit de savoir si tel ou tel métier recrute. D'autre part, on peut essayer de déterminer si on dispose de bonnes cartes pour être embauché dans ce métier. Se documenter sur l'offre et la demande dans un domaine relève du travail à faire soi-même. Il s'agit alors de consulter les Informations marché du travail de Pôle emploi. Cet outil vous indique, entre autres, combien de candidats existent en moyenne pour un poste.",//message
            "",//route
            "etapejeconstruismonprojet",//modulelevel
            5,//step
            "jeconstruismonprojetstep5avalues",//experiencefield
            "non",//expectedvalue
            "beneficiaire",//assignedto
            1,//impact
            "mdi mdi-24px mdi-library",//iconclass
        ),
        new bilantask(
            "isvalue",//validationtype
            "Je ne sais pas encore comment évaluer mes chances d'obtenir un travail dans un domaine.",//name
            "Vous pouvez vous-même vous renseigner sur les qualités et compétences requises dans un domaine. En revanche, un grand témoin Lunchtime pourrait vous aider à valoriser vos atouts dans le cadre d'une reconversion professionnelle. Demandez à votre témoin comment il a valorisé les siens.",//message
            "",//route
            "etapejeconstruismonprojet",//modulelevel
            5,//step
            "jeconstruismonprojetstep5avalues",//experiencefield
            "non",//expectedvalue
            "temoin",//assignedto
            1,//impact
            "mdi mdi-24px mdi-voice",//iconclass
        ),
        new bilantask(
            "isvalue",//validationtype
            "Je ne sais pas encore quel type et niveau de responsabilité je souhaite assumer.",//name
            "Le type et le niveau de responsabilité sont un facteur de satisfaction et de bien-être au travail. On peut avoir trop ou pas assez de responsabilités tout comme on peut avoir des types de responsabilités que nous souhaitons assumer ou pas. Il est donc important d'être au clair avec soi-même sur ce point. C'est un travail que vous pouvez faire seul(e) ou en compagnie d'un coach ou accompagnateur professionnel.",//message
            "",//route
            "etapejeconstruismonprojet",//modulelevel
            5,//step
            "jeconstruismonprojetstep5bvalues",//experiencefield
            "non",//expectedvalue
            "beneficiaire",//assignedto
            1,//impact
            "mdi mdi-24px mdi-worker",//iconclass
        ),
        new bilantask(
            "isvalue",//validationtype
            "Je n'ai pas encore fait de test de personnalité.",//name
            "C'est un exercice à faire soi-même ou dans le cadre d'un accompagnement par un professionnel. Sachez pourtant que l'humain cherche souvent à confirmer sa vision idéaliste et rêvée de lui-même.",//message
            "",//route
            "etapejeconstruismonprojet",//modulelevel
            6,//step
            "jeconstruismonprojetstep6avalues",//experiencefield
            "non",//expectedvalue
            "beneficiaire",//assignedto
            2,//impact
            "mdi mdi-24px mdi-lightbulb-on-outline",//iconclass
        ),
        new bilantask(
            "isvalue",//validationtype
            "Je n'ai pas encore fait de test de personnalité.",//name
            "Lorsque vous aurez passé un ou plusieurs tests de personnalité, vous pourriez en discuter avec un témoin Lunchtime. Comment a-t-il interprété ses résultats ? En quoi ce type de test l'ont aidé à avancer dans son projet de reconversion ?",//message
            "",//route
            "etapejeconstruismonprojet",//modulelevel
            6,//step
            "jeconstruismonprojetstep6avalues",//experiencefield
            "non",//expectedvalue
            "temoin",//assignedto
            1,//impact
            "mdi mdi-24px mdi-voice",//iconclass
        ),
        new bilantask(
            "isvalue",//validationtype
            "Je ne me reconnais pas dans les résultats du test de personnalité.",//name
            "Parlez-en à un professionnel de l'accompagnement et de l'orientation. Vous pouvez également creuser auprès de vos amis, qui vous connaissent bien. Ne cherchez pas à confirmer à tout prix votre image rêvée de vous-même. Essayez plutôt à comprendre les résultats de votre test et pourquoi ils ne vous étonnent.",//message
            "",//route
            "etapejeconstruismonprojet",//modulelevel
            6,//step
            "jeconstruismonprojetstep6bvalues",//experiencefield
            "non",//expectedvalue
            "beneficiaire",//assignedto
            1,//impact
            "mdi mdi-24px mdi-search-web",//iconclass
        ),
        new bilantask(
            "isvalue",//validationtype
            "Je ne connais pas les étapes clés d'une reconversion professionnelle.",//name
            "De nombreux articles présentent le parcours classique d'une reconversion. Confrontez vos connaissances à l'expérience d'un grand témoin Lunchtime. Il pourra enrichir vos connaissances et vous montrer par quoi se traduisent ces étapes dans la vie réelle.",//message
            "",//route
            "etapejeconstruismonprojet",//modulelevel
            6,//step
            "jeconstruismonprojetstep7avalues",//experiencefield
            "non",//expectedvalue
            "temoin",//assignedto
            3,//impact
            "mdi mdi-24px mdi-voice",//iconclass
        )
    ]
    
    //string : "isinarray"/"isvalue" : validationtype
    //string : name
    //string : message
    //string or empty : route
    //name of module : modulelevel
    //step number : step
    //string : experiencefield
    //array : expectedvalue
    //string : "beneficiaire", "temoin" or "jeveuxensavoirplus" : assignedto
    //number : impact
    //string : iconclass
    
    
    ngOnInit(){
        
    }
    
}
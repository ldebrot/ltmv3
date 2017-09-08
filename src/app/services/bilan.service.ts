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
    public totalcount = {
        temoin : {},
        beneficiaire : {},
        ratio : {}
    };

    public bilan_disqualify = {
        annihilates : {
            temoin: [],
            beneficiaire : []
        },
        neutralizes : {
            temoin: [],
            beneficiaire : []
        }
    }

    public bilan_parameters = {
        increment : {//this number is an equivalent of one big task
            temoin : 3,
            beneficiaire : 3,
            ratio : 1
        },
        max : {//if impact exceeds this number, the progressbar is full
            temoin : 9,
            beneficiaire : 12,
            ratio : 3
        }
    } 

    public bilan_current = {//this one stores the number of the item which reflects the current state (e.g. 2 = the second item in bilan_items)
        temoin : {},
        beneficiaire : {},
        ratio : {}
    }

    public bilan_percentage ={
        temoin : {},
        beneficiaire : {},
        ratio : {}
    }

    //these are the different progress levels for beneficiaire, temoin and the corresponding ratio
    public bilan_items = {
        temoin : {
            min : [
                0,
                3,
                6,
                9
            ],
            label : [
                "Pas assez d'intérêt",
                "Peu d'intérêt",
                "Intérêt confirmé",
                "Grand intérêt"
            ],
            message : [
                "Vous n'avez pas assez de points à discuter avec un grand témoin.",
                "Vous avez quelques points à voir avec un grand témoin, mais cela ne justifie pas forcément de solliciter son aide.",
                "Vous avez suffisamment de points à voir avec un grand témoin. Une rencontre paraît tout à fait justifiée.",
                "Une rencontre avec un grand témoin vous serait grandement utile. Vous ne pourrez probablement pas aborder tous les points avec lui."
            ]
        },
        beneficiaire : {
            min : [
                0,
                3,
                6,
                9
            ],
            label : [
                "Quasiment rien",
                "Quelques tâches à accomplir",
                "Il reste du travail",
                "Beaucoup à faire"
            ],
            message : [
                "Il ne vous reste quasiment aucune tâche à accomplir vous-même.",
                "Il vous reste quelques tâches que vous pouvez faire vous-même.",
                "Vous pouvez encore avancer vous-même sur un bon nombre de points.",
                "Vous pouvez avancer vous-même sur de très nombreux points."
            ]
        },
        ratio : {
            min : [
                0,
                0.5,
                1,
                2
            ],
            label : [
                "A vous de jouer",
                "Plutôt à vous de jouer",
                "Une rencontre pourrait vous aider",
                "Prenez rendez-vous"
            ],
            message : [
                "Vous avez clairement plus de choses à faire vous-même. Avancez vous-même un maximum avant de solliciter un grand témoin.",
                "Il vous reste encore pas mal de travail à faire vous-même avant de rencontrer un grand témoin.",
                "Vous pouvez avancer à la fois vous-même et grâce à la rencontre avec un grand témoin.",
                "La rencontre avec un grand témoin pourrait vous aider à avancer dans votre projet. A vous de prendre rendez-vous."
            ]
        }
    }
    
    constructor(
        public navigationservice : NavigationService,
        public dbuserinfoservice : DbuserinfoService
    ){
    }
    
    //bilancurrent says at which level of progress the user is with regard to what s/he has to do herself ("beneficiaire"), to do with a mentor ("temoin") and the corresponding ration ("ratio")
    public setbilan_currentitem(formodule : string,forwhom: string):void {
        for (let i = 0; i < this.bilan_items[forwhom].min.length; i++) {
            if (this.bilan_items[forwhom].min[i]>this.totalcount[forwhom][formodule]){
                break;
            }
            this.bilan_current[forwhom][formodule]=i;
        }
        if (this.bilan_current[forwhom][formodule]<0){this.bilan_current[forwhom][formodule]=0;}
        
        if(this.totalcount[forwhom][formodule]>this.bilan_parameters.max[forwhom]){
            this.bilan_percentage[forwhom][formodule]=100;
        } else if (this.totalcount[forwhom][formodule] < 0) {
            this.bilan_percentage[forwhom][formodule]=0;
        } else {
            this.bilan_percentage[forwhom][formodule] = 100*(this.totalcount[forwhom][formodule]/this.bilan_parameters.max[forwhom]);
        }

        //console.log("this.bilan_percentage");
        //console.log(this.bilan_percentage);
        //console.log("this.bilan_current");
        //console.log(this.bilan_current);
    }

    public assesslevel():void {
        this.navigationservice.preparejefaislepointitems();//sets up the list of button in the monplanning menu.
        this.levelitems = this.navigationservice.jefaislepointitems;//take all available levels (=jefaislepointitems)
        
        //EMPTY EVERYTHING
        //bilanitemrepository - list of selected items based on user choices.
        this.bilanitemrepository_selected = []
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
            this.totalcount['ratio'][this.levelitems[i].formodule]=0;            
        }

        //totalcount - count of impact of selected items
        this.totalcount['temoin']['allmodules']=0;
        this.totalcount['beneficiaire']['allmodules']=0;            
        this.totalcount['ratio']['allmodules']=0;            
        
        //bilan_disqualify - repository of selected items which are of type 'annihilate' or 'neutralize' (with impact value -99 or 99) 
        this.bilan_disqualify = {
            annihilates : {
                temoin: [],
                beneficiaire : []
            },
            neutralizes : {
                temoin: [],
                beneficiaire : []
            }
        }

        //Goes through all possible items (possibilities) and checks which ones match with the user choices and puts them into the repository of 'selected items' 
        for (let i = 0; i < this.bilanitemrepository.length; i++) {
            let tempisinarray:boolean=false;
            let tempisvalue:boolean=false;
            
            //Validation type isinarray
            if(this.bilanitemrepository[i].validationtype==="isinarray"){
                //console.log("isinarray!");
                let temparray:any[] = [];
                if (Array.isArray(this.dbuserinfoservice.userinfo.experience[this.bilanitemrepository[i].experiencefield])){
                    //experiencefield is an array
                    temparray = this.dbuserinfoservice.userinfo.experience[this.bilanitemrepository[i].experiencefield];
                    //console.log("it is an array!");
                }else{
                    //experiencefield is not an array
                    temparray.push(this.dbuserinfoservice.userinfo.experience[this.bilanitemrepository[i].experiencefield]);
                    //console.log("it is NOT an array!");
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
                //console.log("isvalue!");
                if (this.bilanitemrepository[i].expectedvalue.toString() === this.dbuserinfoservice.userinfo.experience[this.bilanitemrepository[i].experiencefield].toString()){
                    tempisvalue = true;
                }
            }
            
            //in case the item is validated (corresponds to the user choices), add to list of selected items or add to disqualifier list
            if (tempisinarray || tempisvalue){
                if (this.bilanitemrepository[i].impact===99) {//the item should neutralize any annihilation item (=which disqualify the user)
                    this.bilan_disqualify.neutralizes[this.bilanitemrepository[i].assignedto].push(this.bilanitemrepository[i]);
                    //console.log ("added item to neutralize");
                } else if (this.bilanitemrepository[i].impact===-99) {//this is an annihilation item (=which disqualifies the user)
                    this.bilan_disqualify.annihilates[this.bilanitemrepository[i].assignedto].push(this.bilanitemrepository[i]);
                    //console.log ("added item to annihilate");
                } else {
                    this.bilanitemrepository_selected[this.bilanitemrepository[i].modulelevel][this.bilanitemrepository[i].assignedto].push(this.bilanitemrepository[i]);
                    this.totalcount[this.bilanitemrepository[i].assignedto][this.bilanitemrepository[i].modulelevel]+=this.bilanitemrepository[i].impact;
                    this.totalcount[this.bilanitemrepository[i].assignedto]['allmodules']+=this.bilanitemrepository[i].impact;
                }
            }

        }

        //Snalyzes disqualifier items - it deletes all 'annihilate' items (with impact value -99) from the bilan_disqualify which have a matching 'neutralize' item (with impact value 99) 
        let forwhom = ['beneficiaire','temoin'];
        for (let i_forwhom = 0; i_forwhom < forwhom.length; i_forwhom++) {
            for (let i = 0; i < this.bilan_disqualify.neutralizes[forwhom[i_forwhom]].length; i++) {
                let temp_modulelevel = this.bilan_disqualify.neutralizes[forwhom[i_forwhom]][i].modulelevel;
                let temp_step = this.bilan_disqualify.neutralizes[forwhom[i_forwhom]][i].step;
                let splicethis = [];
                //console.log("temp_modulelevel" + "--" + "temp_step");
                //console.log(temp_modulelevel.toString() + "--" + temp_step.toString());
                for (let i2 = 0; i2 < this.bilan_disqualify.annihilates[forwhom[i_forwhom]].length; i2++) {
                    //console.log("checkvalue: "+this.bilan_disqualify.annihilates[forwhom[i_forwhom]][i2].modulelevel + "--"+ this.bilan_disqualify.annihilates[forwhom[i_forwhom]][i2].step);
                    if (
                        this.bilan_disqualify.annihilates[forwhom[i_forwhom]][i2].modulelevel.toString()===temp_modulelevel.toString()
                        && this.bilan_disqualify.annihilates[forwhom[i_forwhom]][i2].step.toString()===temp_step.toString()
                    ) {
                        //console.log("gotcha! i_forwhom:"+i_forwhom+ "i:"+i+" i2:"+i2);
                        splicethis.push(i2);
                    }
                }
                for (let i3 = 0; i3 < splicethis.length; i3++) {
                    //console.log("this.bilan_disqualify.annihilates[forwhom[i_forwhom]]");
                    //console.log(this.bilan_disqualify.annihilates[forwhom[i_forwhom]]);
                    this.bilan_disqualify.annihilates[forwhom[i_forwhom]].splice(splicethis[i3],1);
                }
            } 
        }

        //Calculate the ratio as both temoin and beneficiaire values are now ready
        for (let i = 0; i < Object.keys(this.totalcount.beneficiaire).length; i++) {
            let temp_beneficiaire = (this.totalcount.beneficiaire[Object.keys(this.totalcount.beneficiaire)[i]]===0) ? 1 : this.totalcount.beneficiaire[Object.keys(this.totalcount.beneficiaire)[i]];
            this.totalcount.ratio[Object.keys(this.totalcount.beneficiaire)[i]]=this.totalcount.temoin[Object.keys(this.totalcount.beneficiaire)[i]]/temp_beneficiaire;
        }

        //Calculate the percentages for the progressbars as all values (beneficiaire, temoin and ratio) are now available
        for (let i = 0; i < this.levelitems.length; i++) {
            let total = (this.totalcount['beneficiaire'][this.levelitems[i].formodule] + this.totalcount['temoin'][this.levelitems[i].formodule]);
            if (total===0) {total = 100};
            this.levelitems[i].beneficiairecount=Math.round(100* this.totalcount['beneficiaire'][this.levelitems[i].formodule]/total);
            this.levelitems[i].temoincount=Math.round(100*this.totalcount['temoin'][this.levelitems[i].formodule]/total);
            let tempbeneficiaire = (this.levelitems[i].beneficiairecount===0) ? 1 : this.levelitems[i].beneficiairecount
            this.levelitems[i].ratio=this.levelitems[i].temoincount/tempbeneficiaire;
        }
        
        //console.log("this.bilan_disqualify");
        //console.log(this.bilan_disqualify);
        //console.log("this.totalcount");
        //console.log(this.totalcount);
        //console.log("this.levelitems");
        //console.log(this.levelitems);
        //console.log("this.bilanitemrepository_selected");
        //console.log(this.bilanitemrepository_selected);
      
    }

    public bilanitemrepository =  [
        new bilantask(
            "isinarray",//validationtype
            "J'ai indiqué vouloir exercer une activité d'indépendant ou d'entrepreneur.",//name
            "Lunchtime s'adresse actuellement aux personnes souhaitant se reconvertir dans une activité salariée. D'autres organismes proposent un accompagnement dédiés aux personnes souhaitant développer leur propre activité",//message
            "/beneficiaire/jeconstruismonprojet",//route
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
            "/beneficiaire/jeconstruismonprojet",//route
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
            "/beneficiaire/jeconstruismonprojet",//route
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
            "/beneficiaire/jeconstruismonprojet",//route
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
            "/beneficiaire/jeconstruismonprojet",//route
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
            "/beneficiaire/jeconstruismonprojet",//route
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
            "/beneficiaire/jeconstruismonprojet",//route
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
            "/beneficiaire/jeconstruismonprojet",//route
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
            "/beneficiaire/jeconstruismonprojet",//route
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
            "/beneficiaire/jeconstruismonprojet",//route
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
            "/beneficiaire/jeconstruismonprojet",//route
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
            "/beneficiaire/jeconstruismonprojet",//route
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
            "/beneficiaire/jeconstruismonprojet",//route
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
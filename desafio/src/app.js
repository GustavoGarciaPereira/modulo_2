const express = require('express');
const fs = require('fs');
//import express from 'express';
const app = express();
const port = 2000;


app.use(express.json())

//app.get('/:id',(req,res)=>{
//    res.send(`<h1>${req.params.id}</h1>`)
//})
//app.post('/',(req,res)=>res.send("<h1>post</h1>"))


app.get('/arquivos',(req,res)=>{
    const grades = './dados/grades.json'
    const Dadosgrades = fs.readFileSync(grades, "utf8");
    const dados_grades = JSON.parse(Dadosgrades)
    console.log("<>",dados_grades)
    res.send(dados_grades)

})

app.post('/cadastrar',(req,res)=>{

    //const grades = './dados/grades.json'
    //const Dadosgrades = fs.readFileSync(grades, "utf8");
    //const dados_grades = JSON.parse(Dadosgrades)
    //console.log("<>",dados_grades)
    console.log(req.body)
    console.log(new Date())
    salvar_grade(req.body)
    //"timestamp":
    res.send("cadastrato")  
})

app.put('/atualisar/:id',(req,res)=>{

    

    atualisar(req.params.id,req.body,res)

})

function atualisar(id, {student, subject ,type, value}, res){
    console.log("id",id)
    console.log(`${student}, ${subject} ,${type}, ${value}`)
    const grades = './dados/grades copy.json'
    const Dadosgrades = fs.readFileSync(grades, "utf8");
    const dados_grades = JSON.parse(Dadosgrades)

    dados_grades['grades'].forEach(element => {
        if(element.id == id){
            dados_grades['grades'].indexOf(JSON.stringify({"nome":"gustavo"}),id)
        }
    });


//    var pos = dados_grades['grades'].map(e => {
//        e.id == id
//        //if(e.id == id){
//        //    
//        //    e["student"]=student 
//        //    e["subject"]=subject
//        //    e["type"]=type
//        //    e["value"]=value
//        //    e["timestamp"]= new Date()
//        //    return e
//        //}
//
//      }).indexOf(dados_grades['grades'].student="ff",0);
//      console.log(".",dados_grades['grades'])

    //var pro = dados_grades['grades'].find()
    //const grade = dados_grades['grades'].find(ee => ee.id == id)
    //const q = dados_grades['grades'].map((ee)=>{
    //    if(ee.id == id && dados_grades['grades'].id == id){
    //        return dados_grades['grades'].push(
    //            {
    //                "student":student,
    //                "subject":subject,
    //                "type":type,
    //                "value":value,
    //                "timestamp": new Date()
    //            }
    //        )
//
    //    }
//
    //})
    //const t = dados_grades['grades'].forEach(element => {
    //    if(element.id == id){
    //        console.log("<>>>",element)
    //        console.log("encontru")
    //        res.send(`<h1 style="color:green">Foi alterado</h1>`)
    //        console.log("dd",student)
    //        return dados_grades['grades'].indexOf(
    //            JSON.stringify({
    //                "student":student,
    //                "subject":subject,
    //                "type":type,
    //                "value":value,
    //                "timestamp": new Date()
    //                
    //            }, null, 2), dados_grades['grades'].indexOf(element));
    //            console.log("<ZZZZ>",dados_grades['grades'])
    //    }
    //    
    //    

        
    //});
    //console.log(dados_grades['grades'])
//
//
    res.send(`<h1 style="color:red">id cccnão encontrado</h1>`)

        //fs.writeFileSync(grades, JSON.stringify(q, null, 2))

}

    
    //fs.writeFileSync('./data.json', JSON.stringify(obj, null, 2) , 'utf-8'
        //para passar um objeto para dentro de um arquivo
    
    
//        try {
//            const grades = './dados/grades copy.json'
//            const Dadosgrades = fs.readFileSync(grades, "utf8");
//            const dados_grades = JSON.parse(Dadosgrades)
//            const dados = {
//                "id":    dados_grades['nextId'],
//                "student":student,
//                "subject":subject,
//                "type":type,
//                "value":value,
//                "timestamp": new Date()
//            }
//            console.log("<>",dados_grades)
//            dados_grades['grades'].push(dados)
//            dados_grades['nextId'] += 1
//            fs.writeFileSync(grades, JSON.stringify(dados_grades, null, 2))
//            //fs.appendFileSync(grades, JSON.stringify(dados_grades));
//            dados_grades['nextId'] += 1
//        } catch (error) {
//            const grades = './dados/teste.json'
//            fs.writeFileSync(grades, JSON.stringify(
//                {"nextId":49,
//                 "grades":[]
//                }, null, 2))
//            
//        }





function salvar_grade({student, subject ,type, value}){
    //fs.writeFileSync('./data.json', JSON.stringify(obj, null, 2) , 'utf-8'
    //para passar um objeto para dentro de um arquivo


    try {
        const grades = './dados/grades copy.json'
        const Dadosgrades = fs.readFileSync(grades, "utf8");
        const dados_grades = JSON.parse(Dadosgrades)
        const dados = {
            "id":    dados_grades['nextId'],
            "student":student,
            "subject":subject,
            "type":type,
            "value":value,
            "timestamp": new Date()
        }
        console.log("<>",dados_grades)
        dados_grades['grades'].push(dados)
        dados_grades['nextId'] += 1
        fs.writeFileSync(grades, JSON.stringify(dados_grades, null, 2))
        //fs.appendFileSync(grades, JSON.stringify(dados_grades));
        dados_grades['nextId'] += 1
    } catch (error) {
        const grades = './dados/teste.json'
        fs.writeFileSync(grades, JSON.stringify(
            {"nextId":49,
             "grades":[]
            }, null, 2))
        
    }

    //"student":
    //"subject":
    //type":"Fórum",
    //"value":15,
    //"timestamp":

}

/*
fs.writeFile(`./dados_gerados/${nome}.json`,`
    {
    "ID":${dados.ID},
    "Sigla": "${dados.Sigla}",
    "Nome": "${dados.Nome}"
    }
    `, function(erro) {

    if(erro) {
        throw erro;
    }

    console.log("Arquivo salvo");
}); 
*/




//app.route('/rout')
//.get((req,res) => {
//    res.send("<h1>gustavo get</h1>")
//    res.end()
//})
//app.route('/book')
//.get((req,res) => {
//    res.send('<h1>gustavo get</h1>')
//    res.end()
//})
//.post((req, res) => {
//    res.send('Add a book');
//  })
//.put((req, res) => {
//    res.send('Update the book');
//  });




app.listen(port,()=>{
    console.log(`servidor rodando desafio na porta ${port}`)
})
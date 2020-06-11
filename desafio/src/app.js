const express = require('express');
const fs = require('fs');
//import express from 'express';
const app = express();
const port = 3000;


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
    salvar_grade(req.body)
    res.send("cadastrato")  
})

app.put('/atualisar/:id',(req,res)=>{
    atualisar(req.params.id,req.body,res)
})

/*
Crie um endpoint para consultar uma grade em específico. 
Esse endpoint deverá receber como parâmetro o id 
da grade e retornar suas informações.
*/
app.get('/consultar/:id',(req,res)=>{
    res.send(consultar(req.params.id))
})



app.delete('/deletar/:id',(req,res)=>{
    //res.send(`deletando ${req.params.id}`)
    deletar(req.params.id)
})

/*
Crie um endpoint para consultar a nota total de um aluno em uma disciplina. 
O endpoint deverá receber como parâmetro o student e o subject, e realizar
 a soma de todas as notas de atividades correspondentes àquele subject, 
 para aquele student. O endpoint deverá retornar a soma da propriedade value 
 dos registros encontrados.
*/
app.get('/nota/:student/:subject',(req,res)=>{
    
    res.send(`${req.params.student}\n${req.params.subject}\n${consultar_nota(req.params.student,req.params.subject)}`)

})

function atualisar(id, {student, subject ,type, value}, res){
    console.log("id",id)
    console.log(`${student}, ${subject} ,${type}, ${value}`)
    const grades = './dados/grades copy.json'
    const Dadosgrades = fs.readFileSync(grades, "utf8");
    const dados_grades = JSON.parse(Dadosgrades)

    const trans = dados_grades['grades'].map(e=>{
        if(e['id']==id){
            e["student"] = student ? student:e["student"]
            e["subject"] = subject ? subject:e["subject"]
            e["type"] = type ? type:e["type"]
            e["value"] = value ? value:e["value"]
            e["timestamp"]= new Date()
        }
        return e
    })
    while(dados_grades['grades'].length) {
        dados_grades['grades'].pop();
    }
    const qw = {"nextId":49,
        "grades":trans
    }

    console.log(trans)

    fs.writeFileSync(grades, JSON.stringify(qw, null, 2))
    res.send(`<h1 style="color:red">id cccnão encontrado</h1>`)
}

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

function deletar(id){
    const grades = './dados/grades copy.json'
    const Dadosgrades = fs.readFileSync(grades, "utf8");
    const dados_grades = JSON.parse(Dadosgrades)

    const d = dados_grades['grades'].map(e=>{
        return e.id
    }).indexOf(Number(id))
    if(d!=-1){
        dados_grades['grades'].splice(d,1)
        dados_grades['nextId'] -= 1
        fs.writeFileSync(grades, JSON.stringify(dados_grades, null, 2))        
    }
    
    //console.log("<>",dados_grades)
    //dados_grades['grades'].push(dados)
    //dados_grades['nextId'] += 1
    //
    ////fs.appendFileSync(grades, JSON.stringify(dados_grades));
    //dados_grades['nextId'] += 1
}

function consultar(id){
    const grades = './dados/grades copy.json'
    const Dadosgrades = fs.readFileSync(grades, "utf8");
    const dados_grades = JSON.parse(Dadosgrades)

    const trans = dados_grades['grades'].find(e=>{
        return e.id == id
    })
    return trans
}

function consultar_nota(nome,materia){
    const grades = './dados/grades copy.json'
    const Dadosgrades = fs.readFileSync(grades, "utf8");
    const dados_grades = JSON.parse(Dadosgrades)
    console.log("OK",nome,"f",materia)


    const nota = dados_grades['grades'].filter(x=>{

        if (x.student.toUpperCase() == String(nome).toUpperCase() && x.subject.toUpperCase() == String(materia).toUpperCase()){
            return x.value
        }
    })
    //console.log(">>>>>>>>>>>>>>>>>>>>>",nota)

    //const soma = nota.reduce((accumulator, currentValue) =>{
    //    //console.log("<>",accumulator.student.toUpperCase(),"\n<>",accumulator.subject.toUpperCase())
    //    
    //    return accumulator.value + currentValue.value
    ////    
    ////    
    ////    //if (accumulator.student.toUpperCase() == String(nome).toUpperCase() && accumulator.subject.toUpperCase() == String(materia).toUpperCase()){
    ////    //    accumulator.vale+currentValue.value
    ////    //}
    //});
    var i = 0;
    nota.forEach(element => {
        i+=element.value
    });
    return i
    // expected output: 10
}

app.listen(port,()=>{
    console.log(`servidor rodando desafio na porta ${port}`)
})
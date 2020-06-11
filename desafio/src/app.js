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


/*Crie um endpoint para consultar a média das grades de determinado subject e type. 
O endpoint deverá receber como parâmetro um subject e um type, e retornar a média. 
A média é calculada somando o registro value de todos os 
registros que possuem o subject e type informados, dividindo pelo total
 de registros que possuem este mesmo subject e type.
*/
app.get('/media/:subject/:type',(req,res)=>{
    media(req.params.subject, req.params.type)
    res.send(`${req.params.subject} ${req.params.type}\n
    ${media(req.params.subject, req.params.type)}`)
});

/*Crie um endpoint para retornar as três melhores grades de acordo com 
determinado subject e type. O endpoint deve receber como parâmetro um 
subject e um type, e retornar um array com os três registros de maior 
value daquele subject e type. A ordem deve ser do maior para o menor.
*/
app.get('/tres_maiores/:subject/:type',(req,res)=>{
    //media(req.params.subject, req.params.type)
    //res.send(`${req.params.subject} ${req.params.type}\n
    //${media(req.params.subject, req.params.type)}`)
    tres_maiores(req.params.subject, req.params.type)
    res.send(`${req.params.subject} ${req.params.type}\n
    ${JSON.stringify(tres_maiores(req.params.subject, req.params.type), null, 2)}`)
});


function tres_maiores(subject, type){
    console.log(`${subject}, ${type}`)
    const grades = './dados/grades copy.json'
    const Dadosgrades = fs.readFileSync(grades, "utf8");
    const dados_grades = JSON.parse(Dadosgrades)

    const nota = dados_grades['grades'].filter(x=>{
        if (x.type.toUpperCase() == String(type).toUpperCase() && x.subject.toUpperCase() == String(subject).toUpperCase()){
            return x.value
        }
    })
    return ordena_valoresMaior(nota).splice(0,3)

    //var i = 0;
    //nota.forEach(element => {
    //    i+=element.value
    //});
    //return i/(nota.length>0?nota.length:1)
}

function ordena_valoresMaior(lista){
    lista.sort(function (a, b) {
        if (a.value < b.value) {
          return 1;
        }
        if (a.value > b.value) {
          return -1;
        }
        return 0;
    });


    return lista
}



function media(subject, type){
    console.log(`${subject}, ${type}`)
    const grades = './dados/grades copy.json'
    const Dadosgrades = fs.readFileSync(grades, "utf8");
    const dados_grades = JSON.parse(Dadosgrades)

    const nota = dados_grades['grades'].filter(x=>{
        if (x.type.toUpperCase() == String(type).toUpperCase() && x.subject.toUpperCase() == String(subject).toUpperCase()){
            return x.value
        }
    })
    var i = 0;
    nota.forEach(element => {
        i+=element.value
    });
    return i/(nota.length>0?nota.length:1)
}

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

function consultar_nota(nome, materia){
    const grades = './dados/grades copy.json'
    const Dadosgrades = fs.readFileSync(grades, "utf8");
    const dados_grades = JSON.parse(Dadosgrades)

    const nota = dados_grades['grades'].filter(x=>{
        if (x.student.toUpperCase() == String(nome).toUpperCase() && x.subject.toUpperCase() == String(materia).toUpperCase()){
            return x.value
        }
    })
    var i = 0;
    nota.forEach(element => {
        i+=element.value
    });
    return i
}

app.listen(port,()=>{
    console.log(`servidor rodando desafio na porta ${port}`)
})